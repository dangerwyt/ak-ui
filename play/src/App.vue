<script setup lang="ts">
  import {
    AkaButton,
    AkaPopconfirm,
    AkaDropdown,
    type DropdownItemProps,
  } from 'aka-element';

  const handleConfirm = () => {
    console.log('confirm');
  };
  const handleCancel = () => {
    console.log('cancel');
  };

  const handleItemClick = (command: string) => {
    console.log(`click ${command}`);
  };

  const triggerClick = () => {
    console.log('trigger click');
  };

  const items: DropdownItemProps[] = [
    { command: 'item1', label: 'item1' },
    { command: 'item2', label: 'item2', disabled: false },
    { command: 'item3', label: 'item3' },
  ];
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

  <aka-dropdown
    content="dropdown"
    trigger="click"
    :items="items"
    type="primary"
    split-button
    effect="light"
    @click="triggerClick"
    @command="handleItemClick"
  >
    click
  </aka-dropdown>
</template>
