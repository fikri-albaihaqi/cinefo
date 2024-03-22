<script>
import { multiSearch } from '../api/index.js';
import CardItem from '../components/CardItem.vue';

export default {
  name: 'SearchResultsView',
  components: {
    CardItem
  },
  data() {
    return {
      searchResults: Object,
    }
  },
  methods: {
    async search(query) {
      const encodedUri = encodeURIComponent(query);
      this.searchResults = (await multiSearch(encodedUri)).data.results;
    }
  },
  watch: {
    '$route.params.query': {
      async handler(newValue) {
        this.search(newValue);
        console.log(this.searchResults[0])
      },
      immediate: true
    }
  }
}
</script>

<template>
  <div class="w-[90vw] md:w-[80vw] m-auto lg:pt-32">
    <h1 class="font-bold text-2xl" data-aos="fade-up" data-aos-delay="300">Search Result(s)</h1>
    <div v-if="searchResults.length > 0" class="grid gap-4 grid-cols-3 md:grid-cols-5 mt-4 lg:mt-8">
      <CardItem :api-data="searchResults" v-for="(item, index) in searchResults" :key="`item-${index}`" :index="index"
        :margin="'mx-4 my-8'" :hide="'hidden'" :media-type="searchResults[index].media_type" data-aos="fade-up" data-aos-delay="300" />
    </div>
    <div v-else class="h-screen flex justify-center mt-32 text-4xl">
      <h1>Sorry we can't find what you're looking for.</h1>
    </div>
  </div>
</template>