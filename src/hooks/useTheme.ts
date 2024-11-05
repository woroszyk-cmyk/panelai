import { useEffect } from 'react';
import type { ColorPalette } from '../types/config';

export function useTheme(colors: ColorPalette) {
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [colors]);
}