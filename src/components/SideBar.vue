<template>
  <div class="sidebar">
    <!-- Логотип и название автосервиса -->
    <router-link
        to="/dashboard"
        class="sidebar-header"
        @mouseenter="hoverHeader = true"
        @mouseleave="hoverHeader = false"
        @click="activeHeader = true"
        :style="{ backgroundColor: hoverHeader || activeHeader ? '#e0e0e0' : '#f0f0f0', color: hoverHeader || activeHeader ? 'black' : '#333' }"
    >
      <div class="inline-sidebar-header-title">
        <img src="../assets/img_1.png" alt="Логотип">
        <h2 class="sidebar-title">Форсаж</h2>
      </div>
      <h2 class="sidebar-title">Админ Панель</h2>
    </router-link>

    <!-- Навигационные ссылки -->
    <div class="sidebar-menu">
      <ul>
        <li :class="{ 'active-tab': $route.path === '/clients' }"><router-link to="/clients">Клиенты</router-link></li>
        <li :class="{ 'active-tab': $route.path === '/orders' }"><router-link to="/orders">Заказы</router-link></li>
        <li :class="{ 'active-tab': $route.path === '/employees' }"><router-link to="/employees">Работники</router-link></li>
        <li :class="{ 'active-tab': $route.path === '/notifications' }"><router-link to="/notifications">Уведомления</router-link></li>
        <li :class="{ 'active-tab': $route.path === '/services' }"><router-link to="/services">Услуги</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      hoverHeader: false,
      activeHeader: false
    };
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100%;
  background-color: #f0f0f0;
  padding: 20px;
  position: fixed; /* Фиксированное позиционирование */
  top: 0; /* Располагаем вверху */
  left: 0; /* Располагаем слева */
  overflow-y: auto; /* Включаем вертикальную прокрутку при необходимости */
}

.sidebar-header {
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer; /* Добавляем указатель при наведении */
}

.inline-sidebar-header-title {
  display: flex;
  align-items: center; /* Выравниваем элементы по вертикали */
}

.sidebar-header img {
  width: 50px;
  height: 50px;
  margin-right: 10px; /* Добавляем небольшой отступ между логотипом и текстом */
}

.sidebar-title {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.sidebar-menu ul {
  list-style-type: none;
  padding: 0;
}

.sidebar-menu ul li {
  margin-bottom: 10px;
}

.sidebar-menu ul li a {
  color: #333;
  text-decoration: none;
  position: relative;
}

.sidebar-menu ul li a::after { /* Добавляем псевдоэлемент для подчеркивания */
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px; /* Высота подчеркивания */
  background-color: transparent; /* Цвет подчеркивания */
  transition: background-color 0.3s; /* Переход для изменения цвета подчеркивания */
}

.sidebar-menu ul li a:hover::after {
  background-color: black; /* Цвет подчеркивания при наведении */
}

.sidebar-menu ul li.active-tab a::after {
  background-color: black; /* Цвет подчеркивания активной вкладки */
}
</style>
