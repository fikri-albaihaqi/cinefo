<script>
import { getTvShows } from '../api/index.js';
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
      page: 2,
    }
  },
  methods: {
    async getTvShowsData(category) {
      return (await getTvShows(category)).data.results;
    },
    async loadMoreTvShows() {
      let newData;
      newData = (await getTvShows(this.type, this.page)).data.results;
      for (let i = 0; i <= newData.length; i++) {
        this.tvData.push(newData[i]);
      }
      this.page++;
    }
  },
  watch: {
    '$route.params.type': {
      async handler(newValue) {
        this.tvData = [];
        this.type = newValue;
        this.tvData = await this.getTvShowsData(newValue);
        console.log(newValue)
      },
      immediate: true,
    },
  },
}
</script>

<template>
  <div class="w-[90vw] md:w-[80vw] m-auto lg:pt-32">
    <h1 class="font-bold text-2xl" v-if="type === 'popular'" data-aos="fade-up" data-aos-delay="300">Popular</h1>
    <h1 class="font-bold text-2xl" v-else-if="type === 'top rated'" data-aos="fade-up" data-aos-delay="300">Top Rated
    </h1>

    <div class="grid gap-4 grid-cols-3 md:grid-cols-5 mt-4 lg:mt-8">
      <CardItem :api-data="tvData" :upcoming="upcoming" v-for="(item, index) in tvData" :key="`item-${index}`"
        :index="index" :media-type="'tv'" data-aos="fade-up" data-aos-delay="300" />
    </div>
    <button @click="loadMoreTvShows()" class="w-full p-4 mt-8 rounded-lg bg-primary hover:bg-orange-700">Load
      More</button>
  </div>
</template>