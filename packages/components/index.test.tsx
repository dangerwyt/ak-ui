import { describe, expect, it } from 'vitest';
import { type Plugin } from 'vue';
import { map, get } from 'lodash-es';

import {
  AkaButton,
  AkaButtonGroup,
  AkaIcon,
  AkaAlert,
  AkaCollapse,
  AkaCollapseItem,
} from './index';

const components = [
  AkaButton,
  AkaButtonGroup,
  AkaIcon,
  AkaAlert,
  AkaCollapse,
  AkaCollapseItem,
] as Plugin[];

describe('components/index.ts', () => {
  it.each(map(components, (c) => [get(c, 'name') ?? '', c]))(
    '%s should be exported',
    (_, component) => {
      expect(component).toBeDefined();
      expect(component.install).toBeDefined();
    }
  );
});
