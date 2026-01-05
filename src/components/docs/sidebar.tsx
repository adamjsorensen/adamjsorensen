'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { docsConfig, type DocGroup, type DocSection, type DocPage } from '@/lib/docs-config';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4">
          <Link
            href="/docs"
            className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white"
          >
            <span className="text-2xl">📚</span>
            <span>Documentation</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-6">
          {docsConfig.map((group, groupIndex) => (
            <SidebarGroup
              key={groupIndex}
              group={group}
              pathname={pathname}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to site
          </Link>
        </div>
      </aside>
    </>
  );
}

function SidebarGroup({ group, pathname }: { group: DocGroup; pathname: string }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
        {group.title}
      </h3>
      <div className="space-y-4">
        {group.sections.map((section, sectionIndex) => (
          <SidebarSection
            key={sectionIndex}
            section={section}
            pathname={pathname}
          />
        ))}
      </div>
    </div>
  );
}

function SidebarSection({ section, pathname }: { section: DocSection; pathname: string }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasActiveChild = section.pages.some((page) => pathname === page.href);

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center gap-2 w-full text-left text-sm font-medium py-1 ${
          hasActiveChild
            ? 'text-amber-600 dark:text-amber-400'
            : 'text-slate-700 dark:text-slate-300'
        }`}
      >
        {section.icon && <span>{section.icon}</span>}
        <span className="flex-1">{section.title}</span>
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform ${
            isExpanded ? 'rotate-90' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {isExpanded && (
        <ul className="mt-1 ml-4 space-y-1 border-l border-slate-200 dark:border-slate-700">
          {section.pages.map((page) => (
            <SidebarLink key={page.href} page={page} isActive={pathname === page.href} />
          ))}
        </ul>
      )}
    </div>
  );
}

function SidebarLink({ page, isActive }: { page: DocPage; isActive: boolean }) {
  return (
    <li>
      <Link
        href={page.href}
        className={`flex items-center gap-2 pl-4 py-1.5 text-sm transition-colors border-l-2 -ml-px ${
          isActive
            ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-medium'
            : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
        }`}
      >
        <span className="truncate">{page.title}</span>
        {page.badge && (
          <span
            className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
              page.badge === 'new'
                ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400'
                : page.badge === 'updated'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                : page.badge === 'beta'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400'
                : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
            }`}
          >
            {page.badge}
          </span>
        )}
      </Link>
    </li>
  );
}

// Mobile menu button
interface MobileMenuButtonProps {
  onClick: () => void;
}

export function MobileMenuButton({ onClick }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden fixed bottom-4 right-4 z-40 bg-amber-500 text-white p-4 rounded-full shadow-lg hover:bg-amber-600 transition-colors"
      aria-label="Toggle navigation"
    >
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
}
