import { Event } from "@/types/event";

// Fallback events for when Supabase isn't configured
const FALLBACK_EVENTS: DisplayEvent[] = [
  {
    id: "1",
    title: "The Neuroscience of Decision-Making",
    speaker_name: "Dr. Elena Vasquez",
    speaker_role: "Cognitive Neuroscientist, UCL",
    venue_name: "The Blue Posts, Soho",
    starts_at: "2026-01-15T19:30:00Z",
    spots_remaining: 12,
    luma_url: "#",
  },
  {
    id: "2",
    title: "Quantum Computing for the Curious",
    speaker_name: "Prof. James Chen",
    speaker_role: "Quantum Physics, Imperial College",
    venue_name: "The Lamb, Bloomsbury",
    starts_at: "2026-01-18T19:00:00Z",
    spots_remaining: 8,
    luma_url: "#",
  },
  {
    id: "3",
    title: "The Art of Storytelling in the Digital Age",
    speaker_name: "Maya Thompson",
    speaker_role: "Author & Narrative Designer",
    venue_name: "The French House, Soho",
    starts_at: "2026-01-22T20:00:00Z",
    spots_remaining: 24,
    luma_url: "#",
  },
];

// Simplified event type for display
export interface DisplayEvent {
  id: string;
  title: string;
  speaker_name: string | null;
  speaker_role: string | null;
  venue_name: string | null;
  starts_at: string;
  spots_remaining: number | null;
  luma_url: string;
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format time for display
 */
export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).toUpperCase();
}

/**
 * Get events for display - uses Supabase if configured, falls back to hardcoded
 */
export async function getDisplayEvents(limit = 6): Promise<DisplayEvent[]> {
  // Check if Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.log("[events] Supabase not configured, using fallback events");
    return FALLBACK_EVENTS.slice(0, limit);
  }

  try {
    // Dynamic import to avoid issues when Supabase isn't configured
    const { createServerClient } = await import("./supabase");
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("events")
      .select("id, title, speaker_name, speaker_role, venue_name, starts_at, spots_remaining, luma_url")
      .eq("status", "upcoming")
      .order("starts_at", { ascending: true })
      .limit(limit);

    if (error) {
      console.error("[events] Supabase error:", error);
      return FALLBACK_EVENTS.slice(0, limit);
    }

    if (!data || data.length === 0) {
      console.log("[events] No events in database, using fallback");
      return FALLBACK_EVENTS.slice(0, limit);
    }

    return data as DisplayEvent[];
  } catch (error) {
    console.error("[events] Error fetching events:", error);
    return FALLBACK_EVENTS.slice(0, limit);
  }
}
