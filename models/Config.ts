import { db } from "@/db/client";
import { configTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export type Config = {
  deleteEventOffset: number;
  autoDeleteEvents: boolean;
};

export function getConfig() {
  const statement = db.select().from(configTable);

  const config:Config[] = statement.all().map((item) => {
    return {
      deleteEventOffset: item.deleteEventOffset,
      autoDeleteEvents: item.autoDeleteEvents
    };
  });

  return config[0];
}

export function setConfig(appConfig: Config) {
    // Get config ID
    const statement = db.select().from(configTable);
    const configID = statement.all()[0].id;

    db.update(configTable).set(appConfig).where(eq(configTable.id, configID)).run();
}

export function initConfig() {
  // If config table record doesnt exist yet, create a default one
  const statement = db.select().from(configTable);

  if (statement.all().length === 0) {
    db.insert(configTable).values({}).run(); //Insert default values
  }
}
