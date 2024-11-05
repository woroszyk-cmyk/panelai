import fs from 'fs/promises';
import path from 'path';

async function installSystem() {
  try {
    // Wczytaj konfigurację
    const configPath = path.join(process.cwd(), 'install', 'config.json');
    const config = JSON.parse(await fs.readFile(configPath, 'utf8'));

    // Aktualizuj komponenty React
    const appContent = `import React from 'react';
import { FileUp, Brain, Image } from 'lucide-react';
import { Link } from 'react-router-dom';

function FeatureCard({ icon: Icon, title, description, link }) {
  return (
    <Link to={link} className="block">
      <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="flex flex-col items-center text-center">
          <div className="bg-blue-50 p-3 rounded-full mb-4">
            <Icon className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
}

function App() {
  const features = [
    {
      icon: FileUp,
      title: "Wgrywanie plików",
      description: "Łatwe i bezpieczne przesyłanie plików z zaawansowanym systemem zarządzania danymi.",
      link: "${config.links.fileUpload}"
    },
    {
      icon: Brain,
      title: "System AI",
      description: "Zaawansowane algorytmy AI do analizy i przetwarzania danych w czasie rzeczywistym.",
      link: "${config.links.aiSystem}"
    },
    {
      icon: Image,
      title: "Analizator zdjęć",
      description: "Profesjonalna analiza obrazów z wykorzystaniem najnowszych technologii computer vision.",
      link: "${config.links.imageAnalyzer}"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src="${config.logo.path}" alt="${config.logo.alt}" className="w-8 h-8" />
              <span className="text-2xl font-bold text-gray-800">${config.siteName}</span>
            </Link>
            <nav>
              <ul className="flex gap-6">
                <li><Link to="/o-nas" className="text-gray-600 hover:text-blue-600 transition-colors">O nas</Link></li>
                <li><Link to="/kontakt" className="text-gray-600 hover:text-blue-600 transition-colors">Kontakt</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Banner Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/40"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Zaawansowana Analityka AI
          </h1>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Wykorzystaj moc sztucznej inteligencji do analizy danych i obrazów. 
            Odkryj nowe możliwości z naszymi zaawansowanymi narzędziami.
          </p>
          <Link 
            to={features[0].link} 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Rozpocznij teraz
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <img src="${config.logo.path}" alt="${config.logo.alt}" className="w-6 h-6" />
              <span className="text-xl font-semibold">${config.siteName}</span>
            </div>
            <div className="text-sm">
              © ${new Date().getFullYear()} ${config.siteName}. Wszelkie prawa zastrzeżone.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;`;

    // Zapisz zaktualizowany komponent App
    await fs.writeFile(path.join(process.cwd(), 'src', 'App.tsx'), appContent);

    // Zaktualizuj manifest
    const manifestContent = {
      name: config.siteName,
      short_name: config.siteName,
      icons: [
        {
          src: config.logo.path,
          sizes: "32x32",
          type: "image/svg+xml"
        }
      ],
      theme_color: "#2563eb",
      background_color: "#ffffff",
      display: "standalone"
    };

    await fs.writeFile(
      path.join(process.cwd(), 'public', 'site.webmanifest'),
      JSON.stringify(manifestContent, null, 2)
    );

    console.log('✅ Instalacja zakończona pomyślnie!');
    console.log(`
🔧 Skonfigurowane elementy:
- Logo: ${config.logo.path}
- Linki:
  • Wgrywanie plików: ${config.links.fileUpload}
  • System AI: ${config.links.aiSystem}
  • Analizator zdjęć: ${config.links.imageAnalyzer}
    `);

  } catch (error) {
    console.error('❌ Błąd podczas instalacji:', error);
    process.exit(1);
  }
}

installSystem();