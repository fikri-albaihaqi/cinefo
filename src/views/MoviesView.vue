<script>
import { getPopularMovies, getUpcomingMovies, getTopRatedMovies } from '../api/index.js';
import CardItem from '../components/CardItem.vue';

export default {
  name: 'MoviesView',
  components: {
    CardItem,
  },
  data() {
    return {
      movieData: Object,
      type: '',
    }
  },
  methods: {
    async getPopularMoviesData() {
      return (await getPopularMovies()).data.results;
    },
    async getUpcomingMoviesData() {
      return (await getUpcomingMovies()).data.results;
    },
    async getTopRatedMoviesData() {
      return (await getTopRatedMovies()).data.results;
    }
  },
  watch: {
    '$route.params.type': {
      async handler(newValue) {
        if (newValue === 'popular') {
          this.movieData = [];
          this.type = newValue;
          this.movieData = await this.getPopularMoviesData();
        } else if (newValue === 'upcoming') {
          this.movieData = [];
          this.type = newValue;
          this.movieData = await this.getUpcomingMoviesData();
        } else if (newValue === 'top rated') {
          this.movieData = [];
          this.type = newValue;
          this.movieData = await this.getTopRatedMoviesData();
        }
      },
      immediate: true,
    },
  },
}
</script>

<template>
  <div class="w-[90vw] md:w-[80vw] m-auto lg:pt-32">
    <h1 class="font-bold text-2xl" v-if="type === 'popular'">Popular</h1>
    <h1 class="font-bold text-2xl" v-else-if="type === 'upcoming'">Upcoming</h1>
    <h1 class="font-bold text-2xl" v-else-if="type === 'top rated'">Top Rated</h1>

    <div class="grid grid-cols-3 md:grid-cols-5 justify-items-center mt-4 lg:mt-8">
      <CardItem :api-data="movieData" :upcoming="upcoming" v-for="(item, index) in movieData" :key="`item-${index}`"
        :index="index" :media-type="'movie'" />
    </div>
  </div>
</template>