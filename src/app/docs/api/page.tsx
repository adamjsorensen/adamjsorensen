import Link from 'next/link';
import { MethodBadge, Callout } from '@/components/docs';
import { PageNavigation, Breadcrumbs } from '@/components/docs';
import { apiEndpoints } from '@/lib/docs-config';

export const metadata = {
  title: 'API Reference | Documentation',
  description: 'Complete API reference for The Knowledge Parlour',
};

export default function ApiPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'API Reference' },
        ]}
      />

      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          API Reference
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          The Knowledge Parlour provides a REST API for event synchronization and real-time updates.
          These endpoints power the platform&apos;s integration with Luma.
        </p>
      </header>

      {/* Base URL */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="base-url">
          Base URL
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 font-mono text-sm">
          <span className="text-slate-500 dark:text-slate-400">Production: </span>
          <span className="text-slate-900 dark:text-white">https://your-domain.com</span>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 font-mono text-sm">
          <span className="text-slate-500 dark:text-slate-400">Development: </span>
          <span className="text-slate-900 dark:text-white">http://localhost:3000</span>
        </div>
      </section>

      {/* Authentication */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="authentication">
          Authentication
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          API endpoints use different authentication methods depending on their purpose:
        </p>
        <div className="grid gap-4">
          <AuthMethodCard
            method="Bearer Token"
            endpoint="Cron endpoints"
            description="Use the CRON_SECRET as a bearer token in the Authorization header."
            example="Authorization: Bearer your-cron-secret"
          />
          <AuthMethodCard
            method="Vercel Cron Header"
            endpoint="Cron endpoints (automatic)"
            description="Vercel automatically adds verification headers when triggering cron jobs."
            example="x-vercel-cron: verified"
          />
          <AuthMethodCard
            method="HMAC Signature (Optional)"
            endpoint="Webhook endpoints"
            description="Luma can sign webhook payloads for verification."
            example="x-luma-signature: sha256=..."
          />
        </div>
        <Callout type="info" title="Public Endpoints">
          The main website and documentation are public. Only administrative endpoints
          (cron, webhooks) require authentication.
        </Callout>
      </section>

      {/* Endpoints */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="endpoints">
          Endpoints
        </h2>
        <div className="space-y-4">
          {Object.entries(apiEndpoints).map(([key, endpoint]) => (
            <EndpointCard key={key} slug={key} endpoint={endpoint} />
          ))}
        </div>
      </section>

      {/* Rate Limits */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="rate-limits">
          Rate Limits
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          The API has the following rate limits to ensure stability:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 pr-4 font-medium text-slate-500 dark:text-slate-400">
                  Endpoint
                </th>
                <th className="text-left py-3 pr-4 font-medium text-slate-500 dark:text-slate-400">
                  Limit
                </th>
                <th className="text-left py-3 font-medium text-slate-500 dark:text-slate-400">
                  Window
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-600 dark:text-slate-300">
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-3 pr-4">/api/cron/sync-luma</td>
                <td className="py-3 pr-4">12 requests</td>
                <td className="py-3">per hour</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-3 pr-4">/api/webhooks/luma</td>
                <td className="py-3 pr-4">100 requests</td>
                <td className="py-3">per minute</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Error Handling */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="errors">
          Error Handling
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          All endpoints return consistent error responses:
        </p>
        <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-slate-200 font-mono">
{`{
  "error": "Human-readable error message",
  "details": "Optional additional context"
}`}
          </pre>
        </div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-4">
          Common Status Codes
        </h3>
        <div className="space-y-2">
          <StatusCode code={200} description="Success - Request completed successfully" />
          <StatusCode code={400} description="Bad Request - Invalid request body or parameters" />
          <StatusCode code={401} description="Unauthorized - Missing or invalid authentication" />
          <StatusCode code={404} description="Not Found - Endpoint or resource doesn't exist" />
          <StatusCode code={429} description="Too Many Requests - Rate limit exceeded" />
          <StatusCode code={500} description="Server Error - Something went wrong on our end" />
        </div>
      </section>

      <PageNavigation />
    </div>
  );
}

function AuthMethodCard({
  method,
  endpoint,
  description,
  example,
}: {
  method: string;
  endpoint: string;
  description: string;
  example: string;
}) {
  return (
    <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-amber-500">🔐</span>
        <h3 className="font-semibold text-slate-900 dark:text-white">{method}</h3>
        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
          {endpoint}
        </span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
        {description}
      </p>
      <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-mono text-slate-700 dark:text-slate-300">
        {example}
      </code>
    </div>
  );
}

function EndpointCard({
  slug,
  endpoint,
}: {
  slug: string;
  endpoint: (typeof apiEndpoints)[keyof typeof apiEndpoints];
}) {
  return (
    <Link
      href={`/docs/api/${slug}`}
      className="block p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all group"
    >
      <div className="flex items-center gap-3 mb-2">
        <MethodBadge method={endpoint.method} />
        <code className="text-sm font-mono text-slate-700 dark:text-slate-300 group-hover:text-amber-700 dark:group-hover:text-amber-300">
          {endpoint.path}
        </code>
      </div>
      <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300">
        {endpoint.title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
        {endpoint.description}
      </p>
    </Link>
  );
}

function StatusCode({
  code,
  description,
}: {
  code: number;
  description: string;
}) {
  const colorClass =
    code >= 200 && code < 300
      ? 'text-green-600 dark:text-green-400'
      : code >= 400 && code < 500
      ? 'text-amber-600 dark:text-amber-400'
      : 'text-red-600 dark:text-red-400';

  return (
    <div className="flex items-baseline gap-3">
      <code className={`font-mono font-bold ${colorClass}`}>{code}</code>
      <span className="text-slate-600 dark:text-slate-300">{description}</span>
    </div>
  );
}
