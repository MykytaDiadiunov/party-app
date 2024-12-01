import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import TabsView from '../views/TabsView.vue'
import { CurrentSessionUser } from '@/models';
import { useTokenStore, useUserStore } from '@/stores';
import { routingService } from '@/services';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {name: 'SignIn'}
  },
  {
    name: 'SignIn',
    path: '/sign-in',
    component: () => import('@/views/auth/SignInView.vue'),
    meta: { auth: false }
  },
  {
    name: 'SignUp',
    path: '/sign-up',
    component: () => import('@/views/auth/SignUpView.vue'),
    meta: { auth: false }
  },
  {
    name: 'User',
    path: '/user/:id',
    component: () => import('@/views/UserView.vue')
  },
  {
    path: '/tabs/',
    component: TabsView,
    children: [
      {
        path: '/tabs/', 
        redirect: { name: 'Parties' },
      },
      {
        name: 'Parties',
        path: 'parties',
        component: () => import('@/views/tabs/PartiesView.vue'),
        meta: { auth: true }
      },
      {
        name: 'Profile',
        path: 'profile',
        component: () => import('@/views/tabs/ProfileView.vue')
      },
      {
        name: 'Favorites',
        path: 'fav',
        component: () => import('@/views/tabs/FavoritesView.vue')
      },
      {
        name: 'MyParties',
        path: 'my-parties',
        component: () => import('@/views/tabs/MyPartiesView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to: RouteLocationNormalized) => {
  try {
    const metaAuth: boolean = (to.meta as any).auth as boolean
    const tokenStore = useTokenStore()
    const token: string | null = tokenStore.getToken()

    if (typeof metaAuth as any !== 'boolean') {
      return true
    }

    if (token && !metaAuth) {
      return {name: 'Parties'}
    }

    if (!token && metaAuth) {
      return {name: 'SignIn'}
   }

   return true

  } catch (e) {
     console.error(e)
     return false
  }
})


export default router
