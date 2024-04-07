import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectView from '../views/Projects/View.vue'
import ProjectCreate from '../views/Projects/Create.vue'
import ProjectEdit from '../views/Projects/Edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/project',
      name: 'project',
      component: ProjectView
    },
    {
      path: '/project/create',
      name: 'projectCreate',
      component: ProjectCreate
    },
    {
      path: '/project/:id/edit',
      name: 'projectEdit',
      component: ProjectEdit
    }
  ]
})

export default router
