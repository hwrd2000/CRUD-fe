import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

//Employees
import EmployeeView from '../views/Employees/View.vue'
import EmployeeCreate from '../views/Employees/Create.vue'
import EmployeeEdit from '../views/Employees/Edit.vue'

//Departments
import DepartmentView from '../views/Departments/View.vue'
import DepartmentCreate from '../views/Departments/Create.vue'
import DepartmentEdit from '../views/Departments/Edit.vue'

//Project
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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/employees',
      name: 'employees',
      component: EmployeeView
    },
    {
      path: '/employees/create',
      name: 'employeesCreate',
      component: EmployeeCreate
    },
    {
      path: '/employees/:id/edit',
      name: 'employeesEdit',
      component: EmployeeEdit
    },
    {
      path: '/departments',
      name: 'departments',
      component: DepartmentView
    },
    {
      path: '/departments/create',
      name: 'departmentsCreate',
      component: DepartmentCreate
    },
    {
      path: '/departments/:id/edit',
      name: 'departmentsEdit',
      component: DepartmentEdit
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectView
    },
    {
      path: '/projects/create',
      name: 'projectsCreate',
      component: ProjectCreate
    },
    {
      path: '/projects/:id/edit',
      name: 'projectsEdit',
      component: ProjectEdit
    },
  ]
})

export default router
