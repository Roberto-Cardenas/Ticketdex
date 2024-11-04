import { int, sqliteTable, text,  } from "drizzle-orm/sqlite-core";

export const eventsTable = sqliteTable("events_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  datetime: text().notNull(),
  locationName: text().notNull(),
  locationAddress: text().notNull(),
  ticketType: text().notNull(),
  ticketURI: text().notNull(),
});

export const configTable = sqliteTable("config_table", {
  id: int().primaryKey({ autoIncrement: true }),
  autoDeleteEvents: int({ mode: 'boolean' }).default(false).notNull(),
  deleteEventOffset: int().default(7).notNull(),
}); 
