import { ReactNode } from 'react';

type CalloutType = 'info' | 'warning' | 'error' | 'success' | 'tip';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const calloutConfig: Record<
  CalloutType,
  { icon: string; bg: string; border: string; title: string; iconBg: string }
> = {
  info: {
    icon: 'ℹ️',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    title: 'Info',
    iconBg: 'bg-blue-100 dark:bg-blue-900',
  },
  warning: {
    icon: '⚠️',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    title: 'Warning',
    iconBg: 'bg-amber-100 dark:bg-amber-900',
  },
  error: {
    icon: '🚫',
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-800',
    title: 'Error',
    iconBg: 'bg-red-100 dark:bg-red-900',
  },
  success: {
    icon: '✅',
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-200 dark:border-green-800',
    title: 'Success',
    iconBg: 'bg-green-100 dark:bg-green-900',
  },
  tip: {
    icon: '💡',
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    border: 'border-purple-200 dark:border-purple-800',
    title: 'Tip',
    iconBg: 'bg-purple-100 dark:bg-purple-900',
  },
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const config = calloutConfig[type];

  return (
    <div
      className={`my-4 flex gap-3 rounded-lg border p-4 ${config.bg} ${config.border}`}
    >
      <div
        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${config.iconBg}`}
      >
        <span className="text-sm">{config.icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        {title && (
          <p className="mb-1 font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </p>
        )}
        <div className="text-sm text-slate-700 dark:text-slate-300 prose-sm">
          {children}
        </div>
      </div>
    </div>
  );
}

// Note component - simpler callout
interface NoteProps {
  children: ReactNode;
}

export function Note({ children }: NoteProps) {
  return (
    <div className="my-4 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30 py-3 pl-4 pr-4">
      <div className="text-sm text-slate-700 dark:text-slate-300">{children}</div>
    </div>
  );
}
