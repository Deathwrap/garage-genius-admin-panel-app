<template>
  <div class="sidebar">
    <!-- Логотип и название автосервиса -->
    <div class="sidebar-header">
      <div class="inline-sidebar-header-title">
        <img src="../assets/img_1.png" alt="Логотип">
        <h2 class="sidebar-title">Форсаж</h2>
      </div>
      <h2 class="sidebar-title">Админ Панель</h2>
    </div>

    <!-- Навигационные ссылки -->
    <div class="sidebar-menu">
      <ul>
        <li><router-link to="/clients">Клиенты</router-link></li>
        <li><router-link to="/orders">Заказы</router-link></li>
        <li><router-link to="/employees">Работники</router-link></li>
        <li><router-link to="/notifications">Уведомления</router-link></li>
        <li><router-link to="/services">Услуги</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
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
}

.inline-sidebar-header-title{
  display: inline-flex;
}
.sidebar-header img {
  width: 50px;
  height: 50px;
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
}

.sidebar-menu ul li a:hover {
  color: #007bff;
}
</style>
