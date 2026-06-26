<script setup lang="ts">
  import { inject, computed } from 'vue';
  import type { DropdownItemProps } from './types';
  import { DROPDOWN_CONTEXT_KEY } from './constant';

  import { useId } from '@aka-element/hooks';

  defineOptions({
    name: 'AkaDropdownItem',
  });

  const props = withDefaults(defineProps<DropdownItemProps>(), {
    disabled: false,
    divided: false,
    command: useId().value,
  });

  const ctx = inject(DROPDOWN_CONTEXT_KEY);
  const size = computed(() => ctx?.size.value);

  const handleClick = () => {
    if (props.disabled) {
      return;
    }
    ctx?.handleItemClick(props);
  };
</script>

<template>
  <li v-if="divided" class="divided-placeholder" role="separator"></li>
  <li
    class="aka-dropdown__item"
    :id="`dropdown-item-${command ?? useId().value}`"
    :class="{
      ['aka-dropdown__item--' + size]: size,
      'is-disabled': disabled,
      'is-divided': divided,
    }"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </li>
</template>

<style scoped>
  @import './style.css';
</style>
