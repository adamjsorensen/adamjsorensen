'use client';

import { CodeTabs } from './tabs';
import { CodeBlock } from './code-block';
import type { ApiEndpoint } from '@/lib/docs-config';

interface MethodBadgeProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  size?: 'sm' | 'md' | 'lg';
}

const methodColors: Record<string, string> = {
  GET: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400',
  POST: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400',
  PUT: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400',
  DELETE: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400',
  PATCH: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400',
};

export function MethodBadge({ method, size = 'md' }: MethodBadgeProps) {
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center font-mono font-bold rounded ${methodColors[method]} ${sizeClasses[size]}`}
    >
      {method}
    </span>
  );
}

interface EndpointHeaderProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
}

export function EndpointHeader({ method, path }: EndpointHeaderProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-slate-100 dark:bg-slate-800 p-4 font-mono">
      <MethodBadge method={method} size="lg" />
      <span className="text-slate-800 dark:text-slate-200 text-sm md:text-base break-all">
        {path}
      </span>
    </div>
  );
}

interface ParamTableProps {
  title: string;
  params: {
    name: string;
    type?: string;
    required: boolean;
    description: string;
    example?: string;
  }[];
}

export function ParamTable({ title, params }: ParamTableProps) {
  if (!params || params.length === 0) return null;

  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
        {title}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="text-left py-2 pr-4 font-medium text-slate-500 dark:text-slate-400">
                Name
              </th>
              <th className="text-left py-2 pr-4 font-medium text-slate-500 dark:text-slate-400">
                Type
              </th>
              <th className="text-left py-2 pr-4 font-medium text-slate-500 dark:text-slate-400">
                Required
              </th>
              <th className="text-left py-2 font-medium text-slate-500 dark:text-slate-400">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {params.map((param) => (
              <tr
                key={param.name}
                className="border-b border-slate-100 dark:border-slate-800"
              >
                <td className="py-3 pr-4">
                  <code className="text-amber-600 dark:text-amber-400 font-mono text-xs bg-amber-50 dark:bg-amber-950/50 px-1.5 py-0.5 rounded">
                    {param.name}
                  </code>
                </td>
                <td className="py-3 pr-4">
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-xs">
                    {param.type || 'string'}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  {param.required ? (
                    <span className="text-red-600 dark:text-red-400 text-xs font-medium">
                      Required
                    </span>
                  ) : (
                    <span className="text-slate-400 dark:text-slate-500 text-xs">
                      Optional
                    </span>
                  )}
                </td>
                <td className="py-3 text-slate-600 dark:text-slate-300">
                  {param.description}
                  {param.example && (
                    <div className="mt-1">
                      <span className="text-slate-400 dark:text-slate-500 text-xs">
                        Example:{' '}
                      </span>
                      <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">
                        {param.example}
                      </code>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface ResponseExampleProps {
  responses: {
    status: number;
    description: string;
    example?: object;
  }[];
}

export function ResponseExamples({ responses }: ResponseExampleProps) {
  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
        Responses
      </h3>
      <div className="space-y-4">
        {responses.map((response) => (
          <div
            key={response.status}
            className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 px-4 py-2 border-b border-slate-200 dark:border-slate-700">
              <span
                className={`font-mono font-bold text-sm ${
                  response.status >= 200 && response.status < 300
                    ? 'text-green-600 dark:text-green-400'
                    : response.status >= 400
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-amber-600 dark:text-amber-400'
                }`}
              >
                {response.status}
              </span>
              <span className="text-slate-600 dark:text-slate-300 text-sm">
                {response.description}
              </span>
            </div>
            {response.example && (
              <div className="p-4 bg-slate-900">
                <pre className="text-sm text-slate-200 overflow-x-auto">
                  <code>{JSON.stringify(response.example, null, 2)}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface ApiEndpointDocProps {
  endpoint: ApiEndpoint;
}

export function ApiEndpointDoc({ endpoint }: ApiEndpointDocProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <EndpointHeader method={endpoint.method} path={endpoint.path} />

      {/* Description */}
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
        {endpoint.description}
      </p>

      {/* Authentication */}
      {endpoint.authentication.required && (
        <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-amber-600 dark:text-amber-400">🔐</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              Authentication Required
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {endpoint.authentication.type}
          </p>
          {endpoint.authentication.header && (
            <code className="block mt-2 text-xs bg-amber-100 dark:bg-amber-900/50 px-2 py-1 rounded font-mono">
              {endpoint.authentication.header}
            </code>
          )}
        </div>
      )}

      {/* Headers */}
      {endpoint.headers && (
        <ParamTable title="Headers" params={endpoint.headers} />
      )}

      {/* Query Parameters */}
      {endpoint.queryParams && (
        <ParamTable title="Query Parameters" params={endpoint.queryParams} />
      )}

      {/* Body Parameters */}
      {endpoint.bodyParams && (
        <ParamTable title="Request Body" params={endpoint.bodyParams} />
      )}

      {/* Example Requests */}
      {endpoint.exampleRequest && (
        <div className="my-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Example Request
          </h3>
          <CodeTabs
            tabs={[
              ...(endpoint.exampleRequest.curl
                ? [{ language: 'curl', label: 'cURL', code: endpoint.exampleRequest.curl }]
                : []),
              ...(endpoint.exampleRequest.javascript
                ? [{ language: 'javascript', label: 'JavaScript', code: endpoint.exampleRequest.javascript }]
                : []),
              ...(endpoint.exampleRequest.python
                ? [{ language: 'python', label: 'Python', code: endpoint.exampleRequest.python }]
                : []),
            ]}
          />
        </div>
      )}

      {/* Responses */}
      <ResponseExamples responses={endpoint.responses} />
    </div>
  );
}
