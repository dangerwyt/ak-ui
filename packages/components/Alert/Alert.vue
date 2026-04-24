<script setup lang="ts">
  import { ref, computed, useSlots } from 'vue';
  import type { AlertProps, AlertEmits } from './types';
  import AkaIcon from '../Icon/Icon.vue';
  import { typeIconMap } from '@aka-element/hooks';

  defineOptions({
    name: 'AkaAlert',
  });

  const visible = ref(true);

  const slots = useSlots();

  const emit = defineEmits<AlertEmits>();

  const props = withDefaults(defineProps<AlertProps>(), {
    type: 'success',
    closeable: true,
    effect: 'light',
  });

  const withDescription = computed(() => props.description || slots.default);

  const iconName = computed(() => typeIconMap.get(props.type) || 'circle-info');

  const close = (e: MouseEvent) => {
    visible.value = false;
    emit('close', e);
  };

  defineExpose({
    close,
  });
</script>

<template>
  <transition name="aka-alert-fade">
    <div
      v-show="visible"
      class="aka-alert"
      role="alert"
      :class="{
        [`aka-alert--${type}`]: type,
        [`is-${effect}`]: effect,
        'is-center': center,
      }"
    >
      <aka-icon
        class="aka-alert__icon"
        v-if="showIcon"
        :icon="iconName"
        :class="{ 'is-big': withDescription }"
      />

      <div class="aka-alert__content">
        <span
          class="aka-alert__title"
          :class="{ 'with-description': withDescription }"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="aka-alert__description">
          <slot>{{ description }}</slot>
        </p>
        <aka-icon
          v-if="closeable"
          icon="close"
          class="aka-alert__close"
          @click.stop="close"
        />
      </div>
    </div>
  </transition>
</template>

<style scoped>
  @import './style.css';
</style>
