import NextLink, { LinkProps } from 'next/link';
import * as React from 'react';

export const Link: React.FC<
  LinkProps & { children: React.ReactNode; className?: string }
> = ({ children, className, ...props }) => {
  return (
    <NextLink
      className={`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 px-4 ${className ?? ''}`}
      {...props}
    >
      {children}
    </NextLink>
  );
};
