<script setup lang="ts">
  import { ref, provide, watch, watchEffect } from 'vue';
  import type { CollapseProps, CollapseEmits, CollapseItemName } from './types';
  import { COLLAPSE_CTX_KEY } from './constant';
  import { debugWarn } from '@aka-element/utils';

  const COMPONENT_NAME = 'AkaCollapse' as const;
  defineOptions({
    name: COMPONENT_NAME,
  });
  const props = withDefaults(defineProps<CollapseProps>(), {
    accordion: false,
  });

  const emits = defineEmits<CollapseEmits>();

  const activeNames = ref(props.modelValue);

  const handleItemClick = (item: CollapseItemName) => {
    let _activeNames = [...activeNames.value];
    if (props.accordion) {
      _activeNames = [_activeNames[0] === item ? '' : item];
      updateActiveNames(_activeNames);
      return;
    } else {
      const index = _activeNames.indexOf(item);
      if (index > -1) {
        _activeNames.splice(index, 1);
      } else {
        _activeNames.push(item);
      }
    }
    updateActiveNames(_activeNames);
  };

  const updateActiveNames = (newNames: CollapseItemName[]) => {
    activeNames.value = newNames;
    emits('update:modelValue', newNames);
    emits('change', newNames);
  };

  watchEffect(() => {
    if (props.accordion && activeNames.value.length > 1) {
      debugWarn(
        COMPONENT_NAME,
        'accordion mode only support one active name at a time'
      );
    }
  });

  watch(
    () => props.modelValue,
    (newNames) => updateActiveNames(newNames)
  );

  provide(COLLAPSE_CTX_KEY, {
    activeNames,
    handleItemClick,
  });
</script>

<template>
  <div class="aka-collapse" :class="{ 'aka-collapse--accordion': accordion }">
    <slot></slot>
  </div>
</template>

<style scoped>
  @import './style.css';
</style>
