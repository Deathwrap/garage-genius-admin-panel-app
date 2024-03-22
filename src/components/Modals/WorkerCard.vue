<template>
  <div class="modal">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">&times;</button>
      <h3>Информация о работнике</h3>
      <div class="worker-info">
        <div><strong>Имя:</strong> {{ worker.name }}</div>
        <div><strong>Логин:</strong> {{ worker.login }}</div>
        <div><strong>Должность:</strong> {{ worker.position }}</div>
        <div><strong>Категории:</strong>
          <ul>
            <li v-for="category in worker.categories" :key="category.id">{{ category.name }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkerInfoModal',
  data() {
    return {
      worker: {
        name: 'John Doe',
        login: 'johndoe',
        position: 'Developer',
        categories: [
          { id: 1, name: 'Category 1' },
          { id: 2, name: 'Category 2' },
          { id: 3, name: 'Category 3' }
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
</style>
