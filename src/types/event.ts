// Event type matching our Supabase schema
export interface Event {
  id: string;
  luma_id: string;
  luma_url: string;

  // Display fields
  title: string;
  description: string | null;
  speaker_name: string | null;
  speaker_role: string | null;
  speaker_image_url: string | null;

  // Venue
  venue_name: string | null;
  venue_address: string | null;

  // Timing
  starts_at: string;
  ends_at: string | null;

  // Capacity
  total_spots: number | null;
  spots_remaining: number | null;
  is_sold_out: boolean;

  // Status
  status: "upcoming" | "live" | "past" | "cancelled";
  is_featured: boolean;

  // Metadata
  synced_at: string;
  created_at: string;
}

// Luma API response types
export interface LumaEvent {
  api_id: string;
  url: string;
  name: string;
  description?: string;
  start_at: string;
  end_at?: string;
  timezone: string;
  geo_address_info?: {
    address?: string;
    place_id?: string;
  };
  geo_latitude?: number;
  geo_longitude?: number;
  cover_url?: string;
  registration_capacity?: number;
  spots_remaining?: number;
  registration_is_open: boolean;
  hosts?: LumaHost[];
}

export interface LumaHost {
  name?: string;
  bio?: string;
  avatar_url?: string;
}

export interface LumaListEventsResponse {
  entries: LumaEvent[];
  has_more: boolean;
  next_cursor?: string;
}

// Transform Luma event to our schema
export function transformLumaEvent(lumaEvent: LumaEvent): Omit<Event, "id" | "created_at"> {
  const now = new Date();
  const startDate = new Date(lumaEvent.start_at);
  const endDate = lumaEvent.end_at ? new Date(lumaEvent.end_at) : null;

  let status: Event["status"] = "upcoming";
  if (startDate > now) {
    status = "upcoming";
  } else if (endDate && endDate < now) {
    status = "past";
  } else if (startDate <= now && (!endDate || endDate > now)) {
    status = "live";
  }

  // Get primary host info
  const primaryHost = lumaEvent.hosts?.[0];

  return {
    luma_id: lumaEvent.api_id,
    luma_url: lumaEvent.url,
    title: lumaEvent.name,
    description: lumaEvent.description || null,
    speaker_name: primaryHost?.name || null,
    speaker_role: primaryHost?.bio || null,
    speaker_image_url: primaryHost?.avatar_url || null,
    venue_name: lumaEvent.geo_address_info?.address?.split(",")[0] || null,
    venue_address: lumaEvent.geo_address_info?.address || null,
    starts_at: lumaEvent.start_at,
    ends_at: lumaEvent.end_at || null,
    total_spots: lumaEvent.registration_capacity || null,
    spots_remaining: lumaEvent.spots_remaining || null,
    is_sold_out: lumaEvent.spots_remaining === 0,
    status,
    is_featured: false,
    synced_at: new Date().toISOString(),
  };
}
