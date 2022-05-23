import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import CadMembro from '../views/CadMembro.vue'
import EditMembro from '../views/EditMembro.vue'
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path:'/cadastrar',
    name:'Cadastrar',
    component: CadMembro
  },
  {
    path:'/editar/:id',
    name:'Editar',
    component: EditMembro,
    props: true //usado para dizer q tem prop (nao precisa usar $route.params)
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
