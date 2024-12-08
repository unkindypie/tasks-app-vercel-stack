import { ArrowPathIcon } from '@heroicons/react/20/solid';
import * as React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  isLoading,
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 px-4 ${className}`}
      disabled={isLoading}
    >
      {children}
      {isLoading && <ArrowPathIcon className="animate-spin size-4 ml-2" />}
    </button>
  );
};
