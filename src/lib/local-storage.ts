/**
 * LOCAL STORAGE SCAFFOLD
 * ======================
 *
 * This module provides a simple file-based storage that mimics Supabase's interface.
 * It reads/writes to /data/events.json for local development.
 *
 * TO SWITCH TO SUPABASE:
 * 1. Set up Supabase MCP: `claude mcp add supabase -s project -- npx -y @supabase/mcp-server-supabase@latest`
 * 2. Run the migration in supabase/schema.sql
 * 3. Add env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY
 * 4. Replace imports of './local-storage' with './supabase' in:
 *    - src/lib/get-events.ts
 *    - src/app/api/cron/sync-luma/route.ts
 *
 * The interface is designed to match Supabase's client, so the switch is minimal.
 */

import { promises as fs } from "fs";
import path from "path";
import { Event } from "@/types/event";

// Path to our local JSON "database"
const DATA_FILE = path.join(process.cwd(), "data", "events.json");

interface EventsData {
  events: Event[];
  _meta: {
    description: string;
    last_sync: string;
    version: number;
  };
}

/**
 * Read all events from local JSON file
 * Equivalent to: supabase.from("events").select("*")
 */
async function readEvents(): Promise<Event[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const data: EventsData = JSON.parse(raw);
    return data.events;
  } catch (error) {
    console.error("[local-storage] Error reading events:", error);
    return [];
  }
}

/**
 * Write events to local JSON file
 * Equivalent to: supabase.from("events").upsert(events)
 */
async function writeEvents(events: Event[]): Promise<void> {
  try {
    const data: EventsData = {
      events,
      _meta: {
        description: "Local event storage - replace with Supabase in production",
        last_sync: new Date().toISOString(),
        version: 1,
      },
    };
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("[local-storage] Error writing events:", error);
    throw error;
  }
}

/**
 * Supabase-like query builder for local storage
 * This mimics the Supabase client interface so switching is easy
 *
 * Usage (same as Supabase):
 *   const { data, error } = await localDb
 *     .from("events")
 *     .select("*")
 *     .eq("status", "upcoming")
 *     .order("starts_at", { ascending: true })
 *     .limit(6);
 */
class LocalQueryBuilder {
  private table: string;
  private filters: Array<{ field: string; value: unknown }> = [];
  private orderByField: string | null = null;
  private orderAsc: boolean = true;
  private limitCount: number | null = null;
  private selectFields: string = "*";

  constructor(table: string) {
    this.table = table;
  }

  select(fields: string = "*") {
    this.selectFields = fields;
    return this;
  }

  eq(field: string, value: unknown) {
    this.filters.push({ field, value });
    return this;
  }

  order(field: string, options?: { ascending?: boolean }) {
    this.orderByField = field;
    this.orderAsc = options?.ascending ?? true;
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  async then<T>(resolve: (result: { data: Event[] | null; error: Error | null }) => T): Promise<T> {
    try {
      if (this.table !== "events") {
        return resolve({ data: null, error: new Error(`Unknown table: ${this.table}`) });
      }

      let events = await readEvents();

      // Apply filters
      for (const filter of this.filters) {
        events = events.filter((e) => (e as unknown as Record<string, unknown>)[filter.field] === filter.value);
      }

      // Apply ordering
      if (this.orderByField) {
        events.sort((a, b) => {
          const aVal = (a as unknown as Record<string, unknown>)[this.orderByField!];
          const bVal = (b as unknown as Record<string, unknown>)[this.orderByField!];
          if (aVal === bVal) return 0;
          const cmp = aVal! < bVal! ? -1 : 1;
          return this.orderAsc ? cmp : -cmp;
        });
      }

      // Apply limit
      if (this.limitCount) {
        events = events.slice(0, this.limitCount);
      }

      return resolve({ data: events, error: null });
    } catch (error) {
      return resolve({ data: null, error: error as Error });
    }
  }
}

/**
 * Upsert builder for local storage
 * Mimics: supabase.from("events").upsert(data, { onConflict: "luma_id" })
 */
class LocalUpsertBuilder {
  private table: string;
  private data: Partial<Event>[];
  private conflictField: string = "id";

  constructor(table: string, data: Partial<Event> | Partial<Event>[]) {
    this.table = table;
    this.data = Array.isArray(data) ? data : [data];
  }

  onConflict(field: string) {
    this.conflictField = field;
    return this;
  }

  select() {
    return this;
  }

  // Make this thenable so it can be awaited directly
  async then<T>(resolve: (result: { data: Event[] | null; error: Error | null }) => T): Promise<T> {
    try {
      if (this.table !== "events") {
        return resolve({ data: null, error: new Error(`Unknown table: ${this.table}`) });
      }

      const existing = await readEvents();
      const existingMap = new Map(existing.map((e) => [(e as unknown as Record<string, unknown>)[this.conflictField], e]));

      // Upsert logic: update if exists, insert if not
      for (const item of this.data) {
        const key = (item as unknown as Record<string, unknown>)[this.conflictField];
        if (existingMap.has(key)) {
          // Update existing
          const existingItem = existingMap.get(key)!;
          existingMap.set(key, { ...existingItem, ...item });
        } else {
          // Insert new (generate ID if needed)
          const newItem = {
            id: item.id || `evt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
            created_at: new Date().toISOString(),
            ...item,
          } as Event;
          existingMap.set(key, newItem);
        }
      }

      const updated = Array.from(existingMap.values());
      await writeEvents(updated);

      return resolve({ data: this.data as Event[], error: null });
    } catch (error) {
      return resolve({ data: null, error: error as Error });
    }
  }
}

/**
 * Local database client that mimics Supabase's interface
 *
 * SCAFFOLD: This uses local JSON files. To switch to Supabase:
 * 1. Import { createServerClient } from './supabase' instead
 * 2. The API is identical, so no other changes needed
 */
export const localDb = {
  from(table: string) {
    return {
      select(fields?: string) {
        const builder = new LocalQueryBuilder(table);
        return builder.select(fields);
      },
      upsert(data: Partial<Event> | Partial<Event>[], options?: { onConflict?: string }) {
        const builder = new LocalUpsertBuilder(table, data);
        if (options?.onConflict) {
          builder.onConflict(options.onConflict);
        }
        return builder;
      },
      async update(data: Partial<Event>) {
        // Simple update - returns a builder for chaining .eq()
        return {
          eq: async (field: string, value: unknown) => {
            const events = await readEvents();
            const updated = events.map((e) => {
              if ((e as unknown as Record<string, unknown>)[field] === value) {
                return { ...e, ...data };
              }
              return e;
            });
            await writeEvents(updated);
            return { data: null, error: null };
          },
        };
      },
    };
  },
};

/**
 * Check if we're using local storage (for logging/debugging)
 */
export function isLocalStorage(): boolean {
  return true; // Always true for this scaffold
}

/**
 * Get storage info for debugging
 */
export async function getStorageInfo(): Promise<{ type: "local"; path: string; eventCount: number }> {
  const events = await readEvents();
  return {
    type: "local",
    path: DATA_FILE,
    eventCount: events.length,
  };
}
