<script setup lang="ts">
  import { ref, computed, provide } from 'vue';
  import { omit, isNil } from 'lodash-es';
  import type {
    DropdownProps,
    DropdownItemProps,
    DropdownEmits,
    DropdownContext,
    DropdownInstance,
  } from './types';
  import type { TooltipInstance } from '../Tooltip/types';
  import { type ButtonInstance, AkaButton, AkaButtonGroup } from '../Button';

  import { DROPDOWN_CONTEXT_KEY } from './constant';

  import AkaDropdownItem from './DropdownItem.vue';
  import AkaTooltip from '../Tooltip/Tooltip.vue';
  defineOptions({
    name: 'AkaDropdown',
    inheritAttrs: false,
  });

  const props = withDefaults(defineProps<DropdownProps>(), {
    hideOnClick: true,
    items: () => [] as DropdownItemProps[],
  });

  const emits = defineEmits<DropdownEmits>();
  const slots = defineSlots();

  const tooltipRef = ref<TooltipInstance>();
  const triggerRef = ref<ButtonInstance>();

  const tooltipProps = computed(() =>
    omit(props, ['items', 'hideOnClick', 'type', 'size', 'splitButton'])
  );

  const handleItemClick = (e: DropdownItemProps) => {
    props.hideOnClick && tooltipRef.value?.hide();
    !isNil(e.command) && emits('command', e.command);
  };

  provide<DropdownContext>(DROPDOWN_CONTEXT_KEY, {
    handleItemClick,
    size: computed(() => props.size),
  });

  defineExpose<DropdownInstance>({
    open: () => tooltipRef.value?.show(),
    close: () => tooltipRef.value?.hide(),
  });
</script>

<template>
  <div class="aka-dropdown" :class="{ 'is-disabled': props.disabled }">
    <aka-tooltip
      ref="tooltipRef"
      v-bind="tooltipProps"
      :virtual-triggering="splitButton"
      :virtual-ref="triggerRef"
      @visible-change="$emit('visible-change', $event)"
    >
      <aka-button-group
        v-if="splitButton"
        :type="type"
        :size="size"
        :disabled="disabled"
      >
        <aka-button @click="$emit('click', $event)">
          <slot name="default"></slot>
        </aka-button>
        <aka-button ref="triggerRef" icon="angle-down"></aka-button>
      </aka-button-group>
      <slot v-else name="default"></slot>
      <template #content>
        <div class="aka-dropdown__menu">
          <slot name="dropdown">
            <template v-for="item in items" :key="item.command">
              <aka-dropdown-item v-bind="item" />
            </template>
          </slot>
        </div>
      </template>
    </aka-tooltip>
  </div>
</template>

<style scoped>
  @import './style.css';
  :deep(.aka-button-group) {
    & > :last-child {
      padding: 5px 7px;
    }
  }
</style>
