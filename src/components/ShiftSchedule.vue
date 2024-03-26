<template>
  <div class="tabs">
    <!-- Кнопки для переключения недель -->
    <button @click="prevWeek">&lt; Предыдущая неделя</button>
    <span>{{ formattedStartDate }} - {{ formattedEndDate }}</span>
    <button @click="nextWeek">Следующая неделя &gt;</button>
  </div>
  <div class="schedule">
    <!-- Таблица расписания смен -->
    <table>
      <thead>
      <tr>
        <th></th>
        <th v-for="(day, index) in currentWeekDates" :key="index">{{ formatDateHeader(day) }} {{ daysOfWeek[index] }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(worker) in workers" :key="worker.id">
        <td>{{ worker.name }}</td><td v-for="(day, dayIndex) in currentWeekDates" :key="dayIndex" :class="{ 'table-shift': isShiftScheduled(worker.id, day) }">
        <div v-if="isShiftScheduled(worker.id, day)">
          <button class="shift-button" :key="getShiftInfo(worker.id, day).id">
            {{ formatShiftTime(getShiftInfo(worker.id, day).startTime) }} - {{ formatShiftTime(getShiftInfo(worker.id, day).endTime) }}
          </button>
        </div>
        <div v-else class="shift-add-button-container">
          <button class="shift-add-button" @click="addShiftButtonHandler(worker, day)">Добавить смену</button>
        </div>
      </td>
      </tr>
      </tbody>
    </table>
  </div>
  <add-shift-modal v-if="showAddShiftModal" :date="activeDate" :worker="activeWorker" @close="showAddShiftModal = false" @add="addShift"></add-shift-modal>
</template>

<script>
import AddShiftModal from "/src/components/Modals/AddShiftModal.vue"
import api from "@/utils/api"
export default {
  components: {
    AddShiftModal
  },
  data() {
    return {
      currentDate: new Date(), // Текущая дата
      weekStartDate: null, // Начальная дата текущей недели
      weekEndDate: null, // Конечная дата текущей недели
      daysOfWeek: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'], // Дни недели
      workers: [],
      activeWorker: null,
      showAddShiftModal: false,
      activeDate: '2024-03-15', // Дата смены
      loadedWeeks: [],
    };
  },
  computed: {
    // Генерация массива дат текущей недели
    currentWeekDates() {
      const dates = [];
      const currentDate = new Date(this.weekStartDate);
      for (let i = 0; i < 7; i++) {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + i);
        dates.push(newDate.toISOString().split('T')[0]);
      }
      return dates;
    },
    // Форматирование начальной и конечной дат текущей недели
    formattedStartDate() {
      return this.formatDateHeader(this.weekStartDate);
    },
    formattedEndDate() {
      return this.formatDateHeader(this.weekEndDate);
    }
  },
  mounted() {
    this.calculateWeekRange();
    this.fetchWorkers();
    this.loadedWeeks.push(this.formatShortDate(this.weekStartDate));
  },
  methods: {
    async fetchWorkers(){
      try {
        const response = await api.get('api/workers/get');
        this.workers = response.data;
        for (const worker of this.workers){
          worker.shifts = [];
        }
        await this.fetchShiftsForWorkers();
      } catch (error) {
        console.error('Ошибка при загрузке рабочих:', error);
      }
    },
    async fetchShiftsForWorkers() {
      try {
        for (const worker of this.workers) {
          console.log(this.weekStartDate.toISOString() + " " + this.weekEndDate.toISOString())
          const response = await api.get(`api/workers/shifts/by-worker-id?workerId=${worker.id}&startTime=${this.weekStartDate.toISOString()}&endTime=${this.weekEndDate.toISOString()}`);
          worker.shifts.push(...response.data);
        }
      } catch (error) {
        console.error('Ошибка при загрузке смен для работников:', error);
      }
    },
    // Проверка наличия смены у сотрудника в указанный день
    getShiftInfo(workerId, day) {
      const worker = this.workers.find(worker => worker.id === workerId);
      if (!worker || !worker.shifts) return null;
      const formattedDay = this.formatShortDate(day);
      return worker.shifts.find(shift => this.formatShortDate(shift.startTime) === formattedDay);
    },

    // Переключение на предыдущую неделю
    async prevWeek() {
      this.currentDate.setDate(this.currentDate.getDate() - 7);
      this.calculateWeekRange();
      if (!this.loadedWeeks.includes(this.formatShortDate(this.weekStartDate))) {
        console.log("Загружена неделя")// Проверка, были ли данные для текущей недели уже загружены
        await this.fetchShiftsForWorkers(); // Вызов метода при переключении на предыдущую неделю
        this.loadedWeeks.push(this.formatShortDate(this.weekStartDate));
        console.log(this.loadedWeeks)// Добавление текущей даты начала недели в массив загруженных недель
      }
    },
    // Переключение на следующую неделю
    async nextWeek() {
      this.currentDate.setDate(this.currentDate.getDate() + 7);
      this.calculateWeekRange();
      if (!this.loadedWeeks.includes(this.formatShortDate(this.weekStartDate))) {
        console.log("Загружена недея")
        console.log(this.loadedWeeks)// Проверка, были ли данные для текущей недели уже загружены
        await this.fetchShiftsForWorkers(); // Вызов метода при переключении на следующую неделю
        this.loadedWeeks.push(this.formatShortDate(this.weekStartDate));
        console.log(this.loadedWeeks)// Добавление текущей даты начала недели в массив загруженных недель
      }
    },
    // Расчет начальной и конечной дат текущей недели
    calculateWeekRange() {
      const currentWeekDay = this.currentDate.getDay();
      this.weekStartDate = new Date(this.currentDate);
      this.weekStartDate.setDate(this.weekStartDate.getDate() - currentWeekDay + (currentWeekDay === 0 ? -6 : 1));
      this.weekEndDate = new Date(this.weekStartDate);
      this.weekEndDate.setDate(this.weekEndDate.getDate() + 6);
    },
    // Проверка наличия смены у сотрудника в указанный день
    isShiftScheduled(workerId, day) {
      const worker = this.workers.find(worker => worker.id === workerId);
      if (!worker || !worker.shifts) return false;
      const formattedDay = this.formatShortDate(day);
      return !!worker.shifts.find(shift => this.formatShortDate(shift.startTime) === formattedDay);
    },
    // Форматирование даты для отображения
    formatDateHeader(date) {
      const options = { day: '2-digit', month: 'short' };
      return new Date(date).toLocaleDateString('ru-RU', options);
    },
    formatShortDate(date){
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(date).toLocaleDateString('ru-RU', options)
    },
    formatShiftTime(date){
      const options = { hour: '2-digit', minute: '2-digit'  };
      return new Date(date).toLocaleTimeString('ru-RU', options);
    },
    addShift(shift){
      const worker = this.workers.find(work => work.id === shift.workerId);
      if (!worker) {
        console.error(`Работник с id ${shift.workerId} не найдена.`);
        this.showAddShiftModal = false;
        return;
      }

      this.showAddShiftModal = false;
      api.post(`api/workers/shifts/add`, {
        workerId: worker.id,// Используем полученный carId
        startTime: shift.startTime,
        endTime: shift.endTime,
        payoutKoef: shift.payoutKoef
      }).then(response => {
        // После успешного добавления автомобиля на сервер получаем carId из ответа
        const shiftId = response.data.shiftId;
        // Добавляем новую услугу в массив category.services
        worker.shifts.push({
          id: shiftId,
          workerId: worker.id,// Используем полученный carId
          startTime: shift.startTime,
          endTime: shift.endTime,
          payoutKoef: shift.payoutKoef
        });
        // Закрываем модальное окно после добавления автомобиля
        this.showAddShiftModal = false;
      }).catch(error => {
        console.error('Ошибка при добавлении смены:', error);
      });
    },
    addShiftButtonHandler(worker, day){
      this.activeWorker = worker;
      console.log(worker)
      this.activeDate = day
      this.showAddShiftModal = true;
    }
  }
};
</script>

<style scoped>

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

.tabs span {
  margin: 0 10px;
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

.shift-button {
  width: 100%;
  height: 100%;
  background-color: #4ca2ff;
  padding: 10px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.table-shift {
}

.shift-add-button-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.shift-add-button {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: lightgray;
  border: none;
  border-radius: 5px;
  padding: 10px;
  color: black;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.shift-add-button-container:hover .shift-add-button {
  opacity: 1;
}

</style>