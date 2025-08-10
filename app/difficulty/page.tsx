'use client';

import { useRouter } from 'next/navigation';
import { Button, Stack, Typography, Box } from '@mui/material';

const difficulties = ['Easy', 'Medium', 'Hard', 'Any'];

export default function DifficultyPage() {
  const router = useRouter();

  return (
    <Box textAlign="center">
      <Typography variant="h4" gutterBottom>Select Difficulty</Typography>
      <Stack spacing={2} mt={4} alignItems="center">
        {difficulties.map((level) => (
          <Button
            key={level}
            variant="contained"
            onClick={() => router.push(`/quiz?difficulty=${level}`)}
            sx={{ minWidth: 200 }}
          >
            {level}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
