<template>
  <p>Basic text button</p>
  <div class="demo-group">
    <aka-button v-for="item in buttons" :key="item.type" :type="item.type" text>
      {{ item.text }}
    </aka-button>
  </div>
  <p>Background color always on</p>
  <div class="demo-group">
    <aka-button
      v-for="item in buttons"
      :key="item.type"
      :type="item.type"
      text
      bg
    >
      {{ item.text }}
    </aka-button>
    <p>Disabled text button</p>
    <div class="demo-group">
      <aka-button
        v-for="item in buttons"
        :key="item.type"
        :type="item.type"
        text
        disabled
      >
        {{ item.text }}
      </aka-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  const buttons = [
    { type: 'primary', text: 'primary' },
    { type: 'success', text: 'success' },
    { type: 'info', text: 'info' },
    { type: 'warning', text: 'warning' },
    { type: 'danger', text: 'danger' },
  ];
</script>

<style scoped>
  p {
    font-size: 1rem;
  }
  .demo-group {
    margin-bottom: 1rem;
  }
</style>
