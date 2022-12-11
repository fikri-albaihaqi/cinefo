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
      page: 2,
    }
  },
  methods: {
    async getPopularPeopleData() {
      return (await getPopularPeople()).data.results;
    },
    async loadMorePeople() {
      let newData = (await getPopularPeople(this.page)).data.results;
      for (let i = 0; i <= newData.length; i++) {
        this.peopleData.push(newData[i]);
      }
      this.page++;
    }
  },
  async created() {
    this.peopleData = await this.getPopularPeopleData();
  }
}
</script>

<template>
  <div class="w-[90vw] md:w-[80vw] m-auto lg:pt-32">
    <h1 class="font-bold text-2xl" data-aos="fade-up" data-aos-delay="300">Popular</h1>
    <div class="grid grid-cols-3 md:grid-cols-5 justify-item-center mt-4 lg:mt-8">
      <CardItem :api-data="peopleData" v-for="(item, index) in peopleData" :key="`item-${index}`" :index="index"
        :media-type="'person'" :margin="'mx-4 my-8'" :hide="'hidden'" data-aos="fade-up" data-aos-delay="300" />
    </div>
    <button @click="loadMorePeople()" class="w-full p-4 mt-8 rounded-lg bg-primary hover:bg-orange-700">Load
      More</button>
  </div>
</template>