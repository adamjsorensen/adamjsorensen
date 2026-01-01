import { LumaListEventsResponse, LumaEvent } from "@/types/event";

const LUMA_API_BASE = "https://api.lu.ma";

interface LumaClientOptions {
  apiKey: string;
}

export class LumaClient {
  private apiKey: string;

  constructor(options: LumaClientOptions) {
    this.apiKey = options.apiKey;
  }

  private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${LUMA_API_BASE}${endpoint}`, {
      ...options,
      headers: {
        "x-luma-api-key": this.apiKey,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Luma API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  /**
   * List all events from the calendar
   * @param options - Filtering and pagination options
   */
  async listEvents(options?: {
    sortDirection?: "asc" | "desc";
    filterBefore?: Date;
    filterAfter?: Date;
    limit?: number;
    cursor?: string;
  }): Promise<LumaListEventsResponse> {
    const params = new URLSearchParams();

    if (options?.sortDirection) {
      params.set("event_sort_direction", options.sortDirection);
    }
    if (options?.filterBefore) {
      params.set("filter_events_before", options.filterBefore.toISOString());
    }
    if (options?.limit) {
      params.set("number_of_items_to_return", options.limit.toString());
    }
    if (options?.cursor) {
      params.set("pagination_cursor", options.cursor);
    }

    const queryString = params.toString();
    const endpoint = `/v1/calendar/list-events${queryString ? `?${queryString}` : ""}`;

    return this.fetch<LumaListEventsResponse>(endpoint);
  }

  /**
   * Get all events (handles pagination automatically)
   */
  async getAllEvents(): Promise<LumaEvent[]> {
    const allEvents: LumaEvent[] = [];
    let cursor: string | undefined;
    let hasMore = true;

    while (hasMore) {
      const response = await this.listEvents({
        sortDirection: "asc",
        limit: 100,
        cursor,
      });

      allEvents.push(...response.entries);
      hasMore = response.has_more;
      cursor = response.next_cursor;
    }

    return allEvents;
  }

  /**
   * Get upcoming events only
   */
  async getUpcomingEvents(limit = 10): Promise<LumaEvent[]> {
    const response = await this.listEvents({
      sortDirection: "asc",
      limit,
    });

    // Filter to only future events
    const now = new Date();
    return response.entries.filter((event) => new Date(event.start_at) > now);
  }
}

// Singleton instance
let lumaClient: LumaClient | null = null;

export function getLumaClient(): LumaClient {
  if (!lumaClient) {
    const apiKey = process.env.LUMA_API_KEY;
    if (!apiKey) {
      throw new Error("Missing LUMA_API_KEY environment variable");
    }
    lumaClient = new LumaClient({ apiKey });
  }
  return lumaClient;
}
