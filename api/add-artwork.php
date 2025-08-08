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

// Security: Simple API key check
$valid_api_key = 'lcstudios_api_2025_secure'; // Change this to something secure
$provided_key = $_SERVER['HTTP_AUTHORIZATION'] ?? $_GET['api_key'] ?? $_POST['api_key'] ?? '';

if ($provided_key !== $valid_api_key) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}

// Only allow POST requests for adding artwork
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$required_fields = ['artist_name', 'artwork_title', 'image_url'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field"]);
        exit();
    }
}

// Prepare artwork data
$artwork_data = [
    'id' => 'api-' . time() . '-' . rand(1000, 9999),
    'artist_name' => sanitize_input($input['artist_name']),
    'artwork_title' => sanitize_input($input['artwork_title']),
    'description' => sanitize_input($input['description'] ?? ''),
    'medium' => sanitize_input($input['medium'] ?? 'mixed-media'),
    'category' => sanitize_input($input['category'] ?? 'personal'),
    'image_url' => filter_var($input['image_url'], FILTER_VALIDATE_URL),
    'date_added' => date('Y-m-d'),
    'status' => 'approved',
    'likes' => 0
];

// Validate image URL
if (!$artwork_data['image_url']) {
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
    $log_entry = date('Y-m-d H:i:s') . " - Added artwork: '{$artwork_data['artwork_title']}' by {$artwork_data['artist_name']}\n";
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
