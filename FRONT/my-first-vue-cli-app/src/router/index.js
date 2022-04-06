import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
const routes=[
{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue'),
  },
  { 
    
      path: '/profile',
      name: 'Profile',
      component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
  }
    ]



const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
