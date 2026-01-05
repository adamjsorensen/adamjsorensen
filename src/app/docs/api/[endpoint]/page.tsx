import { notFound } from 'next/navigation';
import { ApiEndpointDoc } from '@/components/docs';
import { PageNavigation, Breadcrumbs } from '@/components/docs';
import { apiEndpoints } from '@/lib/docs-config';

interface PageProps {
  params: Promise<{ endpoint: string }>;
}

export async function generateStaticParams() {
  return Object.keys(apiEndpoints).map((endpoint) => ({
    endpoint,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { endpoint: endpointSlug } = await params;
  const endpoint = apiEndpoints[endpointSlug as keyof typeof apiEndpoints];

  if (!endpoint) {
    return {
      title: 'Not Found | Documentation',
    };
  }

  return {
    title: `${endpoint.title} | API Reference`,
    description: endpoint.description,
  };
}

export default async function ApiEndpointPage({ params }: PageProps) {
  const { endpoint: endpointSlug } = await params;
  const endpoint = apiEndpoints[endpointSlug as keyof typeof apiEndpoints];

  if (!endpoint) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'API Reference', href: '/docs/api' },
          { label: endpoint.title },
        ]}
      />

      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          {endpoint.title}
        </h1>
      </header>

      <ApiEndpointDoc endpoint={endpoint} />

      <PageNavigation />
    </div>
  );
}
