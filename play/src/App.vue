<script setup lang="ts">
  import { AkaButton, AkaPopconfirm } from 'aka-element';

  const handleConfirm = () => {
    console.log('confirm');
  };
  const handleCancel = () => {
    console.log('cancel');
  };
</script>

<template>
  <aka-popconfirm
    title="Are you sure?"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <template #reference>
      <aka-button type="primary" size="small">reference</aka-button>
    </template>
  </aka-popconfirm>
</template>
