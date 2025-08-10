'use client';

import { Suspense } from 'react';
import ResultContent from './ResultContent';

export default function ResultPage() {
  return (
    <Suspense fallback={<div>Loading results...</div>}>
      <ResultContent />
    </Suspense>
  );
}
}



