import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import CadMembro from '../views/CadMembro.vue'
import EditMembro from '../views/EditMembro.vue'
import ConfigPage from '../views/ConfigPage.vue'
import RelatoriosPage from '../views/RelatoriosPage.vue'
import InfoConfiguracoes from '../views/InfoConfiguracoes.vue'
import viewLogin from '../views/viewLogin.vue'
const routes = [

   {
    path: '/login',
    name: 'login',
    component: viewLogin
  },
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path:'/cadastrar',
    name:'Cadastrar',
    component: CadMembro
  },
    {
    path:'/configuracoes',
    name:'Configuracoes',
    component: ConfigPage
  },
    {
    path:'/infoConfiguracoes/:nomePg',
    name:'InfoConfiguracoes',
    component: InfoConfiguracoes,
    props: true //usado para dizer q tem prop (nao precisa usar $route.params)
  },
  {
    path:'/relatorios',
    name:'RelatoriosPage',
    component: RelatoriosPage,
    props: true //usado para dizer q tem prop (nao precisa usar $route.params)
  },
  {
    path:'/editar/:id',
    name:'Editar',
    component: EditMembro,
    props: true //usado para dizer q tem prop (nao precisa usar $route.params)
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
