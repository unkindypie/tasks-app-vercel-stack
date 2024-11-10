"use client";

import { Button } from "@/app/ui/components/Button";

export default function Home() {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="flex flex-col h-full w-full justify-between items-center  font-[family-name:var(--font-geist-sans)] max-w-screen-md">
        <div className="flex flex-row justify-between items-center w-full p-5">
          <h1 className="text-4xl">Tasks app</h1>
          <Button onClick={() => console.log("login")}>Login</Button>
        </div>
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Button onClick={() => console.log("clicked")}>Add task</Button>
          </div>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center p-5">
          Copyright © Max Corp PTY LTD
        </footer>
      </div>
    </div>
  );
}
