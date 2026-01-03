/**
 * LUMA WEBHOOK RECEIVER - LOCAL STORAGE SCAFFOLD
 * ===============================================
 *
 * CURRENT: Writes to /data/events.json (local file)
 * PRODUCTION: Switch to Supabase (see comments below)
 *
 * This endpoint receives real-time updates from Luma when events change.
 * Configure webhook URL in Luma dashboard: https://lu.ma/settings/developer
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
import { transformLumaEvent, LumaEvent } from "@/types/event";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Luma webhook event types
type LumaWebhookType =
  | "event.created"
  | "event.updated"
  | "event.deleted"
  | "guest.created"
  | "guest.updated"
  | "ticket.created";

interface LumaWebhookPayload {
  type: LumaWebhookType;
  data: {
    event?: LumaEvent;
    guest?: {
      api_id: string;
      event_api_id: string;
    };
  };
}

/**
 * Webhook receiver for real-time Luma updates
 *
 * POST /api/webhooks/luma
 *
 * SCAFFOLD: Currently writes to local JSON file
 * PRODUCTION: Will write to Supabase
 */
export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature (Luma sends a signature header)
    const signature = request.headers.get("x-luma-signature");
    const webhookSecret = process.env.LUMA_WEBHOOK_SECRET;

    if (webhookSecret && signature) {
      // TODO: Implement signature verification when Luma documents the algorithm
      console.log("[luma-webhook] Signature verification not yet implemented");
    }

    const payload: LumaWebhookPayload = await request.json();
    console.log(`[luma-webhook] Received: ${payload.type}`);

    // SCAFFOLD: Using local storage
    // PRODUCTION: const db = createServerClient();
    const db = localDb;

    /* PRODUCTION: Uncomment this block to require Supabase
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
      console.error("[luma-webhook] Supabase not configured");
      return NextResponse.json({ error: "Not configured" }, { status: 503 });
    }
    */

    switch (payload.type) {
      case "event.created":
      case "event.updated": {
        if (!payload.data.event) {
          return NextResponse.json({ error: "No event data" }, { status: 400 });
        }

        const eventData = transformLumaEvent(payload.data.event);

        // Upsert works the same for local storage and Supabase
        const { error } = await db
          .from("events")
          .upsert(eventData, { onConflict: "luma_id" });

        if (error) {
          console.error("[luma-webhook] Upsert error:", error);
          return NextResponse.json({ error: error.message }, { status: 500 });
        }

        console.log(`[luma-webhook] Event synced: ${eventData.title}`);
        break;
      }

      case "event.deleted": {
        // SCAFFOLD: For local storage, we just log the deletion
        // The next cron sync will handle removing/updating the event
        // PRODUCTION: Use Supabase's update().eq() chain
        if (!payload.data.event?.api_id) {
          return NextResponse.json({ error: "No event ID" }, { status: 400 });
        }

        console.log(`[luma-webhook] Event deletion received: ${payload.data.event.api_id}`);
        console.log(`[luma-webhook] SCAFFOLD: Will be handled on next cron sync`);
        break;
      }

      case "guest.created":
      case "ticket.created": {
        // When a guest registers, spots_remaining changes
        // For scaffold mode, we just log it - next cron sync will update
        console.log(`[luma-webhook] Guest/ticket event received, will sync on next cron`);
        break;
      }

      default:
        console.log(`[luma-webhook] Unhandled event type: ${payload.type}`);
    }

    return NextResponse.json({
      success: true,
      mode: "scaffold", // PRODUCTION: Remove this line
    });
  } catch (error) {
    console.error("[luma-webhook] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// Luma may send a GET request to verify the webhook URL
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "luma-webhook",
    mode: "scaffold", // PRODUCTION: Remove this line
  });
}
