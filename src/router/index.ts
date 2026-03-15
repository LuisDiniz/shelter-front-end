import { RouteRecordRaw } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AnimalsPage from '../views/AnimalsPage.vue'
import HowToHelpPage from '../views/HowToHelpPage.vue'
import HistoryPage from '../views/HistoryPage.vue'
import NewsPage from '../views/NewsPage.vue'
import LoginPage from '../views/LoginPage.vue'
import AdminPage from '../views/AdminPage.vue'
import AdoptionFormPage from '../views/AdoptionFormPage.vue'
import VolunteerFormPage from '../views/VolunteerFormPage.vue'
import NewsDetailPage from '../views/NewsDetailPage.vue'
import AnimalDetailPage from '../views/AnimalDetailPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/animais',
    name: 'Animals',
    component: AnimalsPage
  },
  {
    path: '/como-ajudar',
    name: 'HowToHelp',
    component: HowToHelpPage
  },
  {
    path: '/historia',
    name: 'History',
    component: HistoryPage
  },
  {
    path: '/noticias',
    name: 'News',
    component: NewsPage
  },
  {
    path: '/noticias/:id',
    name: 'NewsDetail',
    component: NewsDetailPage
  },
  {
    path: '/animais/:id',
    name: 'AnimalDetail',
    component: AnimalDetailPage,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/adotar/:id',
    name: 'AdoptionForm',
    component: AdoptionFormPage,
    props: true
  },
  {
    path: '/voluntario',
    name: 'VolunteerForm',
    component: VolunteerFormPage
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage
  }
]

export default routes