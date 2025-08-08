<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests for adding artwork
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Check if this is a FormSubmit webhook or direct API call
$is_formsubmit_webhook = isset($_POST['artist_name']) && isset($_POST['approval_status']);

if ($is_formsubmit_webhook) {
    // Handle FormSubmit webhook data
    $input = $_POST;
    
    // Log FormSubmit webhook for debugging
    $webhook_log = date('Y-m-d H:i:s') . " - FormSubmit webhook received\n";
    $webhook_log .= "POST data: " . print_r($_POST, true) . "\n";
    $webhook_log .= "FILES data: " . print_r($_FILES, true) . "\n\n";
    file_put_contents('../data/webhook_log.txt', $webhook_log, FILE_APPEND | LOCK_EX);
    
    // Handle file upload from FormSubmit
    $image_url = '';
    if (isset($_FILES['artwork']) && $_FILES['artwork']['error'] === UPLOAD_ERR_OK) {
        $upload_dir = '../images/community/';
        if (!is_dir($upload_dir)) {
            mkdir($upload_dir, 0755, true);
        }
        
        $file_extension = strtolower(pathinfo($_FILES['artwork']['name'], PATHINFO_EXTENSION));
        $allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        
        if (in_array($file_extension, $allowed_extensions)) {
            $new_filename = 'artwork_' . time() . '_' . rand(1000, 9999) . '.' . $file_extension;
            $upload_path = $upload_dir . $new_filename;
            
            if (move_uploaded_file($_FILES['artwork']['tmp_name'], $upload_path)) {
                $image_url = 'https://leahcortezstudios.art/images/community/' . $new_filename;
            }
        }
    }
    
    // Set the image URL in input data
    $input['image_url'] = $image_url;
    
} else {
    // Handle direct API call with JSON
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Security: Simple API key check for direct API calls
    $valid_api_key = 'lcstudios_api_2025_secure';
    $provided_key = $_SERVER['HTTP_AUTHORIZATION'] ?? $_GET['api_key'] ?? $input['api_key'] ?? '';
    
    if ($provided_key !== $valid_api_key) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit();
    }
}

// Validate required fields
$required_fields = ['artist_name', 'artwork_title'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field"]);
        exit();
    }
}

// For FormSubmit webhooks, image_url might be empty if upload failed
if (!$is_formsubmit_webhook && empty($input['image_url'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required field: image_url']);
    exit();
}

// Prepare artwork data
$artwork_data = [
    'id' => ($is_formsubmit_webhook ? 'approved-' : 'api-') . time() . '-' . rand(1000, 9999),
    'artist_name' => sanitize_input($input['artist_name']),
    'artist_instagram' => sanitize_input($input['artist_instagram'] ?? ''),
    'artwork_title' => sanitize_input($input['artwork_title']),
    'description' => sanitize_input($input['artwork_description'] ?? $input['description'] ?? ''),
    'medium' => sanitize_input($input['artwork_medium'] ?? $input['medium'] ?? 'mixed-media'),
    'category' => sanitize_input($input['artwork_category'] ?? $input['category'] ?? 'personal'),
    'image_url' => $input['image_url'] ?? '',
    'date_added' => date('Y-m-d'),
    'status' => 'approved',
    'likes' => 0,
    'approval_method' => $is_formsubmit_webhook ? 'formsubmit_webhook' : 'direct_api'
];

// Only validate image URL for direct API calls
if (!$is_formsubmit_webhook && !filter_var($artwork_data['image_url'], FILTER_VALIDATE_URL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid image URL']);
    exit();
}

// Read current showcase data
$showcase_file = '../data/approved_artworks.json';
$showcase_data = [];

if (file_exists($showcase_file)) {
    $showcase_data = json_decode(file_get_contents($showcase_file), true) ?? [];
}

// Add new artwork to the beginning of the array
array_unshift($showcase_data, $artwork_data);

// Keep only the latest 100 artworks to prevent file from getting too large
$showcase_data = array_slice($showcase_data, 0, 100);

// Ensure data directory exists
if (!is_dir('../data')) {
    mkdir('../data', 0755, true);
}

// Save updated showcase data
if (file_put_contents($showcase_file, json_encode($showcase_data, JSON_PRETTY_PRINT))) {
    // Log the addition
    $log_entry = date('Y-m-d H:i:s') . " - Added artwork: '{$artwork_data['artwork_title']}' by {$artwork_data['artist_name']} ({$artwork_data['artist_instagram']})\n";
    file_put_contents('../data/api_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
    
    // Success response
    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Artwork added successfully',
        'artwork_id' => $artwork_data['id'],
        'data' => $artwork_data
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save artwork data']);
}

function sanitize_input($input) {
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}
?>
