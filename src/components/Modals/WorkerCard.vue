<template>
  <div class="modal">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">&times;</button>
      <div class="tabs">
        <button :class="{ activeTab: activeTab === 'info', inactiveTab: activeTab !== 'info' }" @click="activeTab = 'info'">Информация</button>
        <button :class="{ activeTab: activeTab === 'skills', inactiveTab: activeTab !== 'skills' }" @click="activeTab = 'skills'">Навыки</button>
      </div>
      <div v-show="activeTab === 'info'" class="worker-info">
        <InfoTab :worker="worker"/>
      </div>
      <div v-show="activeTab === 'skills'" class="worker-skills">
        <SkillsTab :categories="worker.categories"/>
      </div>
    </div>
  </div>
</template>

<script>
import InfoTab from "@/components/InfoTab.vue";
import SkillsTab from "@/components/SkillsTab.vue";

export default {
  name: 'WorkerInfoModal',
  components: {
    InfoTab,
    SkillsTab
  },
  data() {
    return {
      activeTab: 'info',
      worker: {
        name: 'John Doe',
        login: 'johndoe',
        position: 'Developer',
        categories: [
          {id: 1, name: 'Category 1'},
          {id: 2, name: 'Category 2'},
          {id: 3, name: 'Category 3'}
        ]
      }
    };
  },
  methods: {
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
