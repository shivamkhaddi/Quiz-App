import { CssBaseline, Container } from '@mui/material';
import EmotionCacheProvider from './EmotionCacheProvider'; 

export const metadata = {
  title: 'Quiz App',
  description: 'Math Quiz with Next.js and MUI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <EmotionCacheProvider>
          <CssBaseline />
          <Container maxWidth="md" sx={{ py: 4 }}>
            {children}
          </Container>
        </EmotionCacheProvider>
      </body>
    </html>
  );
}
