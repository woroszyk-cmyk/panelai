# Instalator AI Analytics

Ten instalator pomoże skonfigurować podstawowe elementy strony AI Analytics.

## Instrukcja użycia

1. Edytuj plik `config.json` aby dostosować:
   - Ścieżki do podstron
   - Ścieżkę do logo
   - Nazwę serwisu

2. Uruchom instalator:
   ```bash
   node install/install.js
   ```

3. Po instalacji sprawdź:
   - Czy logo zostało poprawnie skonfigurowane
   - Czy linki działają prawidłowo
   - Czy manifest został zaktualizowany

## Struktura plików

- `install/`
  - `config.json` - Plik konfiguracyjny
  - `install.js` - Skrypt instalacyjny
  - `README.md` - Dokumentacja

## Konfiguracja

W pliku `config.json` możesz dostosować:

```json
{
  "siteName": "Nazwa serwisu",
  "links": {
    "fileUpload": "/sciezka-do-wgrywania",
    "aiSystem": "/sciezka-do-ai",
    "imageAnalyzer": "/sciezka-do-analizatora"
  },
  "logo": {
    "path": "/sciezka/do/logo.svg",
    "alt": "Tekst alternatywny logo"
  }
}
```