import { db } from "@/db/client";
import { eventsTable } from "@/db/schema";
import { eq, gte, asc, lt, desc } from "drizzle-orm";
import { getConfig } from "./Config";
import { deleteTicket, ticketExists } from "@/filesystem/client";

export type Event = {
  id: number,
  name: string,
  datetime: Date,
  locationName: string,
  locationAddress: string,
  ticketType: string,
  ticketURI: string
};

type EventSchema = {
  id: number,
  name: string,
  datetime: string,
  locationName: string,
  locationAddress: string,
  ticketType: string,
  ticketURI: string
};

function schemaToEvent(event: EventSchema) {
  return {
    id: event.id,
    name: event.name,
    datetime: new Date(parseInt(event.datetime)),
    locationName: event.locationName,
    locationAddress: event.locationAddress,
    ticketType: event.ticketType,
    ticketURI: event.ticketURI
  };
}

export function getEvents() {
  const statement = db.select().from(eventsTable);

  const allEvents:Event[] = statement.all().map((item) => {
    return schemaToEvent(item);
  });

  return allEvents;
}

export function getUpcomingEvents() {
  const cutoffDate = new Date();
  cutoffDate.setHours(cutoffDate.getHours() - 4);

  const statement = db.select().from(eventsTable).where(gte(eventsTable.datetime, cutoffDate.valueOf().toString())).orderBy(asc(eventsTable.datetime));
  const upcomingEvents:Event[] = statement.all().map((item) => {
    return schemaToEvent(item);
  });

  return upcomingEvents;
}

export function getPastEvents() {
  const cutoffDate = new Date();
  cutoffDate.setHours(cutoffDate.getHours() - 4);

  const statement = db.select().from(eventsTable).where(lt(eventsTable.datetime, cutoffDate.valueOf().toString())).orderBy(desc(eventsTable.datetime));
  const pastEvents:Event[] = statement.all().map((item) => {
    return schemaToEvent(item);
  });

  return pastEvents;
}

export function getEvent(eventID: number) {
  const statement = db.select().from(eventsTable).where(eq(eventsTable.id, eventID));
  return schemaToEvent(statement.all()[0]);
}

export function createEvent(newEvent: Event) {
  const newEventData = {
    name: newEvent.name,
    datetime: newEvent.datetime.valueOf().toString(),
    locationName: newEvent.locationName,
    locationAddress: newEvent.locationAddress,
    ticketType: newEvent.ticketType,
    ticketURI: newEvent.ticketURI
  };

  db.insert(eventsTable).values(newEventData).run();
}

export function updateEvent(event: Event) {
  const updatedEventData = {
    name: event.name,
    datetime: event.datetime.valueOf().toString(),
    locationName: event.locationName,
    locationAddress: event.locationAddress,
    ticketType: event.ticketType,
    ticketURI: event.ticketURI
  };  

  db.update(eventsTable).set(updatedEventData).where(eq(eventsTable.id, event.id)).run();
}

export function deleteEvent(eventID: number) {
  db.delete(eventsTable).where(eq(eventsTable.id, eventID)).run();
}

export function deletePastEvents() {
  const config = getConfig();

  if (config.autoDeleteEvents) {
    // First get list of all events within the offset
    const cutoffDate = new Date();
    cutoffDate.setHours(cutoffDate.getHours() - config.deleteEventOffset);

    const pastEvents = db.select().from(eventsTable).where(lt(eventsTable.datetime, cutoffDate.valueOf().toString())).all();

    // If they have a ticket type of Image or File use the filesystem client to delete the files from the ticket folder
    pastEvents.forEach((event) => {
      if (event.ticketType === 'image' || event.ticketType === 'file') {
        deleteTicket(event.ticketURI);
      }
    });

    // Delete all database entries within the selected range
    db.delete(eventsTable).where(lt(eventsTable.datetime, cutoffDate.valueOf().toString())).run();
  }
}

export async function cleanupEvents() {
  const statement = db.select().from(eventsTable);

  statement.all().forEach(async (item) => {
    if (item.ticketType === 'image' || item.ticketType === 'file') {
      if (!(await ticketExists(item.ticketURI))) {
        deleteEvent(item.id);
      }
    }
  });
}
