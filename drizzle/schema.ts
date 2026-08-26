import { index, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const archiveItems = mysqlTable("archive_items", {
  id: int("id").autoincrement().primaryKey(),
  type: mysqlEnum("type", ["contest", "grant", "exhibition", "news", "case-study"]).notNull(),
  title: varchar("title", { length: 500 }).notNull(),
  summary: text("summary").notNull(),
  organization: varchar("organization", { length: 255 }),
  sourceDomain: varchar("sourceDomain", { length: 255 }).notNull(),
  sourceUrl: text("sourceUrl").notNull(),
  publishedAt: timestamp("publishedAt"),
  eventStartAt: timestamp("eventStartAt"),
  eventEndAt: timestamp("eventEndAt"),
  deadlineAt: timestamp("deadlineAt"),
  status: mysqlEnum("status", ["upcoming", "open", "closed", "ongoing", "unknown"]).default("unknown").notNull(),
  tags: text("tags"),
  contentHash: varchar("contentHash", { length: 64 }).notNull().unique(),
  lastSeenAt: timestamp("lastSeenAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  typeIdx: index("archive_items_type_idx").on(table.type),
  statusIdx: index("archive_items_status_idx").on(table.status),
  publishedIdx: index("archive_items_published_idx").on(table.publishedAt),
  deadlineIdx: index("archive_items_deadline_idx").on(table.deadlineAt),
}));

export type ArchiveItem = typeof archiveItems.$inferSelect;
export type InsertArchiveItem = typeof archiveItems.$inferInsert;