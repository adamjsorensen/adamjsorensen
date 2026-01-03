/**
 * LUMA SYNC CRON JOB - LOCAL STORAGE SCAFFOLD
 * ============================================
 *
 * CURRENT: Writes to /data/events.json (local file)
 * PRODUCTION: Switch to Supabase (see comments below)
 *
 * This endpoint syncs events from Luma API to local storage.
 * In production, it would sync to Supabase instead.
 *
 * TO SWITCH TO SUPABASE:
 * 1. Uncomment the Supabase import
 * 2. Replace `localDb` with `createServerClient()`
 * 3. Remove the Supabase config check bypass
 */

import { NextRequest, NextResponse } from "next/server";
// SCAFFOLD: Using local storage
import { localDb } from "@/lib/local-storage";
// PRODUCTION: Uncomment this line
// import { createServerClient } from "@/lib/supabase";
import { getLumaClient } from "@/lib/luma";
import { transformLumaEvent } from "@/types/event";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Cron job to sync events from Luma API
 * Runs every 5 minutes via Vercel Cron
 *
 * GET /api/cron/sync-luma
 *
 * SCAFFOLD: Currently writes to local JSON file
 * PRODUCTION: Will write to Supabase
 */
export async function GET(request: NextRequest) {
  // Verify cron secret for security (skip in development)
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    const isVercelCron = request.headers.get("x-vercel-cron") === "true";
    if (!isVercelCron && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    // Check if Luma API key is configured
    if (!process.env.LUMA_API_KEY) {
      // SCAFFOLD: Return info about local storage mode
      return NextResponse.json({
        mode: "scaffold",
        message: "LUMA_API_KEY not configured - using local storage only",
        hint: "Events are read from /data/events.json. Set LUMA_API_KEY to enable sync.",
      });
    }

    /* PRODUCTION: Uncomment this block to require Supabase
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 503 }
      );
    }
    */

    const luma = getLumaClient();

    // SCAFFOLD: Using local storage
    // PRODUCTION: const db = createServerClient();
    const db = localDb;

    // Fetch all events from Luma
    console.log("[sync-luma] Fetching events from Luma...");
    const lumaEvents = await luma.getAllEvents();
    console.log(`[sync-luma] Found ${lumaEvents.length} events`);

    if (lumaEvents.length === 0) {
      return NextResponse.json({
        success: true,
        mode: "scaffold",
        message: "No events to sync",
        synced: 0,
      });
    }

    // Transform Luma events to our schema
    const eventsToUpsert = lumaEvents.map(transformLumaEvent);

    // Upsert to storage (local JSON or Supabase)
    // The interface is the same, so this code works for both!
    const { data, error } = await db
      .from("events")
      .upsert(eventsToUpsert, { onConflict: "luma_id" })
      .select();

    if (error) {
      console.error("[sync-luma] Storage error:", error);
      return NextResponse.json(
        { error: "Failed to sync events", details: error.message },
        { status: 500 }
      );
    }

    console.log(`[sync-luma] Successfully synced ${eventsToUpsert.length} events`);

    return NextResponse.json({
      success: true,
      mode: "scaffold", // PRODUCTION: Remove this line
      storage: "local", // PRODUCTION: Change to "supabase"
      synced: eventsToUpsert.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[sync-luma] Error:", error);
    return NextResponse.json(
      {
        error: "Sync failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
