'use client';

import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create MUI theme (customize if you want)
const theme = createTheme();

// Create Emotion cache instance
const muiCache = createCache({ key: 'mui', prepend: true });

export default function EmotionCacheProvider({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}