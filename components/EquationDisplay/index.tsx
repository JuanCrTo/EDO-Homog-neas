import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const EquationDisplay: React.FC<{ latex: string }> = ({ latex }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      katex.render(latex, ref.current, {
        throwOnError: false,
      });
    }
  }, [latex]);

  return <div ref={ref} className="mt-4" />;
};

export default EquationDisplay;
