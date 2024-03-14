<template>
  <div class="workers">
    <div class="tabs">
      <!-- Вкладки -->
      <button :class="{ activeTab: activeTab === 'schedule' }" @click="activeTab = 'schedule'">Расписание смен</button>
      <button :class="{ activeTab: activeTab === 'employees' }" @click="activeTab = 'employees'">Список сотрудников</button>
    </div>

    <!-- Вкладка "Расписание смен" -->
    <div v-if="activeTab === 'schedule'">
      <div class="schedule">
        <!-- Таблица расписания смен -->
        <table>
          <thead>
          <tr>
            <th></th>
            <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(worker) in workers" :key="worker.id">
            <td>{{ worker.name }}</td>
            <td v-for="day in daysOfWeek" :key="day">
              <span v-if="isShiftScheduled(worker.id, day)">Смена</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Вкладка "Список сотрудников" -->
    <div v-else-if="activeTab === 'employees'">
      <div class="employees">
        <!-- Список сотрудников -->
        <ul>
          <li v-for="worker in workers" :key="worker.id">{{ worker.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'schedule', // Активная вкладка по умолчанию
      daysOfWeek: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'], // Дни недели
      workers: [ // Пример данных о сотрудниках и их сменах
        { id: 1, name: 'Иван', shifts: ['2024-03-04', '2024-03-06'] },
        { id: 2, name: 'Мария', shifts: ['2024-03-03', '2024-03-05', '2024-03-07'] },
        { id: 3, name: 'Петр', shifts: ['2024-03-04', '2024-03-05', '2024-03-06'] },
        // Добавьте здесь остальных сотрудников и их смены
      ]
    };
  },
  methods: {
    isShiftScheduled(workerId, day) {
      const worker = this.workers.find(worker => worker.id === workerId);
      if (!worker) return false;
      const formattedDay = this.formatDate(day);
      return worker.shifts.includes(formattedDay);
    },
    formatDate(date) {
      // Форматирование даты для сравнения с датами смен
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(date).toLocaleDateString('ru-RU', options);
    }
  }
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
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
}

.tabs button.activeTab {
  font-weight: bold;
}

.schedule table {
  width: 100%;
  border-collapse: collapse;
}

.schedule th,
.schedule td {
  border: 1px solid #ccc;
  padding: 8px;
}

.schedule th:first-child,
.schedule td:first-child {
  text-align: left;
}

.schedule span {
  font-weight: bold;
}

.employees ul {
  list-style-type: none;
  padding: 0;
}

.employees li {
  margin-bottom: 10px;
}
</style>

