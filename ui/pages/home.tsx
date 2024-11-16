"use client";

import { Button } from "@/ui/components/core/Button";
import { useTasks } from "@/ui/queries/tasks";

import React from "react";

export default function Home() {
  const [search, setSearch] = React.useState("");
  const { data, isLoading } = useTasks(search);

  return (
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
  );
}
