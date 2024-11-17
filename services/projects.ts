"use server";

import { db } from "@/schema/db";
import { Project } from "@/schema/models";
import { ilike } from "drizzle-orm";

export async function getProjects(search?: string) {
  const query = db.select().from(Project);

  if (search) {
    query.where(ilike(Project.name, `%${search}%`));
  }

  return await query;
}

export async function createProject({ name }: { name: string }) {
  await db.insert(Project).values({ name }).execute();
}
