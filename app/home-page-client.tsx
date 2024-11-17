"use client";
import React from "react";

import { Wrapper } from "@/ui/components/core/Wrapper";
import { Link } from "@/ui/components/core/Link";
import { useDeleteTaskMutation, useTasksQuery } from "@/ui/queries/tasks";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

export function HomePageClient() {
  const [search, setSearch] = React.useState("");
  const { data, isLoading } = useTasksQuery(search);
  const { mutateAsync, isPending, variables } = useDeleteTaskMutation();

  return (
    <Wrapper>
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center mt-14 border-white border p-5 rounded-md">
        <div className="flex gap-4 flex-row w-full justify-between ">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks"
            className="p-2 border border-gray-300 rounded-md text-black"
          />
          <Link href="/tasks/create">Add task</Link>
        </div>
        {isLoading && <p>Loading...</p>}
        {data && (
          <ul className="flex flex-col gap-4 w-full">
            {data?.map((task) => (
              <li
                key={task.id}
                className="flex gap-4 items-center border-white border p-5 rounded-md w-full justify-between"
              >
                <p className="max-w-40 w-40">
                  <b>{task.text}</b>
                </p>
                <p>{task.status}</p>
                <p>
                  {task.createdAt.toLocaleDateString()}
                  {", "}
                  {task.createdAt.toLocaleTimeString()}
                </p>
                <p>{task.projectName}</p>
                <div className="min-w-12">
                  <span
                    className="hover:font-medium hover:cursor-pointer flex flex-row items-center"
                    onClick={() => !isPending && mutateAsync(task.id)}
                  >
                    Delete
                    {isPending && variables == task.id && (
                      <ArrowPathIcon className="animate-spin size-4 ml-2" />
                    )}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
        {!data && !isLoading && <p>No tasks yet</p>}
      </main>
    </Wrapper>
  );
}
