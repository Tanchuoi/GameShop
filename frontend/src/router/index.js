import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import { useUserStore } from '@/stores/userStore';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/AdminView.vue'),
    meta: { requiresAdmin: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/game/:id',
    name: 'Game',
    component: () => import('@/views/GameView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Add navigation guard
router.beforeEach(async (to) => {
  const isAdmin = JSON.parse(sessionStorage.getItem('isAdmin'));

  // Check if route requires admin access
  if (to.meta.requiresAdmin) {
    if (!isAdmin) {
      // Redirect non-admin users to the login page
      return { name: 'Login' };
    }
  }
});

export default router;
