import { createServerClient, createBrowserClient } from "./supabase";
import { Event } from "@/types/event";

/**
 * Get upcoming events for display on the landing page
 * Server-side: Uses service key for full access
 */
export async function getUpcomingEvents(limit = 6): Promise<Event[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "upcoming")
    .order("starts_at", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }

  return data as Event[];
}

/**
 * Get a single event by Luma ID
 */
export async function getEventByLumaId(lumaId: string): Promise<Event | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("luma_id", lumaId)
    .single();

  if (error) {
    console.error("Error fetching event:", error);
    return null;
  }

  return data as Event;
}

/**
 * Get featured events for homepage hero
 */
export async function getFeaturedEvents(limit = 3): Promise<Event[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_featured", true)
    .eq("status", "upcoming")
    .order("starts_at", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured events:", error);
    return [];
  }

  return data as Event[];
}

/**
 * Format event date for display
 */
export function formatEventDate(startsAt: string): string {
  const date = new Date(startsAt);
  return date.toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format event time for display
 */
export function formatEventTime(startsAt: string): string {
  const date = new Date(startsAt);
  return date.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Check if Supabase is configured
 */
export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
