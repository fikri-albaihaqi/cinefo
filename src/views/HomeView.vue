<script>
import { getTrending, getPopularMovies } from "../api/index.js";
import ImageSlider from "../components/ImageSlider.vue";
import CardSlider from '../components/CardSlider.vue';
export default {
  name: 'HomeView',
  components: {
    ImageSlider,
    CardSlider,
  },
  data() {
    return {
      trendingData: Object,
      popularMoviesData: Object,
    }
  },
  methods: {
    async getTrendingData() {
      return (await getTrending()).data.results;
    },
    async getPopularMoviesData() {
      return (await getPopularMovies()).data.results;
    }
  },
  async created() {
    this.trendingData = await this.getTrendingData();
    this.popularMoviesData = await this.getPopularMoviesData();
  }
}
</script>

<template>
  <ImageSlider :compo="'Trending'" :apiData="trendingData" :width="'w-screen'" :itemWidth="'w-screen'" :height="'h-screen'" />
  <div class="w-[80vw] m-auto mt-16">
    <h1 class="text-3xl font-bold text-primary">Popular Movies</h1>
    <CardSlider :compo="'CardItem'" :apiData="popularMoviesData" :width="'w-[80vw]'" />
  </div>
</template>
