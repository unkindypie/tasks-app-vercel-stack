import { Link } from "@/ui/components/core/Link";
import React from "react";

export interface WrapperProps {
  children: React.ReactNode;
  showBack?: boolean;
}

export function Wrapper({ children, showBack }: WrapperProps) {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="flex flex-col h-full w-full justify-between items-center  font-[family-name:var(--font-geist-sans)] max-w-screen-md">
        <div className="flex flex-row justify-between items-center w-full p-5">
          <h1 className="text-4xl">Tasks app</h1>
          <div className="flex flex-row">
            <Link href="/login">Login</Link>
            {showBack && (
              <Link className="ml-5" href="/">
                Back to Home
              </Link>
            )}
          </div>
        </div>
        {children}
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center p-5">
          Copyright © Max Corp PTY LTD
        </footer>
      </div>
    </div>
  );
}
