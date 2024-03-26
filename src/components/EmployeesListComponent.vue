<template>
  <div class="employees">
    <table>
      <thead>
      <tr>
        <th>Имя</th>
        <th>Должность</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="worker in workers" :key="worker.id" @click="handleRowClick(worker.id)" class="table-row">
        <td>{{ worker.name }}</td>
        <td>{{ getPositionName(worker.positionId) }}</td>
      </tr>
      </tbody>
    </table>
    <div class="add-worker-container">
      <button class="add-worker-button" @click="addWorkerButtonHandler">Добавить сотрудника</button>
    </div>
    <add-worker-modal v-if="showAddWorkerModal" @add="addWorker" @close="showAddWorkerModal = false"></add-worker-modal>
    <worker-card v-if="showWorkerCardModal" @close="showWorkerCardModal = false" worker-id="1"></worker-card>
  </div>
</template>

<script>
import api from "@/utils/api";
import AddWorkerModal from "@/components/Modals/AddWorkerModal.vue";
import WorkerCard from "@/components/Modals/WorkerCard.vue";

export default {
  components: { AddWorkerModal, WorkerCard },
  data() {
    return {
      workers: [],
      positions: [],
      showAddWorkerModal: false,
      showWorkerCardModal: false
    };
  },

  mounted() {
    this.fetchEmployees();
    this.fetchPositions();
  },
  methods: {
    async fetchEmployees() {
      try {
        const response = await api.get('api/workers/get');
        this.workers = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке списка сотрудников:', error);
      }
    },
    async fetchPositions() {
      try {
        const response = await api.get('api/workers/positions');
        this.positions = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке списка должностей:', error);
      }
    },
    getPositionName(positionId) {
      const position = this.positions.find(position => position.id === positionId);
      return position ? position.name : 'Неизвестная должность';
    },
    addWorker(worker) {
      api.post(`api/workers/auth/sign_up`, {
        positionId: worker.positionId,
        name: worker.name,
        login: worker.login,
        password: worker.password
      }).then(response => {
        const workerId = response.data.workerId;
        this.workers.push({
          id: workerId,
          positionId: worker.positionId,
          name: worker.name,
          login: worker.login,
          password: worker.password
        });
        this.showAddWorkerModal = false;
      }).catch(error => {
        console.error('Ошибка при добавлении работника:', error);
        this.showAddWorkerModal = false;
      });
    },
    addWorkerButtonHandler() {
      this.showAddWorkerModal = true;
    },
    handleRowClick(workerId) {
      console.log('Выбрана строка с id:', workerId);
      this.showWorkerCardModal = true;
    }
  }
};
</script>

<style scoped>
.employees {
  padding: 20px;
}

.add-worker-container {
  text-align: left;
  margin-top: 20px;
}

.add-worker-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  transition-duration: 0.4s;
}

.add-worker-button:hover {
  background-color: #57a8ff;
}

.employees table {
  width: 100%;
  border-collapse: collapse;
}

.employees th,
.employees td {
  border: 1px solid #ccc;
  padding: 8px;
}

.employees th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.employees td:first-child {
  font-weight: bold;
}

.table-row:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}
</style>
