INSTRUKCJA INSTALACJI AI ANALYTICS
============================

1. Wgraj wszystkie pliki na serwer FTP do głównego katalogu strony.

2. Upewnij się, że następujące pliki i katalogi mają odpowiednie uprawnienia:
   - config.json: 644 (rw-r--r--)
   - public/site.webmanifest: 644 (rw-r--r--)
   - public/install.php: 644 (rw-r--r--)

3. Otwórz przeglądarkę i przejdź do:
   http://twoja-domena.pl/install.php

4. Wypełnij formularz instalacyjny:
   - Podaj nazwę serwisu (domyślnie: AI Analytics)
   - Ustaw ścieżki do poszczególnych modułów
   - Kliknij "Zainstaluj"

5. Po pomyślnej instalacji:
   - Konfiguracja zostanie zapisana
   - Manifest strony zostanie zaktualizowany
   - Plik instalacyjny zostanie automatycznie usunięty

6. WAŻNE: Po instalacji usuń ten plik (README_INSTALL.txt)

W razie problemów:
- Sprawdź uprawnienia plików
- Sprawdź czy PHP ma uprawnienia do zapisu w katalogu
- Upewnij się, że serwer obsługuje PHP 7.4 lub nowszy