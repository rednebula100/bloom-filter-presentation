import type { ReactNode } from "react";

type SlideFrameProps = {
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
};

export default function SlideFrame({ children, className = "", eyebrow, title }: SlideFrameProps) {
  return (
    <section className={`slide-frame ${className}`.trim()} aria-label={title ?? eyebrow}>
      {(eyebrow || title) && (
        <header className="slide-heading">
          {eyebrow && <p className="slide-eyebrow">{eyebrow}</p>}
          {title && <h1 className="slide-title">{title}</h1>}
        </header>
      )}
      {children}
    </section>
  );
}
