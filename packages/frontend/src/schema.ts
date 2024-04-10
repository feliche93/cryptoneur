import { sql } from 'drizzle-orm'
import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const users = pgTable(
  'users',
  {
    id: text('id').primaryKey(),

    username: text('username'),
    firstName: text('first_name'),
    lastName: text('last_name'),

    imageUrl: text('image_url').notNull(),
    hasImage: boolean('has_image').notNull().default(false),

    primaryEmailAddress: text('primary_email_address'),

    primaryPhoneNumber: text('primary_phone_number'),

    publicMetadata: jsonb('public_metadata'),
    privateMetadata: jsonb('private_metadata'),
    unsafeMetadata: jsonb('unsafe_metadata'),

    lastSignInAt: date('last_sign_in_at'),
    createdAt: date('created_at'),
    updatedAt: date('updated_at').notNull(),
  },
  (table) => {
    return {
      usernameIdx: index('username_idx').on(table.username),
      primaryEmailAddressIdx: index('primary_email_address_idx').on(table.primaryEmailAddress),
      primaryPhoneNumberIdx: index('primary_phone_number_idx').on(table.primaryPhoneNumber),
    }
  },
)

export const organizations = pgTable(
  'organizations',
  {
    id: text('id').primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    slug: varchar('slug', { length: 256 }).notNull(), // clerk aslo has null but we should enforce it
    imageUrl: varchar('image_url', { length: 256 }).notNull(),
    hasImage: boolean('has_image').notNull(),
    createdBy: text('created_by')
      .references(() => users.id)
      .notNull(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),

    publicMetadata: jsonb('public_metadata'),
    privateMetadata: jsonb('private_metadata'),

    maxAllowedMemberships: integer('max_allowed_memberships').notNull(),
    adminDeleteEnabled: boolean('admin_delete_enabled').notNull(),
    membersCount: integer('members_count'),
  },
  (table) => {
    return {
      createdByIdx: index('organizations_created_by_idx').on(table.createdBy),
      nameIdx: index('organizations_name_idx').on(table.name),
      slugIdx: index('organizations_slug_idx').on(table.slug),
    }
  },
)

export const currencies = pgTable(
  'currencies',
  {
    id: text('id')
      .primaryKey()
      .default(sql<string>`'cur_' || nanoid()`),
    name: varchar('name', { length: 256 }).notNull(),
    symbol: varchar('symbol', { length: 256 }).notNull(),
    sign: varchar('sign', { length: 256 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => {
    return {
      nameIdx: index('currencies_name_idx').on(table.name),
      symbolIdx: index('currencies_symbol_idx').on(table.symbol),
    }
  },
)

export const transactionTypes = pgTable(
  'transaction_types',
  {
    id: text('id')
      .primaryKey()
      .default(sql<string>`'txn_type_' || nanoid()`),
    name: varchar('name', { length: 256 }).notNull(),
    gas: integer('gas').notNull(),
    isPublished: boolean('is_published').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => {
    return {
      nameIdx: index('transaction_types_name_idx').on(table.name),
    }
  },
)

export const grants = pgTable(
  'grants',
  {
    id: text('id')
      .primaryKey()
      .default(sql<string>`'grant_' || nanoid()`),
    name: varchar('name', { length: 256 }).notNull(),
    description: text('description'),
    active: boolean('active').notNull().default(true),
    url_application: text('url_application'),
    url_info: text('url_info'),
    content: text('content'),
    slug: text('slug').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => {
    return {
      nameIdx: index('grants_name_idx').on(table.name),
    }
  },
)
