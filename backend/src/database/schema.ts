import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import shortUniqueId from 'short-unique-id';

const createRandomId = () => {
	return new shortUniqueId({ dictionary: 'alpha_lower', length: 5 }).rnd();
};

export const pulps = sqliteTable('pulps', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createRandomId()),
	accessKey: text('access_key')
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
	title: text('title'),
	content: text('content').notNull(),
	language: text('language').notNull().default('text'),
	createdAt: integer('created_at', { mode: 'timestamp_ms' })
		.notNull()
		.$defaultFn(() => new Date()),
	views: integer('views').notNull().default(0),
});
