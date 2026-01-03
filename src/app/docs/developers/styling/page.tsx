import { CodeBlock, Callout } from '@/components/docs';
import { PageNavigation, Breadcrumbs } from '@/components/docs';

export const metadata = {
  title: 'Styling Guide | Developer Guide',
  description: 'Tailwind configuration and design system',
};

export default function StylingPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Docs', href: '/docs' },
          { label: 'Developer Guide' },
          { label: 'Styling Guide' },
        ]}
      />

      <header>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Styling Guide
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          The Knowledge Parlour design system, colors, typography, and custom utilities.
        </p>
      </header>

      {/* Tech Stack */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="stack">
          Styling Stack
        </h2>
        <ul className="space-y-2 text-slate-600 dark:text-slate-300 ml-4">
          <li><strong>Tailwind CSS 3.4</strong> - Utility-first CSS framework</li>
          <li><strong>PostCSS</strong> - CSS processing</li>
          <li><strong>Google Fonts</strong> - Custom typography via Next.js font optimization</li>
          <li><strong>CSS Variables</strong> - Theme tokens for consistency</li>
        </ul>
      </section>

      {/* Colors */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="colors">
          Color Palette
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          The design uses a warm, intellectual aesthetic:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <ColorSwatch name="ink" value="#0a0a0a" description="Primary background" />
          <ColorSwatch name="parchment" value="#f5f0e8" description="Light accents" />
          <ColorSwatch name="amber.warm" value="#d4a574" description="Primary accent" />
          <ColorSwatch name="amber.glow" value="#e8b87d" description="Hover states" />
          <ColorSwatch name="amber.deep" value="#b8956a" description="Active states" />
          <ColorSwatch name="slate.charcoal" value="#1a1a1a" description="Card backgrounds" />
          <ColorSwatch name="slate.smoke" value="#2a2a2a" description="Borders" />
        </div>
        <CodeBlock
          code={`// tailwind.config.ts
theme: {
  extend: {
    colors: {
      ink: '#0a0a0a',
      parchment: '#f5f0e8',
      amber: {
        warm: '#d4a574',
        glow: '#e8b87d',
        deep: '#b8956a',
      },
      slate: {
        charcoal: '#1a1a1a',
        smoke: '#2a2a2a',
      },
    },
  },
}`}
          language="typescript"
        />
      </section>

      {/* Typography */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="typography">
          Typography
        </h2>
        <div className="space-y-4">
          <FontSample
            name="Playfair Display"
            usage="Headings, display text"
            example="The Knowledge Parlour"
            className="font-serif text-3xl"
          />
          <FontSample
            name="Space Grotesk"
            usage="Body text, UI elements"
            example="Intimate intellectual lectures in London's finest bars"
            className="font-sans text-lg"
          />
          <FontSample
            name="JetBrains Mono"
            usage="Code, technical content"
            example="npm run dev"
            className="font-mono text-base"
          />
        </div>
        <CodeBlock
          code={`// tailwind.config.ts
fontFamily: {
  sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
  serif: ['var(--font-playfair)', 'Georgia', 'serif'],
  mono: ['var(--font-jetbrains)', 'Menlo', 'monospace'],
}`}
          language="typescript"
        />
      </section>

      {/* Custom Utilities */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="utilities">
          Custom Utilities
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Custom CSS classes defined in <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">globals.css</code>:
        </p>
        <div className="space-y-4">
          <UtilityCard
            name=".text-gradient"
            description="Amber gradient text effect"
            code={`.text-gradient {
  @apply bg-gradient-to-r from-amber-warm via-amber-glow to-amber-warm
    bg-clip-text text-transparent;
}`}
          />
          <UtilityCard
            name=".glass-card"
            description="Glassmorphism card effect"
            code={`.glass-card {
  @apply bg-slate-charcoal/80 backdrop-blur-md
    border border-white/5 rounded-xl;
}`}
          />
          <UtilityCard
            name=".glow-amber"
            description="Subtle amber glow shadow"
            code={`.glow-amber {
  box-shadow: 0 0 40px rgba(212, 165, 116, 0.15);
}`}
          />
          <UtilityCard
            name=".hover-lift"
            description="Lift effect on hover"
            code={`.hover-lift {
  @apply transition-all duration-300
    hover:-translate-y-1 hover:shadow-lg;
}`}
          />
        </div>
      </section>

      {/* Animations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="animations">
          Animations
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Custom keyframe animations for engaging interactions:
        </p>
        <CodeBlock
          code={`// tailwind.config.ts
animation: {
  'fade-up': 'fade-up 0.6s ease-out forwards',
  'fade-in': 'fade-in 0.5s ease-out forwards',
  'slide-in-left': 'slide-in-left 0.6s ease-out forwards',
  'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
  'scale-in': 'scale-in 0.5s ease-out forwards',
  'float': 'float 6s ease-in-out infinite',
  'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
},

keyframes: {
  'fade-up': {
    '0%': { opacity: '0', transform: 'translateY(20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  'float': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-20px)' },
  },
  // ... more keyframes
}`}
          language="typescript"
        />
      </section>

      {/* Responsive */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="responsive">
          Responsive Design
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Mobile-first breakpoints using Tailwind defaults:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-2 pr-4 font-medium text-slate-500">Prefix</th>
                <th className="text-left py-2 pr-4 font-medium text-slate-500">Min Width</th>
                <th className="text-left py-2 font-medium text-slate-500">Typical Use</th>
              </tr>
            </thead>
            <tbody className="text-slate-600 dark:text-slate-300">
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2 pr-4 font-mono text-amber-600">(none)</td>
                <td className="py-2 pr-4">0px</td>
                <td className="py-2">Mobile phones</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2 pr-4 font-mono text-amber-600">sm:</td>
                <td className="py-2 pr-4">640px</td>
                <td className="py-2">Large phones</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2 pr-4 font-mono text-amber-600">md:</td>
                <td className="py-2 pr-4">768px</td>
                <td className="py-2">Tablets</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2 pr-4 font-mono text-amber-600">lg:</td>
                <td className="py-2 pr-4">1024px</td>
                <td className="py-2">Laptops</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2 pr-4 font-mono text-amber-600">xl:</td>
                <td className="py-2 pr-4">1280px</td>
                <td className="py-2">Desktops</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Dark Mode */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="dark-mode">
          Dark Mode
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          The site uses class-based dark mode:
        </p>
        <CodeBlock
          code={`// tailwind.config.ts
darkMode: 'class',

// Usage in components
<div className="bg-white dark:bg-slate-900">
  <p className="text-slate-900 dark:text-white">
    Content adapts to theme
  </p>
</div>`}
          language="typescript"
        />
        <Callout type="tip" title="Theme Toggle">
          The documentation has a theme toggle. The main landing page uses a fixed
          dark theme for the premium aesthetic.
        </Callout>
      </section>

      <PageNavigation />
    </div>
  );
}

function ColorSwatch({
  name,
  value,
  description,
}: {
  name: string;
  value: string;
  description: string;
}) {
  return (
    <div className="space-y-2">
      <div
        className="h-16 rounded-lg border border-slate-200 dark:border-slate-700"
        style={{ backgroundColor: value }}
      />
      <div>
        <code className="text-xs font-mono text-amber-600 dark:text-amber-400">{name}</code>
        <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
      </div>
    </div>
  );
}

function FontSample({
  name,
  usage,
  example,
  className,
}: {
  name: string;
  usage: string;
  example: string;
  className: string;
}) {
  return (
    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-semibold text-slate-900 dark:text-white">{name}</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">— {usage}</span>
      </div>
      <p className={`text-slate-700 dark:text-slate-300 ${className}`}>{example}</p>
    </div>
  );
}

function UtilityCard({
  name,
  description,
  code,
}: {
  name: string;
  description: string;
  code: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-3 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <code className="text-amber-600 dark:text-amber-400 font-mono">{name}</code>
        <span className="text-slate-500 dark:text-slate-400 text-sm ml-2">— {description}</span>
      </div>
      <div className="p-4 bg-slate-900">
        <pre className="text-xs text-slate-300 font-mono overflow-x-auto">{code}</pre>
      </div>
    </div>
  );
}
