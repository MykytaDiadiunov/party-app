import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsView from '../views/TabsView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/sign-in'
  },
  {
    path: '/sign-in',
    component: () => import('@/views/auth/SignInView.vue')
  },
  {
    path: '/sign-up',
    component: () => import('@/views/auth/SignUpView.vue')
  },
  // {
  //   path: '/tabs/',
  //   component: TabsView,
  //   children: [
  //     {
  //       path: '', 
  //       redirect: '/tabs/tab1'
  //     },
  //     {
  //       path: 'parties',
  //       component: () => import('@/views/')
  //     },
  //     {
  //       path: 'profile',
  //       component: () => import('@/views/')
  //     },
  //     {
  //       path: 'fav',
  //       component: () => import('@/views/')
  //     },
  //     {
  //       path: 'my-parties',
  //       component: () => import('@/views/')
  //     }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
