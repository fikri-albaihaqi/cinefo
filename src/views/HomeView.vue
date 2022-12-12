<script>
import { getTrending, getMovies, getTvShows } from "../api/index.js";
import Carousel from "../components/Carousel.vue";
import CardItem from "../components/CardItem.vue";

export default {
  name: 'HomeView',
  components: {
    Carousel,
    CardItem,
  },
  data() {
    return {
      trendingData: Object,
      popularMoviesData: Object,
      popularTvShowsData: Object,
      upcomingMoviesData: Object,
    }
  },
  methods: {
    async getTrendingData() {
      return (await getTrending()).data.results;
    },
    async getMoviesData(category) {
      return (await getMovies(category)).data.results;
    },
    async getTvShowsData(category) {
      return (await getTvShows(category)).data.results;
    },
    getMediaType(data) {
      let mediaType = [];
      if (data === 'movie') {
        for (let i = 0; i < 10; i++) {
          mediaType[i] = 'movie';
        }
      } else if (data === 'tv') {
        for (let i = 0; i < 10; i++) {
          mediaType[i] = 'tv';
        }
      }
      return mediaType;
    }
  },
  async created() {
    this.trendingData = await this.getTrendingData();
    this.popularMoviesData = await this.getMoviesData('popular');
    this.upcomingMoviesData = await this.getMoviesData('upcoming');
    this.popularTvShowsData = await this.getTvShowsData('popular');
  }
}
</script>

<template>
  <Carousel :compo="'CarouselItem'" :apiData="trendingData" :height="'h-screen'" />
  <div class="w-[90vw] md:w-[80vw] m-auto mt-16">
    <h1 class="text-3xl font-bold text-primary">Popular Movies</h1>
    <div class="grid gap-4 grid-cols-3 md:grid-cols-5 mt-8">
      <CardItem :api-data="popularMoviesData" v-for="(item, index) in popularMoviesData" :key="`item-${index}`"
        :index="index" :media-type="'movie'" data-aos="fade-up" />
    </div>

    <h1 class="text-3xl font-bold text-primary mt-16">Upcoming Movies</h1>
    <div class="grid gap-4 grid-cols-3 md:grid-cols-5 mt-8">
      <CardItem :api-data="upcomingMoviesData" :upcoming="true" v-for="(item, index) in upcomingMoviesData"
        :key="`item-${index}`" :index="index" :media-type="'movie'" data-aos="fade-up" />
    </div>

    <h1 class="text-3xl font-bold text-primary mt-16">Popular TV Shows</h1>
    <div class="grid gap-4 grid-cols-3 md:grid-cols-5 mt-8">
      <CardItem :api-data="popularTvShowsData" v-for="(item, index) in popularTvShowsData" :key="`item-${index}`"
        :index="index" :media-type="'tv'" data-aos="fade-up" />
    </div>

  </div>
</template>
