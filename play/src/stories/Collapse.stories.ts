import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { AkaCollapse, AkaCollapseItem } from 'aka-element';

import 'aka-element/dist/theme/Collapse.css';

type Story = StoryObj<typeof AkaCollapse>;

const meta: Meta<typeof AkaCollapse> = {
  title: 'Example/Collapse',
  component: AkaCollapse,
  subcomponents: { AkaCollapseItem },
  tags: ['autodocs'],
};

export const Default: Story = {
  render: (args) => ({
    components: {
      AkaCollapse,
      AkaCollapseItem,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
    <aka-collapse v-bind="args">
      <aka-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </aka-collapse-item>
      </aka-collapse-item>
      <aka-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </aka-collapse-item>
      <aka-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </aka-collapse-item>
    </aka-collapse>
    `,
  }),
  args: {
    accordion: true,
    modelValue: ['a'],
  },
};

export default meta;
