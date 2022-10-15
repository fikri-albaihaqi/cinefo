<script>
import { getTrending } from "../api/index.js";
import Trending from "../components/Trending.vue";
export default {
  name: 'HomeView',
  components: {
    Trending,
  },
  data() {
    return {
      trendingData: Object,
    }
  },
  methods: {
    async getTrendingData() {
      return (await getTrending()).data.results;
    }
  },
  async created() {
    this.trendingData = await this.getTrendingData();
  }
}
</script>

<template>
  <Trending :trending-data="trendingData" />
  <h1 class="text-6xl">Movies</h1>
</template>
