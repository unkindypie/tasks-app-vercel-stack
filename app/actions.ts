"use server";

const tasks = [
  {
    id: 1,
    title: "Buy milk",
    completed: false,
  },
  {
    id: 2,
    title: "Buy eggs",
    completed: false,
  },
  {
    id: 3,
    title: "Buy bread",
    completed: false,
  },
];
export async function getTasks(search?: string) {
  if (search) return tasks.filter((task) => task.title.includes(search));
  return tasks;
}
