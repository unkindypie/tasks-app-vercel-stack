import { User } from '@/schema/models/users';
import {
  index,
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

export const Project = pgTable(
  'projects',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    userId: text('user_id').references(() => User.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index('project_user_idx').on(table.userId),
  }),
);

export const Task = pgTable(
  'tasks',
  {
    id: serial('id').primaryKey(),
    text: text('text').notNull(),
    status: TaskStatusEnum('status').notNull(),
    projectId: integer('project_id').references(() => Project.id),
    userId: text('user_id').references(() => User.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index('task_user_idx').on(table.userId),
    projectIdx: index('task_project_idx').on(table.projectId),
  }),
);
