import { describe, test, it, expect, vi, beforeEach } from 'vitest';
import { withInstall } from '@aka-element/utils';
import { mount } from '@vue/test-utils';
import { each, get } from 'lodash-es';
import { AkaPopconfirm } from '.';
import type { PopconfirmProps } from './types';
import Popconfirm from './Popconfirm.vue';

// 测试 Popconfirm 组件的 props
describe('Popconfirm.vue', () => {
  const props = {
    title: 'Test Title',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    confirmButtonType: 'primary',
    cancelButtonType: 'info',
    icon: 'check-circle',
    iconColor: 'green',
    hideIcon: false,
    hideAfter: 500,
    width: 200,
  } as PopconfirmProps;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  it('should accept all props', () => {
    const wrapper = mount(AkaPopconfirm, {
      props,
    });
    each(Object.keys(props), (key) => {
      expect(get(wrapper.props(), key)).toBe(get(props, key));
    });
  });

  it('should renders slot content correctly', () => {
    const slotContent = 'Slot Content';
    const wrapper = mount(Popconfirm, {
      props,
      slots: {
        default: slotContent,
      },
    });

    expect(wrapper.text()).toContain(slotContent);
  });
});
