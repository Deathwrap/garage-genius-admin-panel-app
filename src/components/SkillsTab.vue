<template>
  <div>
    <ul class="skills-list">
      <li v-for="skill in skills" :key="skill.id" class="skill-item">
        {{ getCategoryName(skill.categoryId) }}
      </li>
    </ul>
    <div class="skills-header">
      <button v-if="!showAddSkillDropdown" class="add-skill-btn" @click="showAddSkillDropdown = true">Добавить навык</button>
      <!-- Выпадающий список категорий для добавления навыка -->
      <div v-if="showAddSkillDropdown" class="dropdown">
        <select v-model="selectedCategoryId" @change="showSaveButton = true">
          <option value="" disabled>Выберите категорию</option>
          <option v-for="category in getAvailableCategories" :value="category.id" :key="category.id">{{ category.name }}</option>
        </select>
        <button :disabled="!selectedCategoryId" v-if="showSaveButton" class="save-skill-btn" @click="saveSkill">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    },
    skills: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showAddSkillDropdown: false, // Флаг для отображения/скрытия выпадающего списка категорий
      selectedCategoryId: null, // Выбранная категория
      showSaveButton: false // Флаг для отображения/скрытия кнопки "Сохранить"
    };
  },
  computed: {
    getAvailableCategories() {
      // Фильтруем список категорий так, чтобы оставить только те, которых еще нет у работника
      return this.categories.filter(category => !this.skills.some(skill => skill.categoryId === category.id));
    }
  },
  methods: {
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.name : '';
    },
    saveSkill() {
      if (this.selectedCategoryId) {
        this.$emit('addSkill', this.selectedCategoryId);
        this.showAddSkillDropdown = false;
        this.showSaveButton = false;
        this.selectedCategoryId = null;
      }
    }
  }
};
</script>

<style scoped>
.skills-list {
  list-style: none;
  padding: 0;
}

.skill-item {
  margin-bottom: 5px;
}

.skills-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.add-skill-btn {
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-skill-btn:hover {
  background-color: #0056b3;
}

.save-skill-btn {
  padding: 8px 12px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 10px;
}

.save-skill-btn:hover {
  background-color: #218838;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown select {
  padding: 5px;
}

.dropdown select:focus {
  outline: none;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
