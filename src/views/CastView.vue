<script>
import { getMovieCredits, getTvCredits } from '../api/index.js';
import CardItem from '../components/CardItem.vue';

export default {
  name: 'CastView',
  components: {
    CardItem,
  },
  data() {
    return {
      castData: Object,
      id: this.$route.params.id,
      mediaType: this.$route.params.media,
    }
  },
  methods: {
    async getMovieCastData(id) {
      return (await getMovieCredits(id)).data.cast;
    },
    async getTvCastData(id) {
      return (await getTvCredits(id)).data.cast;
    },
  },
  async created() {
    console.log(this.mediaType)
    if (this.mediaType == 'movie') {
      this.castData = await this.getMovieCastData(this.id);
    } else if (this.mediaType == 'tv') {
      this.castData = await this.getTvCastData(this.id);
    }
  }
}
</script>

<template>
  <div class="w-[80vw] m-auto pt-32">
    <h1 class="font-bold text-2xl ml-12">All Cast</h1>
    <div class="flex flex-wrap justify-center mt-8">
      <CardItem :api-data="castData" v-for="(item, index) in castData" :key="`item-${index}`"
        :index="index" :media-type="'person'" :margin="'mx-4 my-8'" :hide="'hidden'" />
    </div>
  </div>
</template>