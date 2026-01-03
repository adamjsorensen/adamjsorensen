/**
 * EVENT FETCHING - LOCAL STORAGE SCAFFOLD
 * ========================================
 *
 * CURRENT: Reads from /data/events.json (local file)
 * PRODUCTION: Switch to Supabase (see instructions below)
 *
 * TO SWITCH TO SUPABASE:
 * 1. Uncomment the Supabase import and getDisplayEvents implementation below
 * 2. Comment out or remove the local storage version
 * 3. Set environment variables:
 *    - NEXT_PUBLIC_SUPABASE_URL
 *    - SUPABASE_SERVICE_KEY
 */

import { localDb } from "./local-storage";

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
 * Get events for display
 *
 * SCAFFOLD: Currently reads from local JSON file (/data/events.json)
 *
 * The localDb interface matches Supabase's client, so switching is just:
 *   import { createServerClient } from "./supabase";
 *   const db = createServerClient();
 *   // rest of the code stays the same!
 */
export async function getDisplayEvents(limit = 6): Promise<DisplayEvent[]> {
  console.log("[events] Using local storage (scaffold mode)");

  try {
    // SCAFFOLD: Using local JSON file
    // PRODUCTION: Replace `localDb` with `createServerClient()` from './supabase'
    const { data, error } = await localDb
      .from("events")
      .select("id, title, speaker_name, speaker_role, venue_name, starts_at, spots_remaining, luma_url")
      .eq("status", "upcoming")
      .order("starts_at", { ascending: true })
      .limit(limit);

    if (error) {
      console.error("[events] Storage error:", error);
      return [];
    }

    if (!data || data.length === 0) {
      console.log("[events] No events found in local storage");
      return [];
    }

    return data as DisplayEvent[];
  } catch (error) {
    console.error("[events] Error fetching events:", error);
    return [];
  }
}

/* ==========================================================================
 * SUPABASE VERSION (uncomment when ready to switch)
 * ==========================================================================
 *
 * import { createServerClient } from "./supabase";
 *
 * export async function getDisplayEvents(limit = 6): Promise<DisplayEvent[]> {
 *   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
 *   const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
 *
 *   if (!supabaseUrl || !supabaseKey) {
 *     console.error("[events] Supabase not configured");
 *     return [];
 *   }
 *
 *   try {
 *     const supabase = createServerClient();
 *     const { data, error } = await supabase
 *       .from("events")
 *       .select("id, title, speaker_name, speaker_role, venue_name, starts_at, spots_remaining, luma_url")
 *       .eq("status", "upcoming")
 *       .order("starts_at", { ascending: true })
 *       .limit(limit);
 *
 *     if (error) {
 *       console.error("[events] Supabase error:", error);
 *       return [];
 *     }
 *
 *     return (data || []) as DisplayEvent[];
 *   } catch (error) {
 *     console.error("[events] Error:", error);
 *     return [];
 *   }
 * }
 *
 * ========================================================================== */
