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
      },
      immediate: true
    }
  }
}
</script>

<template>
  <div class="w-[80vw] m-auto pt-32">
    <h1 class="font-bold text-2xl ml-12">Search Result(s)</h1>
    <div class="flex flex-wrap justify-center mt-8">
      <CardItem :api-data="searchResults" v-for="(item, index) in searchResults" :key="`item-${index}`" :index="index"
        :margin="'mx-4 my-8'" :hide="'hidden'" :media-type="searchResults[index].media_type" />
    </div>
  </div>
</template>