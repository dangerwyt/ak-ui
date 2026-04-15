import { isString } from 'lodash-es';

class AkaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AkaError';
  }
}

export function throwError(scope: string, message: string) {
  throw new AkaError(`[${scope}]: ${message}`);
}

export function debugWarn(error: Error): void;
export function debugWarn(scope: string, message: string): void;
export function debugWarn(scope: string | Error, message?: string) {
  if (process.env.NODE_ENV !== 'production') {
    const err = isString(scope)
      ? new AkaError(`[${scope}]: ${message}`)
      : scope;
    console.warn(err);
  }
}
