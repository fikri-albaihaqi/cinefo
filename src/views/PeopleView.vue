<script>
import { getPopularPeople } from '../api/index.js';
import CardItem from '../components/CardItem.vue';

export default {
  name: 'PeopleView',
  components: {
    CardItem,
  },
  data() {
    return {
      peopleData: Object,
    }
  },
  methods: {
    async getPopularPeopleData() {
      return (await getPopularPeople()).data.results;
    },
  },
  async created() {
    this.peopleData = await this.getPopularPeopleData();
  }
}
</script>

<template>
  <div class="w-[90vw] md:w-[80vw] m-auto lg:pt-32">
    <h1 class="font-bold text-2xl">Popular</h1>
    <div class="grid grid-cols-3 md:grid-cols-5 justify-item-center mt-4 lg:mt-8">
      <CardItem :api-data="peopleData" v-for="(item, index) in peopleData" :key="`item-${index}`"
        :index="index" :media-type="'person'" :margin="'mx-4 my-8'" :hide="'hidden'" />
    </div>
  </div>
</template>