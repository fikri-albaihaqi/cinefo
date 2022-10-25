<script>
import { getTrending, getPopularMovies, getPopularTVShows, getUpcomingMovies } from "../api/index.js";
import Carousel from "../components/Carousel.vue";
import Slider from '../components/Slider.vue';
export default {
  name: 'HomeView',
  components: {
    Carousel,
    Slider,
  },
  data() {
    return {
      trendingData: Object,
      popularMoviesData: Object,
      popularTVShowsData: Object,
      upcomingMoviesData: Object,
    }
  },
  methods: {
    async getTrendingData() {
      return (await getTrending()).data.results;
    },
    async getPopularMoviesData() {
      return (await getPopularMovies()).data.results;
    },
    async getPupolarTVShowsData() {
      return (await getPopularTVShows()).data.results;
    },
    async getUpcomingMoviesData() {
      return (await getUpcomingMovies()).data.results;
    }
  },
  async created() {
    this.trendingData = await this.getTrendingData();
    this.popularMoviesData = await this.getPopularMoviesData();
    this.popularTVShowsData = await this.getPupolarTVShowsData();
    this.upcomingMoviesData = await this.getUpcomingMoviesData();
  }
}
</script>

<template>
  <Carousel :compo="'Trending'" :apiData="trendingData" :width="'w-screen'" :itemWidth="'w-screen'" :height="'h-screen'" />
  <div class="w-[80vw] m-auto mt-16">
    <h1 class="text-3xl font-bold text-primary">Popular Movies</h1>
    <Slider :compo="'CardItem'" :apiData="popularMoviesData" :width="'w-[80vw]'" :media-type="'movie'" />

    <h1 class="text-3xl font-bold text-primary mt-16">Upcoming Movies</h1>
    <Slider :compo="'CardItem'" :apiData="upcomingMoviesData" :width="'w-[80vw]'" :upcoming="true" :media-type="'movie'" />

    <h1 class="text-3xl font-bold text-primary mt-16">Popular TV Shows</h1>
    <Slider :compo="'CardItem'" :apiData="popularTVShowsData" :width="'w-[80vw]'" :media-type="'tv'" />
  </div>
</template>
