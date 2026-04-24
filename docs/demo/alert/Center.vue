<template>
  <div>
    <aka-alert type="success" title="这是一条成功提示" center />
    <aka-alert type="info" title="这是一条信息提示" center />
    <aka-alert type="warning" title="这是一条警告提示" center />
    <aka-alert type="danger" title="这是一条危险提示" center />
  </div>
</template>

<style scoped>
  .aka-alert {
    margin: 20px 0 0;
  }
  .aka-alert:first-child {
    margin: 0;
  }
</style>
