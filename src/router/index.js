import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDetailView from '../views/MovieDetailView.vue'
import TvDetailView from '../views/TvDetailView.vue'
import PersonDetailView from '../views/PersonDetailView.vue'
import MoviesView from '../views/MoviesView.vue'
import TvShowsView from '../views/TvShowsView.vue'
import PeopleView from '../views/PeopleView.vue'
import SearchResultsView from '../views/SearchResultsView.vue'
import CastView from '../views/CastView.vue'
import NotFound from '../views/NotFoundView.vue'

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
      component: MovieDetailView
    },
    {
      path: '/tv/:id',
      name: 'tv-detail',
      component: TvDetailView
    },
    {
      path: '/person/:id',
      name: 'person-detail',
      component: PersonDetailView
    },
    {
      path: '/movies/:type',
      name: 'movies',
      component: MoviesView
    },
    {
      path: '/tvs/:type',
      name: 'tvs',
      component: TvShowsView
    },
    {
      path: '/people',
      name: 'people',
      component: PeopleView
    },
    {
      path: '/search/:query',
      name: 'search',
      component: SearchResultsView
    },
    {
      path: '/:media/:id/cast',
      name: 'cast',
      component: CastView
    },
    {
      path: '/:notFound',
      component: NotFound
    },
  ]
})

export default router
