import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const players = sqliteTable('players', {
    id: text('id').primaryKey(),
    points: integer('points').default(0)
})

const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite, { schema: { players } });
