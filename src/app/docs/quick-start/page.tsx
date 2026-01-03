import { CodeBlock, Callout, Note } from '@/components/docs';
import { PageNavigation, Breadcrumbs } from '@/components/docs';

export const metadata = {
  title: 'Quick Start | Documentation',
  description: 'Get started with The Knowledge Parlour in just 5 minutes',
};

export default function QuickStartPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Quick Start' },
        ]}
      />

      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Quick Start Guide
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Get The Knowledge Parlour up and running on your local machine in just a few minutes.
        </p>
      </header>

      <Note>
        This guide assumes you have Node.js 18+ and npm installed on your machine.
      </Note>

      {/* Prerequisites */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="prerequisites">
          Prerequisites
        </h2>
        <ul className="space-y-2 text-slate-600 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span>Node.js 18.0 or later</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span>npm, yarn, or pnpm package manager</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span>A Supabase account (free tier works)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span>A Luma account with API access (Plus subscription required)</span>
          </li>
        </ul>
      </section>

      {/* Step 1: Clone */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="step-1">
          Step 1: Clone the Repository
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Start by cloning the repository to your local machine:
        </p>
        <CodeBlock
          code={`git clone https://github.com/your-username/knowledge-parlour.git
cd knowledge-parlour`}
          language="bash"
        />
      </section>

      {/* Step 2: Install */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="step-2">
          Step 2: Install Dependencies
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Install the project dependencies using your preferred package manager:
        </p>
        <CodeBlock
          code={`npm install
# or
yarn install
# or
pnpm install`}
          language="bash"
        />
      </section>

      {/* Step 3: Environment */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="step-3">
          Step 3: Configure Environment Variables
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Copy the example environment file and fill in your credentials:
        </p>
        <CodeBlock
          code={`cp .env.example .env.local`}
          language="bash"
        />
        <p className="text-slate-600 dark:text-slate-300">
          Then edit <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">.env.local</code> with your values:
        </p>
        <CodeBlock
          code={`# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# Luma API
LUMA_API_KEY=your-luma-api-key

# Security
CRON_SECRET=generate-a-random-string-here`}
          language="bash"
          filename=".env.local"
        />
        <Callout type="warning" title="Keep secrets safe">
          Never commit your <code>.env.local</code> file to version control. It contains
          sensitive credentials that should remain private.
        </Callout>
      </section>

      {/* Step 4: Database */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="step-4">
          Step 4: Set Up the Database
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Run the SQL schema in your Supabase dashboard:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300">
          <li>Go to your Supabase project dashboard</li>
          <li>Navigate to SQL Editor</li>
          <li>Copy the contents of <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">supabase/schema.sql</code></li>
          <li>Paste and run the SQL</li>
        </ol>
        <Callout type="tip" title="Scaffold Mode">
          For quick testing, you can skip this step! The app runs in &quot;scaffold mode&quot;
          using local JSON files by default. Switch to Supabase when ready for production.
        </Callout>
      </section>

      {/* Step 5: Run */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="step-5">
          Step 5: Start Development Server
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Launch the development server:
        </p>
        <CodeBlock
          code={`npm run dev`}
          language="bash"
        />
        <p className="text-slate-600 dark:text-slate-300">
          Open <a href="http://localhost:3000" className="text-amber-600 dark:text-amber-400 hover:underline">http://localhost:3000</a> in
          your browser to see the app running!
        </p>
      </section>

      {/* What's next */}
      <section className="space-y-4 bg-slate-50 dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          What&apos;s Next?
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <NextStepCard
            href="/docs/architecture"
            title="Understand the Architecture"
            description="Learn about the system design and data flow"
          />
          <NextStepCard
            href="/docs/api"
            title="Explore the API"
            description="Dive into the REST endpoints"
          />
          <NextStepCard
            href="/docs/developers/project-structure"
            title="Project Structure"
            description="Navigate the codebase"
          />
          <NextStepCard
            href="/docs/admin/luma-integration"
            title="Configure Luma"
            description="Set up event synchronization"
          />
        </div>
      </section>

      <PageNavigation />
    </div>
  );
}

function NextStepCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <a
      href={href}
      className="block p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-white dark:hover:bg-slate-800 transition-all"
    >
      <h3 className="font-medium text-slate-900 dark:text-white">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        {description}
      </p>
    </a>
  );
}
