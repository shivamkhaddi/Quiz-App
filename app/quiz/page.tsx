'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import QuizCard from '@/components/QuizCard';
import { shuffleArray } from '@/utils/shuffle';
import {
  Button,
  Stack,
  Typography,
  CircularProgress,
  Box,
  LinearProgress,
  Alert,
} from '@mui/material';

const TOTAL_TIME = 60;

function QuizPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const difficulty = searchParams.get('difficulty');

  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [timerExpired, setTimerExpired] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const res = await fetch('/questions.json');
        const data = await res.json();

        let filtered = data;
        if (difficulty && difficulty !== 'Any') {
          filtered = data.filter((q: any) => q.difficulty === difficulty);
        }

        const selected = shuffleArray(filtered).slice(0, 4);
        setQuestions(selected);
        setAnswers(new Array(selected.length).fill(null));
      } catch (error) {
        console.error('Failed to load questions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [difficulty]);

  useEffect(() => {
    if (loading || questions.length === 0 || timerExpired) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimerExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, questions, timerExpired]);

  useEffect(() => {
    if (timerExpired) {
      const encodedQuestions = encodeURIComponent(JSON.stringify(questions));
      const encodedAnswers = encodeURIComponent(JSON.stringify(answers));
      router.push(`/result?q=${encodedQuestions}&a=${encodedAnswers}`);
    }
  }, [timerExpired]);

  const handleAnswerSelect = (option: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[current] = option;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const encodedQuestions = encodeURIComponent(JSON.stringify(questions));
    const encodedAnswers = encodeURIComponent(JSON.stringify(answers));
    router.push(`/result?q=${encodedQuestions}&a=${encodedAnswers}`);
  };

  if (loading) {
    return (
      <Stack alignItems="center" mt={8}>
        <CircularProgress />
        <Typography mt={2}>Loading quiz...</Typography>
      </Stack>
    );
  }

  if (!questions.length || !questions[current]) {
    return (
      <Typography color="error" mt={4}>
        No questions found for the selected difficulty.
      </Typography>
    );
  }

  return (
    <Stack spacing={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Math Quiz</Typography>
        <Typography variant="body1">
          ⏱ Time Left: <strong>{timeLeft}s</strong>
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={(timeLeft / TOTAL_TIME) * 100}
        sx={{ height: 10, borderRadius: 5 }}
        color={timeLeft <= 10 ? 'error' : 'primary'}
      />

      {timerExpired && (
        <Alert severity="warning">Time's up! Submitting your quiz automatically.</Alert>
      )}

      <QuizCard
        question={questions[current]}
        index={current}
        selectedOption={answers[current]}
        onSelect={handleAnswerSelect}
      />
      

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => setCurrent((prev) => Math.max(prev - 1, 0))}
          disabled={current === 0}
        >
          Previous
        </Button>

        {current < questions.length - 1 ? (
          <Button
            variant="contained"
            onClick={() => setCurrent((prev) => prev + 1)}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            disabled={timerExpired}
          >
            Submit Quiz
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

// ⬇️ Wrap in Suspense for useSearchParams() support
export default function QuizPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizPageContent />
    </Suspense>
  );
}
