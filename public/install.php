<?php
session_start();
header('Content-Type: text/html; charset=utf-8');

class Installer {
    private $config = [];
    private $errors = [];
    private $success = false;

    public function __construct() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->handleInstallation();
        }
    }

    private function handleInstallation() {
        try {
            // Walidacja danych
            $this->validateInput();
            
            if (empty($this->errors)) {
                // Zapisz konfigurację
                $this->saveConfig();
                
                // Usuń plik instalacyjny
                $this->cleanup();
                
                $this->success = true;
            }
        } catch (Exception $e) {
            $this->errors[] = "Błąd instalacji: " . $e->getMessage();
        }
    }

    private function validateInput() {
        $requiredFields = ['fileUploadPath', 'aiSystemPath', 'imageAnalyzerPath'];
        
        foreach ($requiredFields as $field) {
            if (empty($_POST[$field])) {
                $this->errors[] = "Pole {$field} jest wymagane";
            }
        }

        // Sprawdź czy ścieżki są poprawne
        if (!empty($_POST['fileUploadPath']) && !$this->isValidPath($_POST['fileUploadPath'])) {
            $this->errors[] = "Nieprawidłowa ścieżka do wgrywania plików";
        }
    }

    private function isValidPath($path) {
        return preg_match('/^[a-zA-Z0-9\/_-]+$/', $path);
    }

    private function saveConfig() {
        $config = [
            'siteName' => $_POST['siteName'] ?? 'AI Analytics',
            'links' => [
                'fileUpload' => $_POST['fileUploadPath'],
                'aiSystem' => $_POST['aiSystemPath'],
                'imageAnalyzer' => $_POST['imageAnalyzerPath']
            ],
            'logo' => [
                'path' => '/logo.svg',
                'alt' => $_POST['siteName'] ?? 'AI Analytics Logo'
            ]
        ];

        // Zapisz konfigurację do pliku
        $configJson = json_encode($config, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        file_put_contents('../config.json', $configJson);

        // Zaktualizuj manifest
        $manifest = [
            'name' => $config['siteName'],
            'short_name' => $config['siteName'],
            'icons' => [
                [
                    'src' => $config['logo']['path'],
                    'sizes' => '32x32',
                    'type' => 'image/svg+xml'
                ]
            ],
            'theme_color' => '#2563eb',
            'background_color' => '#ffffff',
            'display' => 'standalone'
        ];

        file_put_contents('site.webmanifest', json_encode($manifest, JSON_PRETTY_PRINT));
    }

    private function cleanup() {
        // Usuń plik instalacyjny po zakończeniu
        if ($this->success) {
            @unlink(__FILE__);
        }
    }

    public function render() {
        if ($this->success) {
            $this->renderSuccess();
        } else {
            $this->renderForm();
        }
    }

    private function renderSuccess() {
        echo '<div class="min-h-screen bg-gray-50 flex items-center justify-center">
            <div class="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <div class="text-center mb-6">
                    <h1 class="text-2xl font-bold text-green-600 mb-2">Instalacja zakończona pomyślnie!</h1>
                    <p class="text-gray-600">Strona została poprawnie skonfigurowana.</p>
                </div>
                <div class="bg-green-50 p-4 rounded-lg mb-6">
                    <ul class="text-sm text-green-800">
                        <li>✓ Konfiguracja została zapisana</li>
                        <li>✓ Manifest został zaktualizowany</li>
                        <li>✓ Instalator został usunięty</li>
                    </ul>
                </div>
                <div class="text-center">
                    <a href="/" class="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Przejdź do strony głównej
                    </a>
                </div>
            </div>
        </div>';
    }

    private function renderForm() {
        echo '<!DOCTYPE html>
        <html lang="pl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Instalator AI Analytics</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="min-h-screen bg-gray-50">
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                    <div class="text-center mb-8">
                        <h1 class="text-3xl font-bold text-gray-900 mb-2">Instalator AI Analytics</h1>
                        <p class="text-gray-600">Skonfiguruj podstawowe ustawienia strony</p>
                    </div>';

        if (!empty($this->errors)) {
            echo '<div class="bg-red-50 text-red-800 p-4 rounded-lg mb-6">
                <ul class="list-disc list-inside">';
            foreach ($this->errors as $error) {
                echo "<li>{$error}</li>";
            }
            echo '</ul></div>';
        }

        echo '<form method="POST" class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Nazwa serwisu
                            </label>
                            <input type="text" name="siteName" value="AI Analytics" 
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Ścieżka do wgrywania plików
                            </label>
                            <input type="text" name="fileUploadPath" placeholder="/wgrywanie-plikow" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Ścieżka do systemu AI
                            </label>
                            <input type="text" name="aiSystemPath" placeholder="/system-ai" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Ścieżka do analizatora zdjęć
                            </label>
                            <input type="text" name="imageAnalyzerPath" placeholder="/analizator-zdjec" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div class="pt-4">
                            <button type="submit" 
                                class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                                Zainstaluj
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </body>
        </html>';
    }
}

$installer = new Installer();
$installer->render();
?>