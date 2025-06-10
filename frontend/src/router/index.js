import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ConsumerDashboard from '../views/ConsumerDashboard.vue';
import AdminDashboard from '../views/AdminDashboard.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: ConsumerDashboard,
    meta: { requiresAuth: true, role: 'consumer' },
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Check authentication status if user is null
  if (!authStore.user) {
    await authStore.checkAuth();
  }

  const user = authStore.user;

  console.log('Navigating to:', to.fullPath);
  console.log('User from auth store:', user);

  if (to.meta.requiresAuth && !user) {
    console.log('Not authenticated. Redirecting to login.');
    next('/login');
  } else if (to.meta.requiresAuth && user?.role !== to.meta.role) {
    console.log('User role mismatch. Redirecting to appropriate dashboard.');
    next(user.role === 'admin' ? '/admin-dashboard' : '/dashboard');
  } else {
    console.log('Access granted. Proceeding to route.');
    next();
  }
});

export default router;