<template>
  <div class="modal">
    <div class="modal-content">
      <h3>Добавить категорию</h3>
      <form @submit.prevent="handleAddCatgorySubmit">
        <div class="form-group">
          <label for="categoryName">Название категории:</label>
          <input type="text" id="categoryName" v-model="categoryName" required>
        </div>
        <div class="buttons">
          <button type="button" @click="cancel">Отмена</button>
          <button type="submit">Добавить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddCategoryModal',
  data() {
    return {
      categoryName: ''
    };
  },
  methods: {
    async handleAddCatgorySubmit() {
        this.$emit('add', this.categoryName );
        this.resetForm();
    },
    cancel() {
      this.resetForm();
      this.$emit('close');
    },
    resetForm() {
      this.categoryName = '';
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px; /* Ширина модального окна */
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="number"],
select {
  width: calc(100% - 20px);
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

select {
  appearance: none;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

button[type="submit"],
button[type="button"] {
  width: 48%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"] {
  background-color: #007bff;
  color: #fff;
}

button[type="button"] {
  background-color: #dc3545;
  color: #fff;
}

button[type="submit"]:hover,
button[type="button"]:hover {
  opacity: 0.8;
}
</style>
