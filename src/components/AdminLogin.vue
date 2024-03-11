<template>
  <div class="admin-login">
    <h2>Авторизация для администратора</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Логин:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
//import axios from 'axios';

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
        /*const response = await axios.post('/api/admin/login', {
          username: this.username,
          password: this.password
        });

        // Сохраняем токены в локальном хранилище
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);*/
        if (this.username === "admin" && this.password === "123"){
          console.log("Проверка")
          this.$emit('loginSuccess');
          await this.$router.push('/dashboard');
        }
        // Перенаправляем пользователя на главную страницу администратора
        } catch (error) {
        console.error('Ошибка при аутентификации:', error);
        // Обработка ошибок аутентификации
      }
    }
  }
}
</script>

<style>
.admin-login {
  /* Стили для формы входа администратора */
}
</style>