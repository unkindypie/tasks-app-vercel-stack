import { Link } from '@/ui/components/core/Link';
import { useCurrentUserQuery } from '@/ui/queries/users';
import NextLink from 'next/link';
import React from 'react';

export interface WrapperProps {
  children: React.ReactNode;
  showBack?: boolean;
  className?: string;
}

export function Wrapper({ children, showBack, className }: WrapperProps) {
  const { data, isLoading, isError } = useCurrentUserQuery();

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="flex flex-col h-full w-full justify-between items-center  font-[family-name:var(--font-geist-sans)] max-w-screen-md">
        <div className="flex flex-row justify-between items-center w-full pt-5 mb-5">
          <NextLink href="/">
            <h1 className="text-4xl">Tasks app</h1>
            {data && <h2 className="text-lg">{data?.name}</h2>}
          </NextLink>
          <div className="flex flex-row space-x-2">
            {isLoading && <span>Loading...</span>}

            {isError && <Link href="/login">Login</Link>}

            {isError && <Link href="/sign-up">Sign Up</Link>}

            {data && <Link href="/sign-out">Logout</Link>}

            {showBack && data && (
              <Link className="ml-5" href="/">
                Back to Home
              </Link>
            )}
          </div>
        </div>
        <div className={`h-full max-w-screen-md w-full ${className}`}>
          {children}
        </div>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center p-5">
          Copyright 2025 © Max Corp PTY LTD
        </footer>
      </div>
    </div>
  );
}
