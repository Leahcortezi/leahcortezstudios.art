<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Simple test endpoint
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        'status' => 'API is working!',
        'timestamp' => date('Y-m-d H:i:s'),
        'server' => $_SERVER['SERVER_NAME'] ?? 'localhost',
        'php_version' => phpversion(),
        'files' => [
            'approved_artworks.json' => file_exists('../data/approved_artworks.json') ? 'exists' : 'not found',
            'api_log.txt' => file_exists('../data/api_log.txt') ? 'exists' : 'not found'
        ]
    ]);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Use GET to test API.']);
}
?>
