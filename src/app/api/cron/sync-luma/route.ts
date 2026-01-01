import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { getLumaClient } from "@/lib/luma";
import { transformLumaEvent } from "@/types/event";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Cron job to sync events from Luma API
 * Runs every 5 minutes via Vercel Cron
 *
 * GET /api/cron/sync-luma
 */
export async function GET(request: NextRequest) {
  // Verify cron secret for security
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  // Allow requests from Vercel Cron (they include the secret)
  // Also allow manual triggers in development
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    // Check if it's a Vercel cron request
    const isVercelCron = request.headers.get("x-vercel-cron") === "true";
    if (!isVercelCron && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    // Check if Luma API key is configured
    if (!process.env.LUMA_API_KEY) {
      return NextResponse.json(
        {
          error: "LUMA_API_KEY not configured",
          message: "Add your Luma API key to environment variables"
        },
        { status: 503 }
      );
    }

    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
      return NextResponse.json(
        {
          error: "Supabase not configured",
          message: "Add Supabase environment variables"
        },
        { status: 503 }
      );
    }

    const luma = getLumaClient();
    const supabase = createServerClient();

    // Fetch all events from Luma
    console.log("[sync-luma] Fetching events from Luma...");
    const lumaEvents = await luma.getAllEvents();
    console.log(`[sync-luma] Found ${lumaEvents.length} events`);

    if (lumaEvents.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No events to sync",
        synced: 0,
      });
    }

    // Transform to our schema
    const eventsToUpsert = lumaEvents.map(transformLumaEvent);

    // Upsert to Supabase (insert or update based on luma_id)
    const { data, error } = await supabase
      .from("events")
      .upsert(eventsToUpsert, {
        onConflict: "luma_id",
        ignoreDuplicates: false,
      })
      .select();

    if (error) {
      console.error("[sync-luma] Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to sync events", details: error.message },
        { status: 500 }
      );
    }

    console.log(`[sync-luma] Successfully synced ${data?.length || 0} events`);

    return NextResponse.json({
      success: true,
      synced: data?.length || 0,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[sync-luma] Error:", error);
    return NextResponse.json(
      {
        error: "Sync failed",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
