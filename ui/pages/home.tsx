"use client";

import { Button } from "@/ui/components/Button";

import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/app/actions";
import React from "react";

const useTasks = (search?: string) => {
  const data = useQuery({
    queryFn: () => getTasks(search),
    queryKey: ["tasks", search],
  });
  return data;
};

export default function Home() {
  const [search, setSearch] = React.useState("");
  const { data, isLoading } = useTasks(search);

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
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks"
            className="p-2 border border-gray-300 rounded-md"
          />
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {data?.map((task) => (
                <li key={task.id} className="flex gap-4 items-center">
                  <input type="checkbox" />
                  <p>{task.title}</p>
                </li>
              ))}
            </ul>
          )}
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center p-5">
          Copyright © Max Corp PTY LTD
        </footer>
      </div>
    </div>
  );
}
