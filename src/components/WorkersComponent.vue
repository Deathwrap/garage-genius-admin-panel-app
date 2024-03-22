<template>
  <h1>Управление сотрудниками</h1>
  <div class="workers">
    <div class="tabs">
      <!-- Вкладки -->
      <button :class="{ 'active-tab': activeTab === 'schedule' }" @click="activeTab = 'schedule'">Расписание смен</button>
      <span class="tab-spacer"></span> <!-- Расстояние между кнопками -->
      <button :class="{ 'active-tab': activeTab === 'employees' }" @click="activeTab = 'employees'">Список сотрудников</button>
    </div>
    <!-- Вкладка "Расписание смен" -->
    <shift-schedule v-if="activeTab === 'schedule'"></shift-schedule>
    <!-- Вкладка "Список сотрудников" -->
    <employees-component v-else-if="activeTab === 'employees'"></employees-component>
  </div>
</template>

<script>
import ShiftSchedule from "@/components/ShiftSchedule.vue";
import EmployeesComponent from "@/components/EmployeesComponent.vue";
export default {
  components: {
    ShiftSchedule,
    EmployeesComponent
  },
  data() {
    return {
      activeTab: 'schedule', // Активная вкладка по умолчанию
    };
  },
};
</script>

<style scoped>
.workers {
  padding: 20px;
}

.tabs {
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #f0f0f0;
  transition: background-color 0.3s;
}

.tabs button:hover {
  background-color: #e0e0e0;
}

.tabs button.active-tab {
  background-color: #e0e0e0;
}

.tab-spacer {
  margin: 0 10px; /* Расстояние между кнопками */
}
</style>
