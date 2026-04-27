<script setup lang="ts">
  import { inject, computed } from 'vue';
  import type { CollapseItemProps } from './types';
  import { COLLAPSE_CTX_KEY } from './constant';
  import AkaIcon from '../Icon/Icon.vue';
  import transitionEvents from './transitionEvent';
  defineOptions({
    name: 'AkaCollapseItem',
  });
  const props = defineProps<CollapseItemProps>();
  const ctx = inject(COLLAPSE_CTX_KEY);
  const isActive = computed(() => ctx?.activeNames.value?.includes(props.name));
  const handleClick = () => {
    if (props.disabled) {
      return;
    }
    ctx?.handleItemClick(props.name);
  };
</script>

<template>
  <div
    class="aka-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <div
      class="aka-collapse-item__header"
      :class="{ 'is-disabled': disabled, 'is-active': isActive }"
      :id="`item-header-${name}`"
      @click="handleClick"
    >
      <span class="aka-collapse-item__title">
        <slot name="title">{{ title }}</slot>
      </span>
      <AkaIcon class="header-angle" icon="angle-right" />
    </div>
    <transition name="slide" v-on="transitionEvents">
      <div class="aka-collapse-item__wrapper" v-show="isActive">
        <div class="aka-collapse-item__content" :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
  @import './style.css';
</style>
