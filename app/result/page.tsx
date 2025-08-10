'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Typography, Stack, Button } from '@mui/material';
import MathRenderer from '@/components/MathRenderer';

export default function ResultPage() {
  const params = useSearchParams();
  const router = useRouter();

  const questions = JSON.parse(params.get('q') || '[]');
  const answers = JSON.parse(params.get('a') || '[]');

  const score = questions.reduce((sum: number, q: any, i: number) => {
    return sum + (answers[i] === q.correctOption ? q.marks : 0);
  }, 0);

  const total = questions.reduce((acc: number, q: any) => acc + q.marks, 0);
  const percentage = ((score / total) * 100).toFixed(2);

  return (
    <>
      <Typography variant="h5" gutterBottom>Results</Typography>
      <Typography>Score: {score} / {total}</Typography>
      <Typography>Percentage: {percentage}%</Typography>

      {questions.map((q: any, i: number) => (
        <Stack key={i} spacing={1} mt={4} p={2} border="1px solid #ccc" borderRadius={2}>
          <Typography variant="subtitle1">Question {i + 1} ({q.difficulty})</Typography>
          <MathRenderer content={q.question} />
          <Typography>
            <strong>Your Answer:</strong>{' '}
            <MathRenderer content={q[`option${answers[i]}`] || 'Not answered'} />
          </Typography>
          <Typography>
            <strong>Correct Answer:</strong>{' '}
            <MathRenderer content={q[`option${q.correctOption}`]} />
          </Typography>
        </Stack>
      ))}

      <Stack direction="row" mt={4}>
        <Button variant="contained" onClick={() => router.push('/')}>
          Restart Quiz
        </Button>
      </Stack>
    </>
  );
}

