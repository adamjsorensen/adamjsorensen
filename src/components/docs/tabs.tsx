'use client';

import { useState, ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className="my-4">
      {/* Tab headers */}
      <div className="flex border-b border-slate-200 dark:border-slate-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="pt-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={activeTab === tab.id ? 'block' : 'hidden'}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}

// Code tabs specifically for language switching
interface CodeTab {
  language: string;
  label: string;
  code: string;
}

interface CodeTabsProps {
  tabs: CodeTab[];
}

export function CodeTabs({ tabs }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.language);

  const languageIcons: Record<string, string> = {
    curl: '🌐',
    javascript: '📜',
    typescript: '📘',
    python: '🐍',
    go: '🔵',
    ruby: '💎',
    php: '🐘',
    bash: '💻',
  };

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
      {/* Tab headers */}
      <div className="flex bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        {tabs.map((tab) => (
          <button
            key={tab.language}
            onClick={() => setActiveTab(tab.language)}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.language
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-b-2 border-amber-500 -mb-px'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <span>{languageIcons[tab.language] || '📄'}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code content */}
      {tabs.map((tab) => (
        <div
          key={tab.language}
          className={activeTab === tab.language ? 'block' : 'hidden'}
        >
          <CodeBlockInner code={tab.code} language={tab.language} />
        </div>
      ))}
    </div>
  );
}

// Inner code block without border (used inside CodeTabs)
function CodeBlockInner({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative bg-slate-50 dark:bg-slate-900">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 z-10 rounded-md bg-slate-200 dark:bg-slate-700 px-2 py-1 text-xs text-slate-600 dark:text-slate-300 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-slate-300 dark:hover:bg-slate-600"
      >
        {copied ? (
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </span>
        )}
      </button>

      <div className="overflow-x-auto p-4">
        <pre className="text-sm leading-relaxed">
          <code className={`language-${language} text-slate-800 dark:text-slate-200 whitespace-pre`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}
