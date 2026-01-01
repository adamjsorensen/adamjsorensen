import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
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
      // ... other guest fields
    };
  };
}

/**
 * Webhook receiver for real-time Luma updates
 * Configure this URL in your Luma dashboard: https://lu.ma/settings/developer
 *
 * POST /api/webhooks/luma
 */
export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature (Luma sends a signature header)
    const signature = request.headers.get("x-luma-signature");
    const webhookSecret = process.env.LUMA_WEBHOOK_SECRET;

    // If webhook secret is configured, verify signature
    if (webhookSecret && signature) {
      // TODO: Implement signature verification when Luma documents the algorithm
      // For now, we'll proceed but log a warning
      console.log("[luma-webhook] Signature verification not yet implemented");
    }

    const payload: LumaWebhookPayload = await request.json();
    console.log(`[luma-webhook] Received: ${payload.type}`);

    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
      console.error("[luma-webhook] Supabase not configured");
      return NextResponse.json({ error: "Not configured" }, { status: 503 });
    }

    const supabase = createServerClient();

    switch (payload.type) {
      case "event.created":
      case "event.updated": {
        if (!payload.data.event) {
          return NextResponse.json({ error: "No event data" }, { status: 400 });
        }

        const eventData = transformLumaEvent(payload.data.event);

        const { error } = await supabase
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
        if (!payload.data.event?.api_id) {
          return NextResponse.json({ error: "No event ID" }, { status: 400 });
        }

        const { error } = await supabase
          .from("events")
          .update({ status: "cancelled" })
          .eq("luma_id", payload.data.event.api_id);

        if (error) {
          console.error("[luma-webhook] Delete error:", error);
          return NextResponse.json({ error: error.message }, { status: 500 });
        }

        console.log(`[luma-webhook] Event cancelled: ${payload.data.event.api_id}`);
        break;
      }

      case "guest.created":
      case "ticket.created": {
        // When a guest registers, we may need to update spots_remaining
        // For now, we'll trigger a full sync on the next cron run
        // A more optimized approach would be to decrement spots_remaining
        console.log(`[luma-webhook] Guest/ticket event received, will sync on next cron`);
        break;
      }

      default:
        console.log(`[luma-webhook] Unhandled event type: ${payload.type}`);
    }

    return NextResponse.json({ success: true });
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
  return NextResponse.json({ status: "ok", service: "luma-webhook" });
}
