<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { addUtils } from '@aka-element/utils';
  import type { PopconfirmProps, PopconfirmEmits } from './types';
  import type { TooltipInstance } from '../Tooltip';

  import AkaTooltip from '../Tooltip/Tooltip.vue';
  import AkaButton from '../Button/Button.vue';
  import AkaIcon from '../Icon/Icon.vue';

  defineOptions({
    name: 'AkaPopconfirm',
  });

  const props = withDefaults(defineProps<PopconfirmProps>(), {
    title: '',
    confirmButtonType: 'primary',
    confirmButtonText: 'yes',
    cancelButtonText: 'no',
    icon: 'question-circle',
    iconColor: '#ff9900',
    hideAfter: 200,
    width: 150,
  });

  const emits = defineEmits<PopconfirmEmits>();

  const tooltipRef = ref<TooltipInstance>();

  const style = computed(() => ({
    width: addUtils(props.width),
  }));

  const hidePopper = () => {
    tooltipRef.value?.hide();
  };

  const handleCancel = (e: MouseEvent) => {
    emits('cancel', e);
    hidePopper();
  };

  const handleConfirm = (e: MouseEvent) => {
    emits('confirm', e);
    hidePopper();
  };
</script>

<template>
  <aka-tooltip ref="tooltipRef" trigger="click" :hide-timeout="hideAfter">
    <template #content>
      <div class="aka-popconfirm" :style="style">
        <div class="aka-popconfirm__main">
          <aka-icon v-if="!hideIcon && icon" :icon="icon" :color="iconColor" />
          {{ title }}
        </div>
        <div class="aka-popconfirm__action">
          <aka-button
            :type="cancelButtonType"
            size="small"
            @click="handleCancel"
          >
            {{ cancelButtonText }}
          </aka-button>
          <aka-button
            :type="confirmButtonType"
            size="small"
            @click="handleConfirm"
          >
            {{ confirmButtonText }}
          </aka-button>
        </div>
      </div>
    </template>
    <template v-if="$slots.default" #default>
      <slot name="default"></slot>
    </template>

    <template v-if="$slots.reference" #reference>
      <slot name="reference"></slot>
    </template>
  </aka-tooltip>
</template>

<style scoped>
  @import './style.css';
</style>
