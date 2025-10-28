import { ReactNode } from "react";

interface CardContainerProps {
  children: ReactNode;
  className?: string;
}

export default function CardContainer({
  children,
  className = "",
}: CardContainerProps) {
  return (
    <div
      className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 ${className}`}
    >
      {children}
    </div>
  );
}
