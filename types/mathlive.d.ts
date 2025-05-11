declare module 'mathlive' {
  export class MathfieldElement extends HTMLElement {
    getValue(): string;
    setValue(value: string): void;
    setOptions(opts: any): void;
  }

  export function convertLatexToMarkup(latex: string, options?: any): string;
}
