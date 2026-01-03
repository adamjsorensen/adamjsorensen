import { CodeBlock, Callout, Note } from '@/components/docs';
import { PageNavigation, Breadcrumbs } from '@/components/docs';

export const metadata = {
  title: 'Local Development | Developer Guide',
  description: 'Set up your local development environment',
};

export default function LocalDevelopmentPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Developer Guide' },
          { label: 'Local Development' },
        ]}
      />

      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Local Development
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Get your development environment set up and start contributing to The Knowledge Parlour.
        </p>
      </header>

      {/* Prerequisites */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="prerequisites">
          Prerequisites
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <PrerequisiteCard
            name="Node.js"
            version="18.0+"
            link="https://nodejs.org"
          />
          <PrerequisiteCard
            name="npm"
            version="9.0+"
            link="https://npmjs.com"
          />
          <PrerequisiteCard
            name="Git"
            version="2.0+"
            link="https://git-scm.com"
          />
          <PrerequisiteCard
            name="VS Code"
            version="(recommended)"
            link="https://code.visualstudio.com"
          />
        </div>
      </section>

      {/* Clone & Install */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="setup">
          Clone & Install
        </h2>
        <CodeBlock
          code={`# Clone the repository
git clone https://github.com/your-org/knowledge-parlour.git

# Navigate to project
cd knowledge-parlour

# Install dependencies
npm install`}
          language="bash"
        />
      </section>

      {/* Environment Setup */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="environment">
          Environment Setup
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Create a <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">.env.local</code> file
          from the example:
        </p>
        <CodeBlock
          code={`cp .env.example .env.local`}
          language="bash"
        />
        <p className="text-slate-600 dark:text-slate-300">
          For local development, you can use scaffold mode (no external services required):
        </p>
        <CodeBlock
          code={`# .env.local - Minimal config for scaffold mode

# These can be placeholder values for local dev
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-anon-key
SUPABASE_SERVICE_KEY=placeholder-service-key

# Optional - only needed if syncing from Luma
LUMA_API_KEY=your-luma-key-if-you-have-one

# Security - generate a random string
CRON_SECRET=local-dev-secret-12345`}
          language="bash"
          filename=".env.local"
        />
        <Note>
          In scaffold mode, the app uses local JSON files instead of Supabase. See the
          demo data in <code>/data/events.json</code>.
        </Note>
      </section>

      {/* Start Development */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="start">
          Start Development Server
        </h2>
        <CodeBlock
          code={`npm run dev`}
          language="bash"
        />
        <p className="text-slate-600 dark:text-slate-300">
          The app will be available at:
        </p>
        <ul className="space-y-2 text-slate-600 dark:text-slate-300 ml-4">
          <li>
            <strong>Homepage:</strong>{' '}
            <a href="http://localhost:3000" className="text-amber-600 dark:text-amber-400 hover:underline">
              http://localhost:3000
            </a>
          </li>
          <li>
            <strong>Documentation:</strong>{' '}
            <a href="http://localhost:3000/docs" className="text-amber-600 dark:text-amber-400 hover:underline">
              http://localhost:3000/docs
            </a>
          </li>
        </ul>
      </section>

      {/* Available Scripts */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="scripts">
          Available Scripts
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 pr-4 font-medium text-slate-500 dark:text-slate-400">
                  Command
                </th>
                <th className="text-left py-3 font-medium text-slate-500 dark:text-slate-400">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-600 dark:text-slate-300">
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-3 pr-4 font-mono text-amber-600 dark:text-amber-400">
                  npm run dev
                </td>
                <td className="py-3">Start development server with hot reload</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-3 pr-4 font-mono text-amber-600 dark:text-amber-400">
                  npm run build
                </td>
                <td className="py-3">Build for production</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-3 pr-4 font-mono text-amber-600 dark:text-amber-400">
                  npm run start
                </td>
                <td className="py-3">Start production server</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-3 pr-4 font-mono text-amber-600 dark:text-amber-400">
                  npm run lint
                </td>
                <td className="py-3">Run ESLint</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-3 pr-4 font-mono text-amber-600 dark:text-amber-400">
                  npm run type-check
                </td>
                <td className="py-3">Run TypeScript compiler</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* VS Code Extensions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="vscode">
          Recommended VS Code Extensions
        </h2>
        <div className="grid gap-3">
          <ExtensionCard
            name="ESLint"
            id="dbaeumer.vscode-eslint"
            description="JavaScript/TypeScript linting"
          />
          <ExtensionCard
            name="Prettier"
            id="esbenp.prettier-vscode"
            description="Code formatting"
          />
          <ExtensionCard
            name="Tailwind CSS IntelliSense"
            id="bradlc.vscode-tailwindcss"
            description="Tailwind class autocomplete"
          />
          <ExtensionCard
            name="TypeScript Importer"
            id="pmneo.tsimporter"
            description="Auto-import TypeScript modules"
          />
        </div>
      </section>

      {/* Hot Reloading */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="hot-reload">
          Hot Reloading
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Next.js provides Fast Refresh for instant feedback:
        </p>
        <ul className="space-y-2 text-slate-600 dark:text-slate-300 ml-4">
          <li>• Edit any component and see changes instantly</li>
          <li>• React state is preserved during edits</li>
          <li>• Syntax errors show an overlay in the browser</li>
          <li>• Server components refresh automatically</li>
        </ul>
        <Callout type="tip" title="Full Refresh">
          If hot reload doesn&apos;t pick up changes, try refreshing the browser or restarting
          the dev server.
        </Callout>
      </section>

      {/* Debugging */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="debugging">
          Debugging
        </h2>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
          Browser DevTools
        </h3>
        <p className="text-slate-600 dark:text-slate-300">
          Use Chrome DevTools or Firefox Developer Tools for client-side debugging.
          React Developer Tools extension is highly recommended.
        </p>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-4">
          Server-Side Logging
        </h3>
        <p className="text-slate-600 dark:text-slate-300">
          Use <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">console.log</code> in
          server components and API routes. Logs appear in your terminal.
        </p>
        <CodeBlock
          code={`// In an API route
export async function GET() {
  console.log('API route called');
  // ... your code
}`}
          language="typescript"
        />

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-4">
          VS Code Debugger
        </h3>
        <p className="text-slate-600 dark:text-slate-300">
          Create a <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">.vscode/launch.json</code> for
          debugging:
        </p>
        <CodeBlock
          code={`{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}`}
          language="json"
          filename=".vscode/launch.json"
        />
      </section>

      {/* Common Issues */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="troubleshooting">
          Common Issues
        </h2>
        <div className="space-y-4">
          <IssueCard
            issue="Port 3000 already in use"
            solution="Kill the process using the port: lsof -ti:3000 | xargs kill -9"
          />
          <IssueCard
            issue="Module not found errors"
            solution="Delete node_modules and run npm install again"
          />
          <IssueCard
            issue="TypeScript errors on startup"
            solution="Run npm run type-check to see full error details"
          />
          <IssueCard
            issue="Environment variables not loading"
            solution="Make sure .env.local exists and restart the dev server"
          />
        </div>
      </section>

      <PageNavigation />
    </div>
  );
}

function PrerequisiteCard({
  name,
  version,
  link,
}: {
  name: string;
  version: string;
  link: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700 transition-colors"
    >
      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <span className="text-lg">📦</span>
      </div>
      <div>
        <div className="font-semibold text-slate-900 dark:text-white">{name}</div>
        <div className="text-sm text-slate-500 dark:text-slate-400">{version}</div>
      </div>
    </a>
  );
}

function ExtensionCard({
  name,
  id,
  description,
}: {
  name: string;
  id: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
        <span className="text-blue-600 dark:text-blue-400">⚡</span>
      </div>
      <div className="flex-1">
        <div className="font-medium text-slate-900 dark:text-white">{name}</div>
        <div className="text-xs text-slate-500 dark:text-slate-400">{description}</div>
      </div>
      <code className="text-xs text-slate-400 dark:text-slate-500 font-mono">{id}</code>
    </div>
  );
}

function IssueCard({ issue, solution }: { issue: string; solution: string }) {
  return (
    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <h4 className="font-medium text-slate-900 dark:text-white mb-1">{issue}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-300">{solution}</p>
    </div>
  );
}
