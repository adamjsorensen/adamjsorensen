import { getDisplayEvents, formatDate, formatTime } from "@/lib/get-events";
import { LandingPageClient } from "@/components/landing-page-client";

// Server component - fetches events at request time
export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const events = await getDisplayEvents(6);

  // Transform for the client component
  const displayEvents = events.map((event) => ({
    id: event.id,
    title: event.title,
    speaker: event.speaker_name || "TBA",
    role: event.speaker_role || "",
    venue: event.venue_name || "London",
    date: formatDate(event.starts_at),
    time: formatTime(event.starts_at),
    spotsLeft: event.spots_remaining || 0,
    lumaUrl: event.luma_url,
  }));

  return <LandingPageClient events={displayEvents} />;
}
