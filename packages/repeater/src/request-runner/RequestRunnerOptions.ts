export interface RequestRunnerOptions {
  timeout?: number;
  proxyUrl?: string;
  headers?: Record<string, string | string[]>;
  allowedMimes?: string[];
  maxContentLength?: number;
  reuseConnection?: boolean;
}

export const RequestRunnerOptions: unique symbol = Symbol(
  'RequestRunnerOptions'
);
