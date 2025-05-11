'use client';
import React, { useEffect, useRef } from 'react';
import { MathfieldElement } from 'mathlive';

const MathInput: React.FC<{ onChange: (latex: string) => void }> = ({ onChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mathfieldRef = useRef<MathfieldElement | null>(null);

  useEffect(() => {
    const mf = new MathfieldElement();

    mf.setOptions({
      virtualKeyboardMode: 'manual',
    });

    mf.addEventListener('input', () => {
      onChange(mf.getValue());
    });

    if (containerRef.current && !containerRef.current.hasChildNodes()) {
      containerRef.current.appendChild(mf);
      mathfieldRef.current = mf;
    }

    return () => {
      if (mathfieldRef.current) {
        mathfieldRef.current.remove();
      }
    };
  }, [onChange]);

  return <div ref={containerRef} />;
};

export default MathInput;
