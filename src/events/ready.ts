import { Events } from 'discord.js';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db } from '../util/db.js';
import type { Event } from './index.ts';

export default {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		migrate(db, { migrationsFolder: 'drizzle'})
	},
} satisfies Event<Events.ClientReady>;
