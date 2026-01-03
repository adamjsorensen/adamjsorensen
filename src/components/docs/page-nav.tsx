'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getAdjacentPages } from '@/lib/docs-config';

export function PageNavigation() {
  const pathname = usePathname();
  const { prev, next } = getAdjacentPages(pathname);

  if (!prev && !next) return null;

  return (
    <nav className="flex items-stretch gap-4 mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
      {/* Previous */}
      {prev ? (
        <Link
          href={prev.href}
          className="flex-1 group flex flex-col p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-colors"
        >
          <span className="text-sm text-slate-400 dark:text-slate-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </span>
          <span className="mt-1 font-medium text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {/* Next */}
      {next ? (
        <Link
          href={next.href}
          className="flex-1 group flex flex-col items-end p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-colors text-right"
        >
          <span className="text-sm text-slate-400 dark:text-slate-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 flex items-center gap-1">
            Next
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <span className="mt-1 font-medium text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}

// Table of Contents Component
interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <div className="hidden xl:block sticky top-8 w-56 ml-8 self-start">
      <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
        On this page
      </h4>
      <nav className="space-y-1">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block text-sm text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors ${
              item.level === 2 ? '' : 'pl-3'
            }`}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
}

// Breadcrumb navigation
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && (
            <svg className="w-4 h-4 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900 dark:text-white">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
