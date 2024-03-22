<template>
  <div class="modal">
    <div class="modal-content">
      <h3>Добавить смену</h3>
      <h4>Работник: {{worker.name}}</h4>
      <h4>Дата: {{date}}</h4>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="startTime">Время начала:</label>
          <input type="time" id="startTime" v-model="startTime" required>
        </div>
        <div class="form-group">
          <label for="endTime">Время окончания:</label>
          <input type="time" id="endTime" v-model="endTime" required>
        </div>
        <div class="form-group">
          <label for="hourlyRate">Коэффициент оплаты:</label>
          <input type="number" id="hourlyRate" v-model="hourlyRate" required>
        </div>
        <div class="buttons">
          <button type="button" @click="cancel">Отмена</button>
          <button type="submit">Добавить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddShiftModal',
  props: {
    worker: {
      type: Object,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      startTime: '',
      endTime: '',
      hourlyRate: 1 // Коэффициент оплаты по умолчанию
    };
  },
  methods: {
    handleSubmit() {

      const fullStartDate = new Date(`${this.date}T${this.startTime}`);
      const fullEndDate = new Date(`${this.date}T${this.endTime}`);

      // Преобразование дат в формат UTC и получение строкового представления
      const startTimeUtc = fullStartDate.toISOString();
      const endTimeUtc = fullEndDate.toISOString();

      // Создание нового объекта смены
      const newShift = {
        workerId: this.worker.id,
        startTime: startTimeUtc,
        endTime: endTimeUtc,
        payoutKoef: this.hourlyRate
      };
      this.$emit('add', newShift);
      this.resetForm();
    },
    cancel() {
      this.resetForm();
      this.$emit('close');
    },
    resetForm() {
      this.startTime = '';
      this.endTime = '';
      this.hourlyRate = 1;
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

input[type="time"],
input[type="number"] {
  width: calc(100% - 20px);
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

button[type="submit"],
button[type="button"] {
  width: 48%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"] {
  background-color: #007bff;
  color: #fff;
}

button[type="button"] {
  background-color: #dc3545;
  color: #fff;
}

button[type="submit"]:hover,
button[type="button"]:hover {
  opacity: 0.8;
}
</style>
