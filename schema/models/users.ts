import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export enum UserRoleEnumType {
  user = 'user',
  admin = 'admin',
}

export const UserRoleEnum = pgEnum('user_role_enum', ['user', 'admin']);

export const User = pgTable('users', {
  /**
   * @description Firebase UID, set by Firebase Auth when signing up
   */
  id: text('id').primaryKey(),
  email: text('email').unique().notNull(),
  role: UserRoleEnum('role').notNull().default('user'),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
