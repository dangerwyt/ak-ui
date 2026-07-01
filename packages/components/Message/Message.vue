<script setup lang="ts">
  import { ref, onMounted, watch, computed } from 'vue';
  import type { MessageProps } from './types';
  import AkaIcon from '../Icon/Icon.vue';
  import { delay } from 'lodash-es';
  import { typeIconMap, renderVnode } from '@aka-element/utils';
  defineOptions({
    name: 'AKAMessage',
  });

  const props = withDefaults(defineProps<MessageProps>(), {
    type: 'info',
    duration: 3000,
    offset: 10,
    transitionName: 'fade-up',
  });

  const visible = ref(false);

  const messageRef = ref<HTMLDivElement>();

  const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info');

  let timer: number;

  const close = () => {
    visible.value = false;
  };

  const startTimer = () => {
    if (props.duration === 0) {
      return;
    }
    timer = delay(close, props.duration);
  };

  const clearTimer = () => {
    clearTimeout(timer);
  };

  watch(
    () => visible.value,
    (newVal) => {
      if (!newVal) {
        clearTimer();
      }
    }
  );

  onMounted(() => {
    visible.value = true;
    startTimer();
  });

  defineExpose({
    close,
  });
</script>

<template>
  <Transition :name="transitionName" @after-leave="!visible && onDestory()">
    <div
      ref="messageRef"
      class="aka-message"
      role="alert"
      v-show="visible"
      :class="{
        [`aka-message--${type}`]: type,
        'is-close': showClose,
        'is-center': center,
      }"
      @mouseleave="startTimer"
      @mouseenter="clearTimer"
    >
      <aka-icon class="aka-message__icon" :icon="iconName"></aka-icon>
      <div class="aka-message__content">
        <slot>
          <render-vnode v-if="message" :vNode="message"></render-vnode>
        </slot>
      </div>
      <div class="aka-message__close" v-if="showClose" @click.stop="close">
        <aka-icon icon="xmark"></aka-icon>
      </div>
    </div>
  </Transition>
</template>
