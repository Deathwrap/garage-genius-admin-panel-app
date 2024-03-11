<template>
  <div class="admin-dashboard">
    <h1>Административная панель</h1>

    <!-- Фейковые графики -->
    <div class="charts">
      <div class="chart">
        <h2>График 1</h2>
        <img src="https://via.placeholder.com/400x200" alt="График 1">
      </div>
      <div class="chart">
        <h2>График 2</h2>
        <img src="https://via.placeholder.com/400x200" alt="График 2">
      </div>
    </div>

    <!-- Фейковые таблицы -->
    <div class="tables">
      <div class="table">
        <h2>Таблица 1</h2>
        <table>
          <thead>
          <tr>
            <th>Заголовок 1</th>
            <th>Заголовок 2</th>
            <th>Заголовок 3</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Данные 1</td>
            <td>Данные 2</td>
            <td>Данные 3</td>
          </tr>
          <tr>
            <td>Данные 4</td>
            <td>Данные 5</td>
            <td>Данные 6</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="table">
        <h2>Таблица 2</h2>
        <table>
          <thead>
          <tr>
            <th>Заголовок 1</th>
            <th>Заголовок 2</th>
            <th>Заголовок 3</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Данные 1</td>
            <td>Данные 2</td>
            <td>Данные 3</td>
          </tr>
          <tr>
            <td>Данные 4</td>
            <td>Данные 5</td>
            <td>Данные 6</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
};
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
}

.charts {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.chart {
  flex: 1;
  margin-right: 20px;
}

.tables {
  display: flex;
  justify-content: space-between;
}

.table {
  flex: 1;
  margin-right: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
</style>
