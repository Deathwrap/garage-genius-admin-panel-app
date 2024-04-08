<template>
  <div class="modal">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">&times;</button>
      <div class="tabs">
        <button :class="{ activeTab: activeTab === 'info', inactiveTab: activeTab !== 'info' }" @click="activeTab = 'info'">Информация</button>
        <button :class="{ activeTab: activeTab === 'skills', inactiveTab: activeTab !== 'skills' }" @click="activeTab = 'skills'">Навыки</button>
      </div>
      <div v-if="activeTab === 'info' && worker" class="worker-info">
        <info-tab :worker="worker"/>
      </div>
      <div v-if="activeTab === 'skills'" class="worker-skills">
        <skills-tab :skills="workerSkills" :categories="categories" @addSkill="addSkillHandler"/>
      </div>
    </div>
  </div>
</template>

<script>
import InfoTab from "@/components/InfoTab.vue";
import SkillsTab from "@/components/SkillsTab.vue";
import api from "@/utils/api"; // Подключаем модуль для работы с API

export default {
  name: 'WorkerInfoModal',
  components: {
    InfoTab,
    SkillsTab
  },
  props: {
    workerId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      activeTab: 'info',
      worker: null, // Добавляем свойство для хранения информации о рабочем
      workerSkills: [], // Добавляем свойство для хранения навыков рабочего
      categories: [] // Добавляем свойство для хранения категорий навыков
    }
  },
  async created() {
    // Выполняем асинхронные запросы при создании компонента
    await this.fetchWorker();
    await this.fetchSkills();
    await this.fetchCategories();
  },
  methods: {
    async fetchWorker() {
      try {
        const response = await api.get(`/api/workers/${this.workerId}`);
        this.worker = response.data;
      } catch (error) {
        console.error('Ошибка при получении информации о рабочем:', error);
      }
    },
    async fetchSkills() {
      try {
        const response = await api.get(`/api/workers/${this.workerId}/skills`);
        this.workerSkills = response.data;
      } catch (error) {
        console.error('Ошибка при получении навыков рабочего:', error);
      }
    },
    async fetchCategories() {
      try {
        const response = await api.get(`/api/services/categories`);
        this.categories = response.data;
      } catch (error) {
        console.error('Ошибка при получении категорий навыков:', error);
      }
    },
    addSkillHandler(categoryId) {
      // Подготовка данных для запроса
      const requestData = {
        workerId: this.workerId,
        categoryId: categoryId
      };

      // Отправка запроса на сервер
      api.post('/api/workers/skills/add', requestData)
          .then(response => {
            // Получаем skillId из ответа сервера
            const skillId = response.data.skillId;

            // Создаем новый навык на основе полученных данных
            const newSkill = {
              id: skillId,
              workerId: this.workerId,
              categoryId: categoryId
            };

            // Добавляем новый навык в массив workerSkills
            this.workerSkills.push(newSkill);

            console.log('Навык успешно добавлен:', newSkill);
          })
          .catch(error => {
            console.error('Ошибка при добавлении навыка:', error);
          });
    },
    closeModal() {
      this.$emit('close');
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
  position: relative; /* Для позиционирования кнопки закрытия */
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #aaa;
}

.close-button:hover {
  color: #555;
}

.tabs {
  display: flex;
  margin-bottom: 10px;
}

.tabs button {
  flex: 1;
  padding: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: border-color 0.3s;
  margin-right: 10px; /* Добавлено расстояние между вкладками */
  font-size: 16px; /* Размер шрифта */
  font-weight: bold;
}


.tabs button:last-child {
  margin-right: 0; /* Убираем правый отступ для последней вкладки */
}

/* Псевдокласс :not() для изменения цвета при наведении на неактивную вкладку */
.tabs button:not(.activeTab):hover {
  border-color: #007bff;
}

.tabs button.activeTab {
  border-color: #007bff;
}

.worker-info {
  margin-top: 20px;
}

.worker-info div {
  margin-bottom: 10px;
}

.worker-info ul {
  list-style: none;
  padding-left: 0;
}

.worker-info li {
  margin-left: 20px;
}

.tabs button.inactiveTab {
  border-bottom: 2px solid #ccc; /* Цвет полоски для неактивной вкладки */
}
</style>
