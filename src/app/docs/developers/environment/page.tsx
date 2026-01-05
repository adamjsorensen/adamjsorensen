import { CodeBlock, Callout } from '@/components/docs';
import { PageNavigation, Breadcrumbs } from '@/components/docs';

export const metadata = {
  title: 'Environment Variables | Developer Guide',
  description: 'Configure your environment variables',
};

export default function EnvironmentPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Developer Guide' },
          { label: 'Environment Variables' },
        ]}
      />

      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Environment Variables
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Configure your environment for local development and production deployment.
        </p>
      </header>

      {/* Quick Setup */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="setup">
          Quick Setup
        </h2>
        <CodeBlock
          code={`# Copy the example file
cp .env.example .env.local

# Edit with your values
code .env.local`}
          language="bash"
        />
      </section>

      {/* All Variables */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="variables">
          All Variables
        </h2>
        <CodeBlock
          code={`# ===========================================
# Supabase Configuration
# ===========================================

# Your Supabase project URL
# Find at: https://supabase.com/dashboard → Project → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Supabase anonymous (public) key
# Safe to expose in browser - respects Row Level Security
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key

# Supabase service role key (SECRET!)
# Full database access - server-side only
SUPABASE_SERVICE_KEY=eyJ...your-service-key

# ===========================================
# Luma API Configuration
# ===========================================

# Your Luma API key
# Get at: https://lu.ma → Settings → Developer → Create API Key
# Requires Luma Plus subscription
LUMA_API_KEY=luma_...your-api-key

# Luma webhook signing secret (optional)
# For verifying webhook payloads
LUMA_WEBHOOK_SECRET=whsec_...your-webhook-secret

# ===========================================
# Security
# ===========================================

# Secret for authenticating cron job requests
# Generate with: openssl rand -base64 32
CRON_SECRET=your-secure-random-string`}
          language="bash"
          filename=".env.local"
        />
      </section>

      {/* Variable Reference */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="reference">
          Variable Reference
        </h2>
        <div className="space-y-6">
          <EnvVarSection title="Supabase">
            <EnvVarRow
              name="NEXT_PUBLIC_SUPABASE_URL"
              required
              description="Your Supabase project URL"
              example="https://abc123.supabase.co"
            />
            <EnvVarRow
              name="NEXT_PUBLIC_SUPABASE_ANON_KEY"
              required
              description="Public anonymous key. Safe for client-side use."
              example="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            />
            <EnvVarRow
              name="SUPABASE_SERVICE_KEY"
              required
              secret
              description="Service role key with full access. Server-side only!"
              example="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            />
          </EnvVarSection>

          <EnvVarSection title="Luma">
            <EnvVarRow
              name="LUMA_API_KEY"
              description="API key for syncing events from Luma"
              example="luma_sk_abc123..."
            />
            <EnvVarRow
              name="LUMA_WEBHOOK_SECRET"
              secret
              description="HMAC secret for verifying webhook payloads"
              example="whsec_abc123..."
            />
          </EnvVarSection>

          <EnvVarSection title="Security">
            <EnvVarRow
              name="CRON_SECRET"
              required
              secret
              description="Bearer token for authenticating cron requests"
              example="abc123def456..."
            />
          </EnvVarSection>
        </div>
      </section>

      {/* Scaffold Mode */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="scaffold">
          Scaffold Mode (No External Services)
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          For local development without Supabase or Luma, use placeholder values:
        </p>
        <CodeBlock
          code={`NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder
SUPABASE_SERVICE_KEY=placeholder
CRON_SECRET=local-dev-secret`}
          language="bash"
        />
        <Callout type="info">
          In scaffold mode, the app reads/writes to <code>/data/events.json</code> instead
          of Supabase. No external services required!
        </Callout>
      </section>

      {/* Production */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="production">
          Production (Vercel)
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Add environment variables in Vercel:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-4">
          <li>Go to your Vercel project dashboard</li>
          <li>Click Settings → Environment Variables</li>
          <li>Add each variable for Production, Preview, and Development</li>
          <li>Redeploy to apply changes</li>
        </ol>
        <Callout type="warning" title="Security">
          Variables prefixed with <code>NEXT_PUBLIC_</code> are exposed to the browser.
          Never put secrets in public variables!
        </Callout>
      </section>

      <PageNavigation />
    </div>
  );
}

function EnvVarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function EnvVarRow({
  name,
  required,
  secret,
  description,
  example,
}: {
  name: string;
  required?: boolean;
  secret?: boolean;
  description: string;
  example: string;
}) {
  return (
    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-2 mb-2">
        <code className="text-sm font-mono text-amber-600 dark:text-amber-400">{name}</code>
        {required && (
          <span className="text-xs px-1.5 py-0.5 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded">
            Required
          </span>
        )}
        {secret && (
          <span className="text-xs px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded">
            🔐 Secret
          </span>
        )}
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">{description}</p>
      <p className="text-xs text-slate-400 dark:text-slate-500">
        Example: <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">{example}</code>
      </p>
    </div>
  );
}
