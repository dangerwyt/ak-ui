<template>
  <div class="demo-group">
    <aka-button v-for="item in buttons" :key="item.type" :type="item.type">
      {{ item.text }}
    </aka-button>
  </div>
  <div class="demo-group">
    <aka-button
      v-for="item in buttons"
      :key="item.type"
      :type="item.type"
      plain
    >
      {{ item.text }}
    </aka-button>
  </div>
  <div class="demo-group">
    <aka-button
      v-for="item in buttons"
      :key="item.type"
      :type="item.type"
      round
    >
      {{ item.text }}
    </aka-button>
  </div>
  <div class="demo-group">
    <aka-button
      v-for="item in buttons"
      :key="item.type"
      :type="item.type"
      :icon="item.icon"
      circle
    ></aka-button>
  </div>
</template>

<script setup lang="ts">
  const buttons = [
    { type: 'primary', text: 'primary', icon: 'edit' },
    { type: 'success', text: 'success', icon: 'check' },
    { type: 'info', text: 'info', icon: 'info' },
    { type: 'warning', text: 'warning', icon: 'warning' },
    { type: 'danger', text: 'danger', icon: 'trash' },
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
