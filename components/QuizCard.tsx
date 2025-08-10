'use client';
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import MathRenderer from './MathRenderer';

interface Props {
  question: any;
  index: number;
  selectedOption: number | null;
  onSelect: (option: number) => void;
}

export default function QuizCard({ question, index, selectedOption, onSelect }: Props) {
  return (
    <FormControl component="fieldset">
      <Typography variant="h6" gutterBottom>
        Question {index + 1}
      </Typography>
      <MathRenderer content={question.question} />
      <RadioGroup value={selectedOption ?? ''} onChange={(e) => onSelect(parseInt(e.target.value))}>
        {[1, 2, 3, 4].map((opt) => (
          <FormControlLabel
            key={opt}
            value={opt}
            control={<Radio />}
            label={<MathRenderer content={question[`option${opt}`]} />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

