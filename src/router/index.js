import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDetail from '../views/MovieDetail.vue'
import TvDetail from '../views/TvDetail.vue'
import PersonDetail from '../views/PersonDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movie/:id',
      name: 'movie-detail',
      component: MovieDetail
    },
    {
      path: '/tv/:id',
      name: 'tv-detail',
      component: TvDetail
    },
    {
      path: '/person/:id',
      name: 'person-detail',
      component: PersonDetail
    }
  ]
})

export default router
