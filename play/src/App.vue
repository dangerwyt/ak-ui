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
    <aka-button type="primary" size="small">test</aka-button>
  </aka-popconfirm>
</template>
