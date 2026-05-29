<script setup lang="ts">
  import {
    ref,
    type Ref,
    computed,
    watchEffect,
    watch,
    onUnmounted,
  } from 'vue';
  import type { TooltipProps, TooltipEmits, TooltipInstance } from './types';
  import { createPopper, type Instance } from '@popperjs/core';
  import { bind, debounce, isNil, type DebouncedFunc } from 'lodash-es';
  import { useClickOutside } from '@aka-element/hooks';
  import type { ButtonInstance } from '../Button';
  import useEventsToTriggerNode from './useEventsToTriggerNode';

  defineOptions({
    name: 'AkaTooltip',
  });

  let popperInstance: null | Instance;
  let openDebounce: DebouncedFunc<() => void> | void;
  let closeDebounce: DebouncedFunc<() => void> | void;

  interface _TooltipProps extends TooltipProps {
    virtualRef?: HTMLElement | ButtonInstance | void;
    virtualTriggering?: boolean;
  }

  const props = withDefaults(defineProps<_TooltipProps>(), {
    trigger: 'hover',
    placement: 'bottom',
    transition: 'fade',
    showTimeout: 0,
    hideTimeout: 200,
  });

  const emits = defineEmits<TooltipEmits>();

  const visible = ref(false);
  const events: Ref<Record<string, EventListener>> = ref({});
  const outerEvents: Ref<Record<string, EventListener>> = ref({});
  const dropdownEvents: Ref<Record<string, EventListener>> = ref({});

  const containerNode = ref<HTMLElement>();
  const popperNode = ref<HTMLElement>();
  const _triggerNode = ref<HTMLElement>();

  const triggerNode = computed(() => {
    if (props.virtualTriggering) {
      return (
        ((props.virtualRef as ButtonInstance)?.ref as any) ??
        (props.virtualRef as HTMLElement) ??
        _triggerNode.value
      );
    }
    return _triggerNode.value as HTMLElement;
  });

  const popperOptions = computed(() => ({
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9],
        },
      },
    ],
    ...props.popperOptions,
  }));

  const openDelay = computed(() =>
    props.trigger === 'hover' ? props.showTimeout : 0
  );

  const closeDelay = computed(() =>
    props.trigger === 'hover' ? props.hideTimeout : 0
  );

  const openFinal = () => {
    closeDebounce?.cancel();
    openDebounce?.();
  };

  const closeFinal = () => {
    openDebounce?.cancel();
    closeDebounce?.();
  };

  const togglePopper = () => {
    visible.value ? closeFinal() : openFinal();
  };

  const setVisible = (val: boolean) => {
    if (props.disabled) return;
    visible.value = val;
    emits('visible-change', val);
  };

  const attachEvents = () => {
    if (props.disabled || props.manual) return;

    if (props.trigger === 'hover') {
      events.value['mouseenter'] = openFinal;
      outerEvents.value['mouseleave'] = closeFinal;
      dropdownEvents.value['mouseenter'] = openFinal;
      return;
    }
    if (props.trigger === 'click') {
      events.value['click'] = togglePopper;
      return;
    }
    if (props.trigger === 'contextmenu') {
      events.value['contextmenu'] = (e) => {
        e.preventDefault();
        togglePopper();
      };
      return;
    }
  };

  const resetEvents = () => {
    events.value = {};
    outerEvents.value = {};
    dropdownEvents.value = {};
    attachEvents();
  };

  const destroyPopperInstance = () => {
    if (isNil(popperInstance)) return;
    popperInstance.destroy();
    popperInstance = null;
  };

  const show: TooltipInstance['show'] = openFinal;

  const hide: TooltipInstance['hide'] = () => {
    openDebounce?.cancel();
    setVisible(false);
  };

  if (!props.manual) {
    attachEvents();
  }

  watch(
    () => visible.value,
    (newVal) => {
      if (!newVal) return;
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(
          triggerNode.value,
          popperNode.value,
          popperOptions.value
        );
      }
    },
    { flush: 'post' }
  );

  watch(
    () => props.manual,
    (isManual) => {
      if (isManual) {
        resetEvents();
        return;
      }
      attachEvents();
    }
  );

  watch(
    () => props.trigger,
    (newVal, oldVal) => {
      if (newVal === oldVal) return;
      openDebounce?.cancel();
      visible.value = false;
      emits('visible-change', false);
      resetEvents();
    }
  );

  watchEffect(() => {
    openDebounce = debounce(bind(setVisible, null, true), openDelay.value);
    closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value);
  });

  useClickOutside(containerNode, () => {
    emits('click-outside');
    if (props.trigger === 'hover' || props.manual) return;
    visible.value && closeFinal();
  });

  useEventsToTriggerNode(props, triggerNode, events, () => {
    openDebounce?.cancel();
    setVisible(false);
  });

  onUnmounted(() => {
    destroyPopperInstance();
  });

  defineExpose<TooltipInstance>({
    show,
    hide,
  });
</script>

<template>
  <div class="aka-tooltip" ref="containerNode" v-on="outerEvents">
    <div
      class="aka-tooltip__trigger"
      ref="_triggerNode"
      v-on="events"
      v-if="!virtualTriggering"
    >
      <slot></slot>
    </div>
    <slot name="default" v-else></slot>

    <transition :name="transition" @after-leave="destroyPopperInstance">
      <div
        class="aka-tooltip__popper"
        ref="popperNode"
        v-on="dropdownEvents"
        v-if="visible"
      >
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>
