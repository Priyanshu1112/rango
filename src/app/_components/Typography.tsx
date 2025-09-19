"use client";

import { cn } from "@/lib/utils";

interface TypographyProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
}

export const H1 = ({ children, text, className }: TypographyProps) => {
  return (
    <h1
      className={cn(
        "font-semibold text-2xl leading-8 text-slate-900",
        className
      )}
    >
      {children || text}
    </h1>
  );
};

export const Text3XL = ({ children, text, className }: TypographyProps) => {
  return (
    <h2 className={cn("font-medium text-3xl leading-", className)}>
      {children || text}
    </h2>
  );
};

export const TextLG = ({ children, text, className }: TypographyProps) => {
  return (
    <h2 className={cn("font-medium text-lg leading-7", className)}>
      {children || text}
    </h2>
  );
};

export const TextSM = ({ text, className, children }: TypographyProps) => {
  return (
    <span className={cn("text-sm font-medium leading-5", className)}>
      {children || text}
    </span>
  );
};

export const TextXS = ({ text, className, children }: TypographyProps) => {
  return (
    <span className={cn("text-xs font-medium leading-4", className)}>
      {children || text}
    </span>
  );
};
