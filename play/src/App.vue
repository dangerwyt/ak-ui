<script setup lang="ts"></script>

<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 40px;
    "
  >
    <aka-alert type="success" title="success" />
    <aka-alert type="info" title="info" />
    <aka-alert type="warning" title="warning" />
    <aka-alert type="danger" title="danger" />
  </div>
  <div
    style="
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 40px;
    "
  >
    <aka-alert type="success" title="success" effect="dark" />
    <aka-alert type="info" title="info" effect="dark" />
    <aka-alert type="warning" title="warning" effect="dark" />
    <aka-alert type="danger" title="danger" effect="dark" />
  </div>

  <div
    style="
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 40px;
    "
  >
    <aka-alert type="success" title="success" center show-icon />
    <aka-alert type="info" title="info" center show-icon />
    <aka-alert type="warning" title="warning" center show-icon />
    <aka-alert type="danger" title="danger" center show-icon />
  </div>

  <div
    style="
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 40px;
    "
  >
    <aka-alert
      type="success"
      title="success"
      description="more text description"
      show-icon
    />
    <aka-alert
      type="info"
      title="info"
      description="more text description"
      show-icon
    />
    <aka-alert
      type="warning"
      title="warning"
      description="more text description"
      show-icon
    />
    <aka-alert
      type="danger"
      title="danger"
      description="more text description"
      show-icon
      :closeable="false"
    />
  </div>
</template>
