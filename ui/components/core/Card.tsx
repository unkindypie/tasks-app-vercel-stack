import * as React from 'react';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={`border-white border p-5 rounded-md flex flex-col ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
