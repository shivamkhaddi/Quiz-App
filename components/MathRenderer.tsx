'use client';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const config = {
  loader: { load: ['input/tex', 'output/chtml'] },
};

export default function MathRenderer({ content }: { content: string }) {
  return (
    <MathJaxContext config={config}>
      <MathJax dynamic inline>{content}</MathJax>
    </MathJaxContext>
  );
}