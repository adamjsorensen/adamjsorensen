-- The Knowledge Parlour - Events Schema
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- Events table: Synced from Luma API
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  luma_id TEXT UNIQUE NOT NULL,           -- Luma's event API ID
  luma_url TEXT NOT NULL,                  -- Direct link to Luma ticketing page

  -- Display fields
  title TEXT NOT NULL,
  description TEXT,
  speaker_name TEXT,
  speaker_role TEXT,
  speaker_image_url TEXT,

  -- Venue information
  venue_name TEXT,
  venue_address TEXT,

  -- Timing
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,

  -- Capacity tracking (synced from Luma)
  total_spots INTEGER,
  spots_remaining INTEGER,
  is_sold_out BOOLEAN DEFAULT FALSE,

  -- Status management
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'live', 'past', 'cancelled')),
  is_featured BOOLEAN DEFAULT FALSE,       -- For homepage highlight

  -- Metadata
  synced_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_events_starts_at ON events(starts_at);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_luma_id ON events(luma_id);
CREATE INDEX IF NOT EXISTS idx_events_featured ON events(is_featured) WHERE is_featured = TRUE;

-- Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Public read access for events
CREATE POLICY "Events are publicly readable"
  ON events
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Service role can do everything (for sync)
CREATE POLICY "Service role has full access"
  ON events
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Function to automatically update synced_at
CREATE OR REPLACE FUNCTION update_synced_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.synced_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update synced_at on update
DROP TRIGGER IF EXISTS events_synced_at ON events;
CREATE TRIGGER events_synced_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_synced_at();

-- Optional: Function to mark past events
CREATE OR REPLACE FUNCTION update_event_status()
RETURNS void AS $$
BEGIN
  UPDATE events
  SET status = 'past'
  WHERE status = 'upcoming'
    AND ends_at < NOW();

  UPDATE events
  SET status = 'live'
  WHERE status = 'upcoming'
    AND starts_at <= NOW()
    AND (ends_at IS NULL OR ends_at > NOW());
END;
$$ LANGUAGE plpgsql;
