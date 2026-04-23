<script setup lang="ts">
  import type { ButtonProps, ButtonInstance, ButtonEmits } from './types';
  import { ref, computed, inject, defineAsyncComponent } from 'vue';
  import { throttle } from 'lodash-es';
  // import AkaIcon from '../Icon/Icon.vue';
  import { BUTTON_GROUP_CTX_KEY } from './constant';

  defineOptions({
    name: 'AkaButton',
  });

  const AkaIcon = defineAsyncComponent(() => import('../Icon/Icon.vue'));
  const props = withDefaults(defineProps<ButtonProps>(), {
    tag: 'button',
    nativeType: 'button',
    size: 'default',
    useThrottle: true,
    throttleDuration: 500,
  });

  const emit = defineEmits<ButtonEmits>();

  const _ref = ref<HTMLButtonElement>();

  const slots = defineSlots();

  const ctx = inject(BUTTON_GROUP_CTX_KEY, void 0);

  const iconStyle = computed(() => ({
    marginRight: slots.default ? '6px' : '0px',
  }));

  const size = computed(() => ctx?.size ?? props?.size ?? '');
  const type = computed(() => ctx?.type ?? props?.type ?? '');
  const disabled = computed(() => ctx?.disabled || props?.disabled || false);

  const handleBtnClick = (e: MouseEvent) => {
    emit('click', e);
  };

  const handleBtnClickThrottleled = throttle(
    handleBtnClick,
    props.throttleDuration
  );

  defineExpose<ButtonInstance>({
    ref: _ref,
    disabled,
    size,
    type,
  });
</script>

<template>
  <component
    ref="_ref"
    class="aka-button"
    :is="tag"
    :autofocus="autofocus"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="disabled || loading ? true : void 0"
    :class="{
      [`aka-button--${type}`]: type,
      [`aka-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-disabled': disabled,
      'is-circle': circle,
      'is-loading': loading,
    }"
    @click="
      (e: MouseEvent) =>
        useThrottle ? handleBtnClickThrottleled(e) : handleBtnClick(e)
    "
  >
    <template v-if="loading">
      <slot name="loading">
        <aka-icon
          class="loading-icon"
          :icon="loadingIcon ?? 'spinner'"
          :style="iconStyle"
          size="1x"
          spin
        />
      </slot>
    </template>
    <aka-icon
      v-if="icon && !loading"
      :icon="icon"
      :style="iconStyle"
      size="1x"
    />
    <slot></slot>
  </component>
</template>

<style scoped>
  @import './style.css';
</style>
