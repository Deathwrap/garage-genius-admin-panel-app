<template>
  <div>
    <h1>Управление сотрудниками</h1>
    <div class="tabs">
      <!-- Вкладки -->
      <button :class="{ 'active-tab': activeTab === 'schedule' }" @click="activeTab = 'schedule'">Расписание смен</button>
      <button :class="{ 'active-tab': activeTab === 'employees' }" @click="activeTab = 'employees'">Список сотрудников</button>
    </div>
    <!-- Вкладка "Расписание смен" -->
    <shift-schedule v-if="activeTab === 'schedule'"></shift-schedule>
    <!-- Вкладка "Список сотрудников" -->
    <employees-list-component v-else-if="activeTab === 'employees'"></employees-list-component>
  </div>
</template>

<script>
import ShiftSchedule from "@/components/ShiftSchedule.vue";
import EmployeesListComponent from "@/components/EmployeesListComponent.vue";

export default {
  components: {
    EmployeesListComponent,
    ShiftSchedule,
  },
  data() {
    return {
      activeTab: 'schedule', // Активная вкладка по умолчанию
    };
  },
};
</script>

<style scoped>
.tabs {
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.3s, color 0.3s; /* Добавлен переход для изменения цвета текста */
  position: relative;
  margin-right: 10px; /* Расстояние между вкладками */
  font-size: 18px; /* Размер текста */
  font-weight: bold; /* Жирный стиль */
}

.tabs button::after { /* Добавляем псевдоэлемент для подчеркивания */
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px; /* Высота подчеркивания */
  background-color: #ccc; /* Цвет подчеркивания неактивной вкладки */
  transition: background-color 0.3s; /* Переход для изменения цвета подчеркивания */
}

.tabs button:hover::after {
  background-color: #007bff; /* Цвет подчеркивания при наведении */
}

.tabs button.active-tab::after {
  background-color: #007bff; /* Цвет подчеркивания активной вкладки */
}
</style>
