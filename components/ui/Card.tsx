import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
};

export function Card({ children, className, interactive = false }: CardProps) {
  return <div className={cn("card overflow-hidden", interactive && "card-interactive", className)}>{children}</div>;
}
