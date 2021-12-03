import { createRouter, createWebHistory } from 'vue-router';
import userStore from '@/store/useUserStore.js';

const routes = [
  {
    path: '/',
    redirect: '/hooks'
  },
  {
    path: '/hooks',
    meta: {
      layout: 'main'
    },
    components: {
      default: () =>
        import(/* webpackChunkName: "hooks" */ '@/views/hooks/index.vue'),
      header: () =>
        import(/* webpackChunkName: "hooks" */ '@/views/hooks/header.vue')
    }
  },
  {
    path: '/hooks/add',
    meta: {
      layout: 'main'
    },
    components: {
      default: () =>
        import(/* webpackChunkName: "hook" */ '@/views/hook/index.vue'),
      header: () =>
        import(/* webpackChunkName: "hook" */ '@/views/hook/header.vue')
    }
  },
  {
    path: '/hooks/:id',
    props: true,
    meta: {
      layout: 'main'
    },
    components: {
      default: () =>
        import(/* webpackChunkName: "hook" */ '@/views/hook/index.vue'),
      header: () =>
        import(/* webpackChunkName: "hook" */ '@/views/hook/header.vue')
    }
  },
  {
    path: '/tasks',
    meta: {
      layout: 'main'
    },
    components: {
      default: () =>
        import(/* webpackChunkName: "tasks" */ '@/views/tasks/index.vue'),
      header: () =>
        import(/* webpackChunkName: "tasks" */ '@/views/tasks/header.vue')
    }
  },
  {
    path: '/tasks/add',
    meta: {
      layout: 'main'
    },
    components: {
      default: () =>
        import(/* webpackChunkName: "task" */ '@/views/task/index.vue'),
      header: () =>
        import(/* webpackChunkName: "task" */ '@/views/task/header.vue')
    }
  },
  {
    path: '/tasks/:id',
    props: true,
    meta: {
      layout: 'main'
    },
    components: {
      default: () =>
        import(/* webpackChunkName: "task" */ '@/views/task/index.vue'),
      header: () =>
        import(/* webpackChunkName: "task" */ '@/views/task/header.vue')
    }
  },

  // login page
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'empty'
    },
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async to => {
  await userStore.getMe();

  if (userStore.user.value && to.name === 'login') {
    return '/';
  }
  if (!userStore.user.value && to.name !== 'login') {
    return '/login';
  }
});

export default router;
