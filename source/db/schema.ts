import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const requests = sqliteTable('requests', {
  id: text('id').primaryKey(),
  actorId: text('actor_id').notNull(),
  name: text('name').notNull(),
  contact: text('contact').notNull(),
  channel: text('channel').notNull(),
  service: text('service').notNull(),
  details: text('details').notNull(),
  createdAt: integer('created_at').notNull(),
  attribution: text('attribution').notNull().default('{}'),
  consentVersion: text('consent_version').notNull().default(''),
  consentAt: integer('consent_at').notNull().default(0),
  payloadHash: text('payload_hash').notNull().default(''),
  deliveryStatus: text('delivery_status').notNull().default('pending'),
  telegramMessageId: text('telegram_message_id'),
});
