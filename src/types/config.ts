export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface ModuleLink {
  internal: string;
  external?: string;
  useExternal: boolean;
}

export interface InstallerConfig {
  siteName: string;
  logo: {
    path: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
  links: {
    fileUpload: ModuleLink;
    aiSystem: ModuleLink;
    imageAnalyzer: ModuleLink;
  };
  colors: ColorPalette;
}