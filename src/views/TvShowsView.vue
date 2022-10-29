<script>
import { getPopularTvShows, getTopRatedTvShows } from '../api/index.js';
import CardItem from '../components/CardItem.vue';

export default {
  name: 'TvShowsView',
  components: {
    CardItem,
  },
  data() {
    return {
      tvData: Object,
      type: '',
    }
  },
  methods: {
    async getPopularTvShowsData() {
      return (await getPopularTvShows()).data.results;
    },
    async getTopRatedTvShowsData() {
      return (await getTopRatedTvShows()).data.results;
    }
  },
  watch: {
    '$route.params.type': {
      async handler(newValue) {
        if (newValue === 'popular') {
          this.tvData = [];
          this.type = newValue;
          this.tvData = await this.getPopularTvShowsData();
        } else if (newValue === 'top rated') {
          this.tvData = [];
          this.type = newValue;
          this.tvData = await this.getTopRatedTvShowsData();
        }
      },
      immediate: true,
    },
  },
}
</script>

<template>
  <div class="w-[80vw] m-auto pt-32">
    <h1 class="font-bold text-2xl ml-12" v-if="type === 'popular'">Popular</h1>
    <h1 class="font-bold text-2xl ml-12" v-else-if="type === 'top rated'">Top Rated</h1>

    <div class="flex flex-wrap justify-center mt-8">
      <CardItem :api-data="tvData" :upcoming="upcoming" v-for="(item, index) in tvData" :key="`item-${index}`"
        :index="index" :media-type="'tv'" :margin="'mx-4 my-2'" />
    </div>
  </div>
</template>