import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article";
};

/**
 * Появление блока при скролле: fade + сдвиг на 20px.
 * Серверный компонент — анимацию включает один общий RevealObserver (CSS в globals.css),
 * поэтому на каждый блок не грузится JS. prefers-reduced-motion и отключённый JS учтены в CSS.
 */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const style = delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined;
  return (
    <Tag data-reveal="" className={className} style={style}>
      {children}
    </Tag>
  );
}
