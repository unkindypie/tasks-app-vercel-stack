import * as React from "react";

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      }
    >
      {children}
    </button>
  );
};
