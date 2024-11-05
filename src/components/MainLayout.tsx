import React, { useState, useEffect } from 'react';
import { FileUp, Brain, Image, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { InstallerConfig, ModuleLink } from '../types/config';

const defaultConfig: InstallerConfig = {
  siteName: "AI Analytics",
  logo: {
    path: "/logo.svg",
    alt: "AI Analytics Logo"
  },
  banner: {
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    alt: "Banner"
  },
  links: {
    fileUpload: {
      internal: "/wgrywanie-plikow",
      useExternal: false
    },
    aiSystem: {
      internal: "/system-ai",
      useExternal: false
    },
    imageAnalyzer: {
      internal: "/analizator-zdjec",
      useExternal: false
    }
  },
  colors: {
    primary: "#2563eb",
    secondary: "#1e40af",
    accent: "#3b82f6",
    background: "#f3f4f6",
    text: "#111827"
  }
};

function FeatureCard({ icon: Icon, title, description, link }: { 
  icon: React.ElementType;
  title: string;
  description: string;
  link: ModuleLink;
}) {
  const href = link.useExternal ? link.external : link.internal;
  const Component = link.useExternal ? 'a' : Link;
  const props = link.useExternal ? { href, target: "_blank", rel: "noopener noreferrer" } : { to: href };

  return (
    <Component {...props} className="block">
      <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="flex flex-col items-center text-center">
          <div className="bg-blue-50 p-3 rounded-full mb-4">
            <Icon className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </Component>
  );
}

function MainLayout() {
  const [config, setConfig] = useState<InstallerConfig>(defaultConfig);
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: FileUp,
      title: "Wgrywanie plików",
      description: "Łatwe i bezpieczne przesyłanie plików z zaawansowanym systemem zarządzania danymi.",
      link: config.links.fileUpload
    },
    {
      icon: Brain,
      title: "System AI",
      description: "Zaawansowane algorytmy AI do analizy i przetwarzania danych w czasie rzeczywistym.",
      link: config.links.aiSystem
    },
    {
      icon: Image,
      title: "Analizator zdjęć",
      description: "Profesjonalna analiza obrazów z wykorzystaniem najnowszych technologii computer vision.",
      link: config.links.imageAnalyzer
    }
  ];

  useEffect(() => {
    const savedConfig = localStorage.getItem('aiAnalyticsConfig');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src={config.logo.path} alt={config.logo.alt} className="w-8 h-8" />
              <span className="text-2xl font-bold text-gray-800">{config.siteName}</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link to="/o-nas" className="text-gray-600 hover:text-blue-600 transition-colors">O nas</Link>
              <Link to="/kontakt" className="text-gray-600 hover:text-blue-600 transition-colors">Kontakt</Link>
              {isAuthenticated ? (
                <Link to="/admin" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                  <Settings className="w-4 h-4" />
                  <span>Panel</span>
                </Link>
              ) : (
                <Link to="/admin/login" className="text-gray-600 hover:text-blue-600 transition-colors">Login</Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={config.banner.url}
            alt={config.banner.alt}
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
          {features[0].link.useExternal ? (
            <a 
              href={features[0].link.external}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Rozpocznij teraz
            </a>
          ) : (
            <Link 
              to={features[0].link.internal}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Rozpocznij teraz
            </Link>
          )}
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <img src={config.logo.path} alt={config.logo.alt} className="w-6 h-6" />
              <span className="text-xl font-semibold">{config.siteName}</span>
            </div>
            <div className="text-sm">
              © {new Date().getFullYear()} {config.siteName}. Wszelkie prawa zastrzeżone.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;