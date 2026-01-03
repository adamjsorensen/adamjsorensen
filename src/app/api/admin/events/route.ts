/**
 * ADMIN API - EVENTS CRUD
 * ========================
 *
 * SCAFFOLD: No real auth - just checks for "admin" password in header
 * PRODUCTION: Use proper auth (Supabase Auth, Clerk, etc.)
 *
 * Endpoints:
 * - GET    /api/admin/events       - List all events
 * - POST   /api/admin/events       - Create new event
 * - PUT    /api/admin/events       - Update event (by id in body)
 * - DELETE /api/admin/events?id=x  - Delete event
 */

import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Event } from "@/types/event";

const DATA_FILE = path.join(process.cwd(), "data", "events.json");

// SCAFFOLD: Simple password check
// PRODUCTION: Replace with real auth
function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get("x-admin-password");
  // Password is "admin" for scaffold - not secure, just for demo
  return authHeader === "admin";
}

interface EventsData {
  events: Event[];
  _meta: {
    description: string;
    last_sync: string;
    version: number;
  };
}

async function readEvents(): Promise<Event[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const data: EventsData = JSON.parse(raw);
    return data.events;
  } catch {
    return [];
  }
}

async function writeEvents(events: Event[]): Promise<void> {
  const data: EventsData = {
    events,
    _meta: {
      description: "Local event storage - replace with Supabase in production",
      last_sync: new Date().toISOString(),
      version: 1,
    },
  };
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// GET - List all events
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const events = await readEvents();
  return NextResponse.json({ events, count: events.length });
}

// POST - Create new event
export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const events = await readEvents();

    const newEvent: Event = {
      id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      luma_id: body.luma_id || `local_${Date.now()}`,
      luma_url: body.luma_url || "#",
      title: body.title || "Untitled Event",
      description: body.description || null,
      speaker_name: body.speaker_name || null,
      speaker_role: body.speaker_role || null,
      speaker_image_url: body.speaker_image_url || null,
      venue_name: body.venue_name || null,
      venue_address: body.venue_address || null,
      starts_at: body.starts_at || new Date().toISOString(),
      ends_at: body.ends_at || null,
      total_spots: body.total_spots || 50,
      spots_remaining: body.spots_remaining || body.total_spots || 50,
      is_sold_out: body.is_sold_out || false,
      status: body.status || "upcoming",
      is_featured: body.is_featured || false,
      synced_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    events.push(newEvent);
    await writeEvents(events);

    return NextResponse.json({ success: true, event: newEvent });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create event" },
      { status: 500 }
    );
  }
}

// PUT - Update existing event
export async function PUT(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: "Event ID required" }, { status: 400 });
    }

    const events = await readEvents();
    const index = events.findIndex((e) => e.id === body.id);

    if (index === -1) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    events[index] = {
      ...events[index],
      ...body,
      synced_at: new Date().toISOString(),
    };

    await writeEvents(events);

    return NextResponse.json({ success: true, event: events[index] });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update event" },
      { status: 500 }
    );
  }
}

// DELETE - Remove event
export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Event ID required" }, { status: 400 });
  }

  const events = await readEvents();
  const filtered = events.filter((e) => e.id !== id);

  if (filtered.length === events.length) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  await writeEvents(filtered);

  return NextResponse.json({ success: true, deleted: id });
}
