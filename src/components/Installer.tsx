import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ColorPicker from './ColorPicker';
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

interface ModuleLinkInputProps {
  label: string;
  value: ModuleLink;
  onChange: (value: ModuleLink) => void;
}

function ModuleLinkInput({ label, value, onChange }: ModuleLinkInputProps) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id={`internal-${label}`}
            checked={!value.useExternal}
            onChange={() => onChange({ ...value, useExternal: false })}
            className="h-4 w-4 text-blue-600"
          />
          <label htmlFor={`internal-${label}`} className="text-sm text-gray-600">
            Wewnętrzna ścieżka
          </label>
        </div>
        <input
          type="text"
          value={value.internal}
          onChange={(e) => onChange({ ...value, internal: e.target.value })}
          disabled={value.useExternal}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
        
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id={`external-${label}`}
            checked={value.useExternal}
            onChange={() => onChange({ ...value, useExternal: true })}
            className="h-4 w-4 text-blue-600"
          />
          <label htmlFor={`external-${label}`} className="text-sm text-gray-600">
            Zewnętrzny adres URL
          </label>
        </div>
        <input
          type="url"
          value={value.external || ''}
          onChange={(e) => onChange({ ...value, external: e.target.value })}
          disabled={!value.useExternal}
          placeholder="https://"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
      </div>
    </div>
  );
}

function Installer() {
  const [config, setConfig] = useState<InstallerConfig>(defaultConfig);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedConfig = localStorage.getItem('aiAnalyticsConfig');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('aiAnalyticsConfig', JSON.stringify(config));
    
    const root = document.documentElement;
    Object.entries(config.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    setSuccess(true);
    setTimeout(() => {
      navigate('/admin');
    }, 2000);
  };

  if (success) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Konfiguracja zapisana!</h2>
          <p className="text-gray-600">Zmiany zostały pomyślnie zapisane.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Instalator systemu</h1>
        <p className="text-gray-600">Skonfiguruj podstawowe ustawienia strony</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Podstawowe informacje</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nazwa serwisu
              </label>
              <input
                type="text"
                value={config.siteName}
                onChange={(e) => setConfig({
                  ...config,
                  siteName: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ścieżka do logo
                </label>
                <input
                  type="text"
                  value={config.logo.path}
                  onChange={(e) => setConfig({
                    ...config,
                    logo: { ...config.logo, path: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tekst alternatywny logo
                </label>
                <input
                  type="text"
                  value={config.logo.alt}
                  onChange={(e) => setConfig({
                    ...config,
                    logo: { ...config.logo, alt: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL bannera
                </label>
                <input
                  type="text"
                  value={config.banner.url}
                  onChange={(e) => setConfig({
                    ...config,
                    banner: { ...config.banner, url: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tekst alternatywny bannera
                </label>
                <input
                  type="text"
                  value={config.banner.alt}
                  onChange={(e) => setConfig({
                    ...config,
                    banner: { ...config.banner, alt: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <ModuleLinkInput
                label="Wgrywanie plików"
                value={config.links.fileUpload}
                onChange={(value) => setConfig({
                  ...config,
                  links: { ...config.links, fileUpload: value }
                })}
              />

              <ModuleLinkInput
                label="System AI"
                value={config.links.aiSystem}
                onChange={(value) => setConfig({
                  ...config,
                  links: { ...config.links, aiSystem: value }
                })}
              />

              <ModuleLinkInput
                label="Analizator zdjęć"
                value={config.links.imageAnalyzer}
                onChange={(value) => setConfig({
                  ...config,
                  links: { ...config.links, imageAnalyzer: value }
                })}
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Paleta kolorów</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ColorPicker
              label="Kolor podstawowy"
              value={config.colors.primary}
              onChange={(value) => setConfig({
                ...config,
                colors: { ...config.colors, primary: value }
              })}
            />
            <ColorPicker
              label="Kolor drugorzędny"
              value={config.colors.secondary}
              onChange={(value) => setConfig({
                ...config,
                colors: { ...config.colors, secondary: value }
              })}
            />
            <ColorPicker
              label="Kolor akcentujący"
              value={config.colors.accent}
              onChange={(value) => setConfig({
                ...config,
                colors: { ...config.colors, accent: value }
              })}
            />
            <ColorPicker
              label="Kolor tła"
              value={config.colors.background}
              onChange={(value) => setConfig({
                ...config,
                colors: { ...config.colors, background: value }
              })}
            />
            <ColorPicker
              label="Kolor tekstu"
              value={config.colors.text}
              onChange={(value) => setConfig({
                ...config,
                colors: { ...config.colors, text: value }
              })}
            />
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Zapisz konfigurację
          </button>
        </div>
      </form>
    </div>
  );
}

export default Installer;