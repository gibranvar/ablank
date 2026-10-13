<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['to_email']) || !isset($input['html_content']) || !isset($input['pdf_base64'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields: to_email, html_content, pdf_base64']);
    exit;
}

$to_email = filter_var($input['to_email'], FILTER_VALIDATE_EMAIL);
if (!$to_email) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

$html_content = $input['html_content'];
$parts = explode(',', $input['pdf_base64']);
$pdf_base64 = end($parts);

// Resend Configuration
$resend_api_key = getenv('RESEND_API_KEY') ?: '';
$from = "A BLANK <hello@ablank.mx>";
$subject = "A BLANK - Executive Brief: Diagnóstico Operativo Lead-to-Cash";

$payload = [
    'from' => $from,
    'to' => [$to_email],
    'subject' => $subject,
    'html' => $html_content,
    'attachments' => [
        [
            'filename' => 'executive-brief.pdf',
            'content' => $pdf_base64
        ]
    ]
];

$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $resend_api_key,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_TIMEOUT, 20);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

if ($curl_error) {
    http_response_code(500);
    echo json_encode(['error' => 'cURL Error: ' . $curl_error]);
    exit;
}

$res_data = json_decode($response, true);

if ($http_code >= 200 && $http_code < 300) {
    echo json_encode([
        'success' => true,
        'id' => $res_data['id'] ?? null,
        'message' => 'Email enviado exitosamente vía Resend'
    ]);
} else {
    http_response_code($http_code);
    echo json_encode([
        'error' => $res_data['message'] ?? 'Error enviando con Resend',
        'details' => $res_data
    ]);
}
