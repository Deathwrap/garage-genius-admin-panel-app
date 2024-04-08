<!-- InfoTab.vue -->
<template>
  <div>
    <div><strong>Имя:</strong> {{ worker.name }}</div>
    <div><strong>Логин:</strong> {{ worker.login }}</div>
    <div><strong>Должность:</strong> {{ worker.position }}</div>
  </div>
</template>

<script>
export default {
  props: {
    worker: {
      type: Object,
      required: true
    }
  }
}
</script>