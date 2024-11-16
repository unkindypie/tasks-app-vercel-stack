import { getTasks } from "@/services/tasks";
import { useQuery } from "@tanstack/react-query";

export const useTasks = (search?: string) => {
  const data = useQuery({
    queryFn: () => getTasks(search),
    queryKey: ["tasks", search],
  });
  return data;
};
