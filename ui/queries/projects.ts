import { getProjects } from '@/server-actions/projects';
import { useQuery } from '@tanstack/react-query';

export const useProjectsQuery = (search?: string) => {
  const data = useQuery({
    queryFn: () => getProjects(search),
    queryKey: ['projects', search],
  });
  return data;
};
