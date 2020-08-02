import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      icon: 'home', title: 'Home'
    },
    component: () => import(/* webpackChunkName: "home" */ '../pages/home/Home')
  },
  {
    path: '/expenses-list',
    name: 'Expenses-list',
    meta: {
      icon: 'list-ul', title: 'Lista Gastos'
    },
    component: () => import(/* webpackChunkName: "lista-gastos" */ '../pages/expenses-list/ExpensesList')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'Login'
    },
    component: () => import(/* webpackChunkName: "login" */ '../pages/login/Login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - expenses`

  if (!window.uid && to.name !== 'Login') {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
