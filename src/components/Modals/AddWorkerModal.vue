<template>
  <div class="modal">
    <div class="modal-content">
      <h3>Добавить работника</h3>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Имя:</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div class="form-group">
          <label for="login">Логин:</label>
          <input type="text" id="login" v-model="login" required>
        </div>
        <div class="form-group">
          <label for="password">Пароль:</label>
          <div class="password-input">
            <input type="text" id="password" v-model="password" required>
            <button type="button" @click="generatePassword">Сгенерировать</button>
          </div>
          <p class="password-warning">Пароль будет сгенерирован случайным образом и будет недоступен для просмотра после сохранения.</p>
        </div>
        <div class="form-group">
          <label for="position">Должность:</label>
          <select id="position" v-model="positionId" required>
            <option v-for="position in positions" :value="position.id" :key="position.id">{{ position.name }}</option>
          </select>
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
import api from "@/utils/api";

export default {
  name: 'AddWorkerModal',
  data() {
    return {
      name: '',
      login: '',
      password: '',
      positionId: null,
      positions: []
    };
  },
  mounted() {
    this.fetchPositions();
  },
  methods: {
    async fetchPositions() {
      try {
        const response = await api.get('http://localhost:5198/api/workers/positions');
        this.positions = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке списка должностей:', error);
      }
    },
    handleSubmit() {
      const newWorker = {
        name: this.name,
        login: this.login,
        password: this.password,
        positionId: this.positionId
      };
      this.$emit('add', newWorker);
      this.resetForm();
    },
    cancel() {
      this.resetForm();
      this.$emit('close');
    },
    resetForm() {
      this.name = '';
      this.login = '';
      this.password = '';
      this.positionId = null;
    },
    generatePassword() {
      const length = 10;
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let newPassword = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        newPassword += charset[randomIndex];
      }
      this.password = newPassword;
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

input[type="text"],
input[type="password"],
select {
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

button[type="button"]:focus {
  outline: none;
}

.password-input {
  display: flex;
  align-items: center;
}

.password-input input[type="text"] {
  flex: 1;
}

.password-input button[type="button"] {
  margin-left: 10px;
}

.password-warning {
  color: #888;
  font-size: 0.8em;
  margin-top: 5px;
}
</style>
