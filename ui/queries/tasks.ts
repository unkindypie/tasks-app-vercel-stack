import { createTask, deleteTask, getTasks } from '@/server-actions/tasks';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useTasksQuery = (search?: string) => {
  const data = useQuery({
    queryFn: () => getTasks(search),
    queryKey: ['tasks', search],
  });
  return data;
};

export const useCreateTaskMutation = () => {
  // const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      // NOTE: If you don't call "revalidateTag" in server action or the page which showws updated data is using client rendering,
      // do invalidation in React Query like here:
      // queryClient.invalidateQueries({
      //   queryKey: ["tasks"],
      //   exact: false,
      // });
    },
  });
  return mutation;
};

export const useDeleteTaskMutation = () => {
  const mutation = useMutation({
    mutationFn: (id: number) => deleteTask(id),
  });
  return mutation;
};
