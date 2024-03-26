<template>
  <div class="services">
    <div class="services-header">
      <h1>Управление услугами</h1>
      <!-- Троеточие для выпадающего меню -->
      <div class="dropdown">
        <button class="dropbtn" @click="showDropdownHeader = !showDropdownHeader">&#8942;</button>
        <div class="dropdown-content" v-show="showDropdownHeader">
          <a href="#" @click="showAddCategoriesModal = true; showDropdownHeader = !showDropdownHeader">Добавить категорию</a>
        </div>
      </div>
    </div>
    <!-- Категории услуг -->
    <div v-for="category in categories" :key="category.id">
      <div class="category-container">
        <h2>{{ category.name }}</h2>
          <div class="dropdown">
            <button class="dropbtn" @click="showDropdownCategory = !showDropdownCategory">&#8942;</button>
            <div class="dropdown-content" v-show="showDropdownCategory">
              <a href="#" @click="editCategory(category); showDropdownCategory = !showDropdownCategory">Изменить</a>
              <a href="#" @click="deleteCategory(category); showDropdownCategory = !showDropdownCategory">Удалить</a>
              <a href="#" @click="setActiveCategoryId(category.id); showDropdownCategory = !showDropdownCategory" >Добавить услугу</a>
            </div>
          </div>
      </div>

      <!-- Таблица с услугами -->
      <table>
        <thead>
        <tr>
          <th>Название услуги</th>
          <th>Время выполнения (ч)</th>
          <th>Стоимость (руб)</th>
          <th>Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="service in category.services" :key="service.id">
          <td>{{ service.name }}</td>
          <td>{{ service.executionTime }}</td>
          <td>{{ service.standardHourPrice }}</td>
          <!-- Кнопки для изменения и удаления услуги -->
          <td>
            <button class="edit-btn" @click="editService(category, service)">
              <img src="@/assets/pencil-square.svg" alt="Изменить" class="icon">
            </button>
            <button class="delete-btn" @click="deleteService(category, service)">
              <img src="@/assets/trash-fill.svg" alt="Удалить" class="icon">
            </button>
          </td>
        </tr>
        </tbody>
      </table>

      <!-- Кнопка для добавления новой услуги -->
      <add-category-modal v-if="showAddCategoriesModal" @add="addCategory" @close="showAddCategoriesModal = false"></add-category-modal>
      <add-service-modal v-if="showAddServiciesModal" :categoryId="activeCategoryId" @add="addService" @close="showAddServiciesModal = false"></add-service-modal>
    </div>
  </div>
</template>

<script>
import AddCategoryModal from "@/components/Modals/AddCategoryModal.vue";
import AddServiceModal from "@/components/Modals/AddServiceModal.vue";
import api from "@/utils/api";

export default {
  name: 'ServicesComponent',
  components: {AddCategoryModal, AddServiceModal},
  data() {
    return {
      categories: [],
      showAddCategoriesModal: false, // Флаг для отображения/скрытия модального окна
      showAddServiciesModal: false,
      showEditCategoriesModal: false,
      showEditServiciesModal: false,
      activeCategoryId: null,
      showDropdownHeader: false, // Флаг для отображения/скрытия выпадающего меню
      showDropdownCategory: false,
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    setActiveCategoryId(categoryId) {
      this.activeCategoryId = categoryId; // Устанавливаем активный id категории
      this.showAddServiciesModal = true; // Показываем модальное окно
    },
    async fetchCategories() {
      try {
        const response = await api.get('api/services/categories');
        this.categories = response.data;
        await this.fetchServicesForCategories();
      } catch (error) {
        console.error('Ошибка при загрузке категорий услуг:', error);
      }
    },
    async fetchServicesForCategories() {
      try {
        for (const category of this.categories) {
          const response = await api.get('api/services/by-id', {params: {
            categoryId: category.id
            }});
          category.services = response.data;
        }
      } catch (error) {
        console.error('Ошибка при загрузке услуг для категорий:', error);
      }
    },
    addCategory(newCategoryName) {
      api.post('api/services/add-category', {}, {params: {name: newCategoryName}}).then(response => {
        // После успешного добавления автомобиля на сервер получаем carId из ответа
        const categoryId = response.data.categoryId;
        // Добавляем новый автомобиль в массив this.cars
        this.categories.push({
          id: categoryId, // Используем полученный carId
          name: newCategoryName,
          services: [],
        });

        console.log(this.categories)
        // Закрываем модальное окно после добавления автомобиля
        this.showAddCategoriesModal = false;
      }).catch(error => {
        console.error('Ошибка при добавлении категории:', error);
      });
      // Логика для добавления новой категории
    },
    editCategory(category) {
      console.log(category)
      // Логика для редактирования категории
    },
    deleteCategory(category) {
      console.log(category)

      // Логика для удаления категории
    },
    addService(service) {
      const category = this.categories.find(cat => cat.id === service.categoryId);
      if (!category) {
        console.error(`Категория с id ${service.categoryId} не найдена.`);
        return;
      }
      //category.services.push(newService);

      api.post(`http://localhost:5198/api/services/add-service`, {
        categoryId: service.categoryId,// Используем полученный carId
        name: service.name,
        executionTime: service.executionTime,
        standardHourPrice: service.standardHourPrice
      }).then(response => {
        // После успешного добавления автомобиля на сервер получаем carId из ответа
        const serviceId = response.data.serviceId;
        // Добавляем новую услугу в массив category.services
        category.services.push({
          id: serviceId,
          categoryId: service.categoryId,// Используем полученный carId
          name: service.name,
          executionTime: service.executionTime,
          standardHourPrice: service.standardHourPrice
      });
        // Закрываем модальное окно после добавления автомобиля
        this.showAddCategoriesModal = false;
      }).catch(error => {
        console.error('Ошибка при добавлении услуги:', error);
      });
      this.showAddServiciesModal = false;

      // Логика для добавления новой услуги в категорию
    },
    editService(category, service) {
      console.log(category, service)

      // Логика для редактирования услуги
    },
    deleteService(category, service) {
      console.log(category, service)

      // Логика для удаления услуги
    }
  }
};
</script>

<style scoped>
.services-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: transparent;
  color: #333;
  font-size: 25px;
  border: none;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  border-radius: 8px; /* Закругление углов */
  overflow: hidden; /* Позволяет скрыть часть линий разделителей */
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  animation: fadeIn 0.5s ease; /* Анимация появления */
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown-content hr {
  margin: 6px 0; /* Расстояние между линиями разделителями */
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #ddd;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.category-buttons button {
  margin-left: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.delete-btn {
  background-color: #dc3545; /* Цвет фона для кнопки удаления */
  color: #fff; /* Цвет текста */
  border: none; /* Убираем границы */
  padding: 8px 16px; /* Отступы внутри кнопки */
  border-radius: 5px; /* Закругляем углы */
  cursor: pointer; /* Изменяем курсор при наведении */
  transition: background-color 0.3s, color 0.3s; /* Плавное изменение цвета фона и текста при наведении */
}

.edit-btn{
  background-color: #007bff; /* Цвет фона для кнопки удаления */
  color: #fff; /* Цвет текста */
  border: none; /* Убираем границы */
  padding: 8px 16px; /* Отступы внутри кнопки */
  border-radius: 5px; /* Закругляем углы */
  cursor: pointer; /* Изменяем курсор при наведении */
  transition: background-color 0.3s, color 0.3s; /* Плавное изменение цвета фона и текста при наведении */
}

.edit-btn:hover{
  background-color: #0061d3; /* Изменяем цвет фона при наведении */
}

.delete-btn:hover {
  background-color: #c82333; /* Изменяем цвет фона при наведении */
}

/* Отступы для значков внутри кнопок */
.edit-btn img, .delete-btn img {
  margin-right: 5px; /* Отступ справа */
}

/* Отступы для кнопок внутри ячейки таблицы */
td .edit-btn, td .delete-btn {
  margin-right: 5px;
}

.icon {
  width: 20px; /* Ширина иконки */
  height: 20px; /* Высота иконки */
  vertical-align: middle; /* Отцентровка по вертикали */
}

.edit-btn img,
.delete-btn img {
  fill: white; /* Цвет иконок */
}

</style>