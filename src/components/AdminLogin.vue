<template>
  <div class="admin-login-container">
    <div class="admin-login">
      <h2>Авторизация для администратора</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Логин:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="password">Пароль:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const { name, accessToken, refreshToken } = await axios.post(`http://localhost:5198/auth/admin/sign_in?Login=${this.username}&Password=${this.password}`);
        localStorage.setItem('userName', name);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        this.$emit('loginSuccess');
        await this.$router.push('/dashboard');
      } catch (error) {
        console.error('Ошибка при аутентификации:', error);
        // Обработка ошибок аутентификации
      }
    }
  }
}
</script>

<style scoped>
.admin-login-container {
  margin: auto;
  text-align: center;
  max-width: 400px;
}

.admin-login {
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 94%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button[type="submit"] {
  width: 40%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
