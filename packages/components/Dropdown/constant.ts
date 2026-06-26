import type { InjectionKey } from 'vue';
import type { DropdownContext } from './types';

export const DROPDOWN_CONTEXT_KEY: InjectionKey<DropdownContext> = Symbol(
  'DROPDOWN_CONTEXT_KEY'
);
