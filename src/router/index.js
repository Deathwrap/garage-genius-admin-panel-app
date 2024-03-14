import { createRouter, createWebHistory } from 'vue-router';
import ServicesComponent from '../components/ServicesComponent.vue';
import AdminDashboard from '../components/AdminDashboard.vue';
// import Orders from '../views/Orders.vue';
// import Clients from '../views/Clients.vue';
import Employees from '../components/WorkersComponent.vue';

const routes = [
    { path: '/services', component: ServicesComponent },
    {path: '/dashboard', component: AdminDashboard},
    // { path: '/orders', component: Orders },
    // { path: '/clients', component: Clients },
    { path: '/employees', component: Employees },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
