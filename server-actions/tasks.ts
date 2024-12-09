'use server';

import { db } from '@/schema/db';
import { Project, Task, TaskStatusEnumType } from '@/schema/models';
import { eq, ilike } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';

export interface CreateTaskRequest {
  text: string;
  projectId: number;
  status: TaskStatusEnumType;
}

export async function getTasks(search?: string) {
  const query = db
    .select({
      id: Task.id,
      text: Task.text,
      status: Task.status,
      createdAt: Task.createdAt,
      projectId: Task.projectId,
      projectName: Project.name,
    })
    .from(Task)
    .innerJoin(Project, eq(Task.projectId, Project.id));

  if (search) {
    query.where(ilike(Task.text, `%${search}%`));
  }

  return await query;
}

export async function createTask({
  text,
  status,
  projectId,
}: CreateTaskRequest) {
  console.log('Creating task', text, status, projectId);
  await db.insert(Task).values({ text, projectId, status }).execute();

  revalidateTag('/');
}

export async function deleteTask(id: number) {
  await db.delete(Task).where(eq(Task.id, id));

  revalidateTag('/');
}
