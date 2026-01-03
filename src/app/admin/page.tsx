"use client";

import { useState, useEffect } from "react";

interface Event {
  id: string;
  luma_id: string;
  luma_url: string;
  title: string;
  description: string | null;
  speaker_name: string | null;
  speaker_role: string | null;
  venue_name: string | null;
  venue_address: string | null;
  starts_at: string;
  ends_at: string | null;
  total_spots: number | null;
  spots_remaining: number | null;
  is_sold_out: boolean;
  status: string;
  is_featured: boolean;
}

/**
 * ADMIN DASHBOARD - SCAFFOLD
 * ==========================
 *
 * Simple admin page for managing events.
 * Password: "admin" (not secure - just for demo)
 *
 * PRODUCTION: Replace with proper auth (Supabase Auth, Clerk, etc.)
 */
export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Check if already "logged in" (stored in sessionStorage)
  useEffect(() => {
    const stored = sessionStorage.getItem("admin_password");
    if (stored === "admin") {
      setIsLoggedIn(true);
      setPassword("admin");
    }
  }, []);

  // Fetch events when logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchEvents();
    }
  }, [isLoggedIn]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/events", {
        headers: { "x-admin-password": password },
      });
      const data = await res.json();
      if (res.ok) {
        setEvents(data.events);
        setError(null);
      } else {
        setError(data.error);
      }
    } catch {
      setError("Failed to fetch events");
    }
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin") {
      sessionStorage.setItem("admin_password", password);
      setIsLoggedIn(true);
    } else {
      setError("Invalid password");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_password");
    setIsLoggedIn(false);
    setPassword("");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;

    const res = await fetch(`/api/admin/events?id=${id}`, {
      method: "DELETE",
      headers: { "x-admin-password": password },
    });

    if (res.ok) {
      fetchEvents();
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  const handleSave = async (formData: Partial<Event>) => {
    const method = editingEvent?.id ? "PUT" : "POST";
    const body = editingEvent?.id ? { ...formData, id: editingEvent.id } : formData;

    const res = await fetch("/api/admin/events", {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setShowForm(false);
      setEditingEvent(null);
      fetchEvents();
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  // Login screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center p-6">
        <div className="glass-card rounded-2xl p-8 max-w-md w-full">
          <h1 className="font-display text-3xl text-parchment mb-2">Admin Login</h1>
          <p className="text-parchment/50 text-sm mb-6">
            SCAFFOLD: Password is &quot;admin&quot;
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-slate-charcoal border border-parchment/20 rounded text-parchment placeholder-parchment/30 focus:outline-none focus:border-amber-warm/50 mb-4"
            />
            <button
              type="submit"
              className="w-full px-4 py-3 bg-amber-warm text-ink font-medium rounded hover:bg-amber-glow transition-colors"
            >
              Login
            </button>
          </form>

          <a href="/" className="block text-center text-parchment/50 text-sm mt-6 hover:text-amber-warm">
            ← Back to site
          </a>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-ink p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl text-parchment">Event Manager</h1>
            <p className="text-parchment/50 text-sm">SCAFFOLD MODE - Local JSON Storage</p>
          </div>
          <div className="flex gap-4">
            <a
              href="/"
              className="px-4 py-2 border border-parchment/20 text-parchment rounded hover:border-amber-warm/50 transition-colors"
            >
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-parchment/20 text-parchment/50 rounded hover:text-red-400 hover:border-red-400/50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
            <button onClick={() => setError(null)} className="float-right">×</button>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              setEditingEvent(null);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-amber-warm text-ink font-medium rounded hover:bg-amber-glow transition-colors"
          >
            + New Event
          </button>
          <button
            onClick={fetchEvents}
            disabled={loading}
            className="px-4 py-2 border border-parchment/20 text-parchment rounded hover:border-amber-warm/50 transition-colors disabled:opacity-50"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {/* Event Form Modal */}
        {showForm && (
          <EventForm
            event={editingEvent}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingEvent(null);
            }}
          />
        )}

        {/* Events List */}
        <div className="space-y-4">
          {events.length === 0 ? (
            <div className="glass-card rounded-xl p-8 text-center text-parchment/50">
              No events yet. Create one to get started.
            </div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="glass-card rounded-xl p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-xl text-parchment">{event.title}</h3>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          event.status === "upcoming"
                            ? "bg-green-500/20 text-green-400"
                            : event.status === "past"
                            ? "bg-gray-500/20 text-gray-400"
                            : "bg-amber-warm/20 text-amber-warm"
                        }`}
                      >
                        {event.status}
                      </span>
                      {event.is_featured && (
                        <span className="px-2 py-0.5 text-xs bg-amber-warm/20 text-amber-warm rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-parchment/60 text-sm">
                      {event.speaker_name && <span>{event.speaker_name}</span>}
                      {event.speaker_role && <span className="text-parchment/40"> · {event.speaker_role}</span>}
                    </p>
                    <p className="text-parchment/40 text-sm mt-1">
                      {new Date(event.starts_at).toLocaleDateString("en-GB", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                      {event.venue_name && ` · ${event.venue_name}`}
                    </p>
                    <p className="text-parchment/30 text-xs mt-2 font-mono">ID: {event.id}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingEvent(event);
                        setShowForm(true);
                      }}
                      className="px-3 py-1.5 text-sm border border-parchment/20 text-parchment rounded hover:border-amber-warm/50 hover:text-amber-warm transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="px-3 py-1.5 text-sm border border-parchment/20 text-parchment/50 rounded hover:border-red-400/50 hover:text-red-400 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Event Form Component
function EventForm({
  event,
  onSave,
  onCancel,
}: {
  event: Event | null;
  onSave: (data: Partial<Event>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    title: event?.title || "",
    speaker_name: event?.speaker_name || "",
    speaker_role: event?.speaker_role || "",
    venue_name: event?.venue_name || "",
    venue_address: event?.venue_address || "",
    starts_at: event?.starts_at
      ? new Date(event.starts_at).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16),
    total_spots: event?.total_spots || 50,
    spots_remaining: event?.spots_remaining || 50,
    status: event?.status || "upcoming",
    is_featured: event?.is_featured || false,
    luma_url: event?.luma_url || "",
    description: event?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      starts_at: new Date(formData.starts_at).toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-ink/80 flex items-center justify-center p-6 z-50">
      <div className="glass-card rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="font-display text-2xl text-parchment mb-6">
          {event ? "Edit Event" : "New Event"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-parchment/60 text-sm mb-1">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-3 py-2 bg-slate-charcoal border border-parchment/20 rounded text-parchment focus:outline-none focus:border-amber-warm/50"
              />
            </div>
            <div>
              <label className="block text-parchment/60 text-sm mb-1">Date & Time *</label>
              <input
                type="datetime-local"
                value={formData.starts_at}
                onChange={(e) => setFormData({ ...formData, starts_at: e.target.value })}
                required
                className="w-full px-3 py-2 bg-slate-charcoal border border-parchment/20 rounded text-parchment focus:outline-none focus:border-amber-warm/50"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-parchment/60 text-sm mb-1">Speaker Name</label>
              <input
                type="text"
                value={formData.speaker_name}
                onChange={(e) => setFormData({ ...formData, speaker_name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-charcoal border border-parchment/20 rounded text-parchment focus:outline-none focus:border-amber-warm/50"
              />
            </div>
            <div>
              <label className="block text-parchment/60 text-sm mb-1">Speaker Role</label>
              <input
                type="text"
                value={formData.speaker_role}
                onChange={(e) => setFormData({ ...formData, speaker_role: e.target.value })}
                placeholder="e.g. Professor, UCL"
                className="w-full px-3 py-2 bg-slate-charcoal border border-parchment/20 rounded text-parchment placeholder-parchment/30 focus:outline-none focus:border-amber-warm/50"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-parchment/60 text-sm mb-1">Venue Name</label>
              <input
                type="text"
                value={formData.venue_name}
                onChange={(e) => setFormData({ ...formData, venue_name: e.target.value })}
                placeholder="e.g. The Blue Posts, Soho"
                className="w-full px-3 py-2 bg-slate-charcoal border border-parchment/20 rounded text-parchment placeholder-parchment/30 focus:outline-none focus:border-amber-warm/50"
              />
            </div>
            <div>
              <label className="block text-parchment/60 text-sm mb-1">Venue Address</label>
              <input
                type="text"
                value={formData.venue_address}
                onChange={(e) => setFormData({ ...formData, venue_address: e.target.value })}
                className="w-full px-3 py-2 bg-slate-charcoal border border-parchment/20 rounded text-parchment focus:outline-none focus:border-amber-warm/50"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-parchment/60 text-sm mb-1">Total Spots</label>
              <input
                type="number"
                value={formData.total_spots}
                onChange={(e) => setFormData({ ...formData, total_spots: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-charcoal border border-parchment/20 rounded text-parchment focus:outline-none focus:border-amber-warm/50"
              />
            </div>
            <div>
              <label className="block text-parchment/60 text-sm mb-1">Spots Remaining</label>
              <input
                type="number"
                value={formData.spots_remaining}
                onChange={(e) => setFormData({ ...formData, spots_remaining: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-charcoal border border-parchment/20 rounded text-parchment focus:outline-none focus:border-amber-warm/50"
              />
            </div>
            <div>
              <label className="block text-parchment/60 text-sm mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 bg-slate-charcoal border border-parchment/20 rounded text-parchment focus:outline-none focus:border-amber-warm/50"
              >
                <option value="upcoming">Upcoming</option>
                <option value="live">Live</option>
                <option value="past">Past</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-parchment/60 text-sm mb-1">Luma URL (for ticketing)</label>
            <input
              type="url"
              value={formData.luma_url}
              onChange={(e) => setFormData({ ...formData, luma_url: e.target.value })}
              placeholder="https://lu.ma/your-event"
              className="w-full px-3 py-2 bg-slate-charcoal border border-parchment/20 rounded text-parchment placeholder-parchment/30 focus:outline-none focus:border-amber-warm/50"
            />
          </div>

          <div>
            <label className="block text-parchment/60 text-sm mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-slate-charcoal border border-parchment/20 rounded text-parchment focus:outline-none focus:border-amber-warm/50"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_featured"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              className="rounded border-parchment/20 bg-slate-charcoal text-amber-warm focus:ring-amber-warm"
            />
            <label htmlFor="is_featured" className="text-parchment/60 text-sm">
              Featured event (show on homepage)
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-amber-warm text-ink font-medium rounded hover:bg-amber-glow transition-colors"
            >
              {event ? "Save Changes" : "Create Event"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-3 border border-parchment/20 text-parchment rounded hover:border-parchment/40 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
