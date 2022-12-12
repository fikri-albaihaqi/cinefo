<script>
import { getMovies } from '../api/index.js';
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
      page: 2,
    }
  },
  methods: {
    async getMoviesData(category) {
      return (await getMovies(category)).data.results;
    },
    async loadMoreMovies() {
      let newData;
      newData = (await getMovies(this.type, this.page)).data.results;
      for (let i = 0; i <= newData.length; i++) {
        this.movieData.push(newData[i]);
      }
      this.page++;
    }
  },
  watch: {
    '$route.params.type': {
      async handler(newValue) {
        this.movieData = [];
        this.type = newValue;
        this.movieData = await this.getMoviesData(newValue);
      },
      immediate: true,
    },
  },
}
</script>

<template>
  <div class="w-[90vw] md:w-[80vw] m-auto lg:pt-32">
    <h1 class="font-bold text-2xl" v-if="type === 'popular'" data-aos="fade-up" data-aos-delay="300">Popular</h1>
    <h1 class="font-bold text-2xl" v-else-if="type === 'upcoming'" data-aos="fade-up" data-aos-delay="300">Upcoming</h1>
    <h1 class="font-bold text-2xl" v-else-if="type === 'top rated'" data-aos="fade-up" data-aos-delay="300">Top Rated
    </h1>

    <div class="grid gap-4 grid-cols-3 md:grid-cols-5 mt-4 lg:mt-8">
      <CardItem :api-data="movieData" :upcoming="upcoming" v-for="(item, index) in movieData" :key="`item-${index}`"
        :index="index" :media-type="'movie'" data-aos="fade-up" data-aos-delay="300" />
    </div>
    <button @click="loadMoreMovies()" class="w-full p-4 mt-8 rounded-lg bg-primary hover:bg-orange-700">Load
      More</button>
  </div>
</template>