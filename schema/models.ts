import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const TaskStatusEnum = pgEnum('task_status_enum', [
  'Todo',
  'In Progress',
  'Done',
]);

export type TaskStatusEnumType = (typeof TaskStatusEnum.enumValues)[number];

export const Project = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const Task = pgTable('tasks', {
  id: serial('id').primaryKey(),
  text: text('text').notNull(),
  status: TaskStatusEnum('status').notNull(),
  projectId: integer('project_id').references(() => Project.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
