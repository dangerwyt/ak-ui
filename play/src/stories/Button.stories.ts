import type { Meta, StoryObj, ArgTypes } from '@storybook/vue3-vite';
import { fn, within, expect, userEvent } from 'storybook/test';

import { AkaButton, AkaButtonGroup } from 'aka-element';
import 'aka-element/dist/theme/Button.css';

type Story = StoryObj<typeof AkaButton> & { argTypes: ArgTypes };

const meta: Meta<typeof AkaButton> = {
  title: 'Example/Button',
  component: AkaButton,
  subcomponents: { ButtonGroup: AkaButtonGroup },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'danger', 'info', ''],
    },
    size: {
      control: { type: 'select' },
      options: ['large', 'default', 'small', ''],
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    useThrottle: {
      control: 'boolean',
    },
    throttleDuration: {
      control: 'number',
    },
    autofocus: {
      control: 'boolean',
    },
    tag: {
      control: { type: 'select' },
      options: ['button', 'a', 'div'],
    },
    nativeType: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset', ''],
    },
    icon: {
      control: { type: 'text' },
    },
    loadingIcon: {
      control: { type: 'text' },
    },
  },
  args: { onClick: fn() },
};

const container = (val: string) => `
<div style="margin:5px">
  ${val}
</div>
`;

export const Default: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: { type: 'text' },
    },
  },
  args: {
    type: 'primary',
    content: 'Button',
  },
  render: (args) => ({
    components: { AkaButton },
    setup() {
      return { args };
    },
    template: container(
      `<aka-button v-bind="args">{{args.content}}</aka-button>`
    ),
  }),

  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step('click btn', async () => {
      await userEvent.click(canvas.getByRole('button'));
    });
    expect(args.onClick).toHaveBeenCalled();
  },
};

export const Group: Story & { args: { content1: string; content2: string } } = {
  argTypes: {
    groupType: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'danger', 'info', ''],
    },
    groupSize: {
      control: { type: 'select' },
      options: ['large', 'default', 'small', ''],
    },
    groupDisabled: {
      control: 'boolean',
    },
    content1: {
      control: { type: 'text' },
      defaultValue: 'Button1',
    },
    content2: {
      control: { type: 'text' },
      defaultValue: 'Button2',
    },
  },
  args: {
    round: true,
    content1: 'Button1',
    content2: 'Button2',
  },
  render: (args) => ({
    components: { AkaButton, AkaButtonGroup },
    setup() {
      return { args };
    },
    template: container(`
       <aka-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
         <aka-button v-bind="args">{{args.content1}}</aka-button>
         <aka-button v-bind="args">{{args.content2}}</aka-button>
       </aka-button-group>
    `),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step('click btn1', async () => {
      await userEvent.click(canvas.getByText('Button1'));
    });
    await step('click btn2', async () => {
      await userEvent.click(canvas.getByText('Button2'));
    });
    expect(args.onClick).toHaveBeenCalled();
  },
};

export default meta;
