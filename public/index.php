<?php
// Przekieruj wszystkie żądania do index.html
$request_uri = $_SERVER['REQUEST_URI'];

// Jeśli żądanie dotyczy rzeczywistego pliku lub katalogu, obsłuż je normalnie
if (file_exists(__DIR__ . $request_uri) && !is_dir(__DIR__ . $request_uri)) {
    return false;
}

// W przeciwnym razie przekieruj do index.html
include __DIR__ . '/index.html';
?>