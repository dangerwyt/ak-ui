<template>
  <div>
    <aka-alert type="success" effect="dark" title="这是一条成功提示" />
    <aka-alert type="info" effect="dark" title="这是一条信息提示" />
    <aka-alert type="warning" effect="dark" title="这是一条警告提示" />
    <aka-alert type="danger" effect="dark" title="这是一条危险提示" />
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
