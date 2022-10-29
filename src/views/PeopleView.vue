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
  <div class="w-[80vw] m-auto pt-32">
    <h1 class="font-bold text-2xl ml-12">Popular</h1>
    <div class="flex flex-wrap justify-center mt-8">
      <CardItem :api-data="peopleData" v-for="(item, index) in peopleData" :key="`item-${index}`"
        :index="index" :media-type="'people'" :margin="'mx-4 my-8'" :hide="'hidden'" />
    </div>
  </div>
</template>