'use client';

import { useRouter } from 'next/navigation';
import { Button, Stack, Typography, Box } from '@mui/material';

export default function CoverPage() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/difficulty');
  };

  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h2" fontWeight="bold" gutterBottom>
        Quiz Time
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Time to test your knowledge
      </Typography>

      <Stack alignItems="center" mt={4}>
        <Button variant="contained" size="large" onClick={handleStart}>
          Start Quiz
        </Button>
      </Stack>
    </Box>
  );
}
