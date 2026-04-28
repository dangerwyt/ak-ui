import { describe, expect, it, vi } from 'vitest';
import { throwError, debugWarn } from '../index';

describe('error', () => {
  it('throwError should work', () => {
    expect(() => {
      throwError('scope', 'message');
    }).toThrowError('[scope]: message');
  });
  it('debugWarn should work', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    debugWarn('scope', 'message');
    debugWarn(new SyntaxError('custom error'));
    expect(warnSpy.mock.calls).toMatchInlineSnapshot(`
      [
        [
          [AkaError: [scope]: message],
        ],
        [
          [SyntaxError: custom error],
        ],
      ]
    `);
  });
});
