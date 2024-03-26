<!-- SkillsTab.vue -->
<template>
  <div>
    <h3>Навыки работника</h3>
    <ul>
      <li v-for="category in categories" :key="category.id">{{ category.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    workerId: {
      type: Number,
      required: true
    }
  }
}
</script>