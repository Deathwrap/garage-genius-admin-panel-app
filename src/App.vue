<template>
  <div id="app">
    <!-- Если нет accessToken и refreshToken, показываем компонент аутентификации -->
    <template v-if="!isLoggedIn">
      <AdminLogin @loginSuccess="handleLoginSuccess" />
    </template>

    <!-- Если пользователь аутентифицирован, показываем основное приложение -->
    <template v-else>
      <!-- Сайдбар -->
      <Sidebar />

      <!-- Основной контент -->
      <div class="content">
        <!-- Здесь будет ваш основной контент -->
        <router-view></router-view>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Sidebar from "./components/SideBar.vue";
import AdminLogin from "./components/AdminLogin.vue";

export default {
  name: "App",
  components: {
    Sidebar,
    AdminLogin,
  },
  computed: {
    ...mapState(['isLoggedIn'])
  },
  mounted() {
    // Проверяем наличие accessToken и refreshToken
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // Если токены присутствуют, перенаправляем пользователя на главную страницу администратора
    if (accessToken && refreshToken) {
      this.isLoggedIn = true;
    }
  },
  methods: {
    ...mapMutations(['setLogin']),
    // Обработчик успешной аутентификации
    handleLoginSuccess() {

      console.log("handleLoginSuccess")
      this.setLogin();// Устанавливаем флаг аутентификации в true
    },
  },
};
</script>

<style scoped>
#app {
  display: flex;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.content {
  text-align: center;
  flex: 1;
  overflow-y: auto;
  padding-left: 40px; /* Ширина сайдбара */
  margin-left: 250px;
}
</style>
