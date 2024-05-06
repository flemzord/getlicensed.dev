import { relations, sql } from 'drizzle-orm';
import {
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';

export const user = pgTable('User', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  email: text('email').notNull(),
  name: text('name'),
  githubId: text('githubId').unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
  license: many(license),
}));

export const license = pgTable('License', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id')
    .notNull()
    .references(() => user.id),
  productId: uuid('product_id')
    .notNull()
    .references(() => product.id),
  customerId: uuid('customer_id')
    .notNull()
    .references(() => customer.id),
  token: text('license').notNull(),
  name: text('name').notNull(),
  metadata: jsonb('metadata').default(sql`'{}'::jsonb`),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const licenseRelations = relations(user, ({ one }) => ({
  product: one(product),
  customer: one(customer),
}));

export const product = pgTable('Product', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id')
    .notNull()
    .references(() => user.id),
  name: text('name').notNull(),
  metadata: jsonb('metadata').default(sql`'{}'::jsonb`),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const customer = pgTable('Customer', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id')
    .notNull()
    .references(() => user.id),
  name: text('name').notNull(),
  metadata: jsonb('metadata').default(sql`'{}'::jsonb`),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const licenseUsageTypeEnum = pgEnum('license_log_type', [
  'LICENSE_VALIDATE',
]);
export const licenseUsageActionEnum = pgEnum('license_log_action', [
  'SUCCESS',
  'EXPIRED',
]);

export const licenseUsage = pgTable('License_usage', {
  createdAt: timestamp('created_at', { precision: 2, withTimezone: true })
    .notNull()
    .defaultNow(),
  licenseId: uuid('license_id')
    .notNull()
    .references(() => license.id),
  type: licenseUsageTypeEnum('type'),
  action: licenseUsageActionEnum('action'),
});

export const licenseUsageRelations = relations(licenseUsage, ({ one }) => ({
  license: one(license),
}));
