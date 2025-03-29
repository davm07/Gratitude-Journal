import { entriesTable } from "@/db/schema";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { eq, desc } from "drizzle-orm";
import { NewEntry } from "@/db/schema";

export async function getEntries(db: ExpoSQLiteDatabase) {
  const entries = await db
    .select()
    .from(entriesTable)
    .orderBy(desc(entriesTable.date));
  return entries;
}

export async function getEntry(db: ExpoSQLiteDatabase, id: number) {
  const entry = await db
    .select()
    .from(entriesTable)
    .where(eq(entriesTable.id, id));
  return entry[0];
}

export async function addEntry(db: ExpoSQLiteDatabase, entry: NewEntry) {
  try {
    await db.insert(entriesTable).values(entry);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}

export async function updateEntry(db: ExpoSQLiteDatabase, entry: NewEntry) {
  try {
    if (entry.id === undefined || entry.id === null) {
      throw new Error("Entry id is required");
    }
    const { id } = entry;
    await db.update(entriesTable).set(entry).where(eq(entriesTable.id, id));
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function deleteEntry(db: ExpoSQLiteDatabase, id: number) {
  try {
    await db.delete(entriesTable).where(eq(entriesTable.id, id));
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
