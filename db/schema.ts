import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const entriesTable = sqliteTable("entries_table", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().default("Entry without title").notNull(),
  description: text().default("Entry without description").notNull(),
  date: text(),
});

export type Entry = typeof entriesTable.$inferSelect;
export type NewEntry = typeof entriesTable.$inferInsert;
