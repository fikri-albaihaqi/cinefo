<script>
import { getPersonDetail, getPersonCombinedCredits } from '../api/index.js';
import Slider from '../components/Slider.vue';

export default {
  name: 'PersonDetailView',
  components: {
    Slider,
  },
  data() {
    return {
      id: this.$route.params.id,
      personData: Object,
      combinedCreditsData: Object,
      imageUrl: 'https://image.tmdb.org/t/p/original',
      monthNames: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
      mediaType: [],
    }
  },
  methods: {
    async getPersonData(id) {
      return (await getPersonDetail(id)).data;
    },
    async getPersonCombinedCreditsData(id) {
      return (await getPersonCombinedCredits(id)).data;
    },
    changeDateFormat() {
      const newDate = new Date(this.personData.birthday);
      return `${newDate.getDate()} ${this.monthNames[newDate.getMonth()]}, ${newDate.getFullYear()}`;
    },
    getMediaType() {
      for (let i = 0; i < 10; i++) {
        this.mediaType[i] = this.combinedCreditsData.cast[i].media_type;
      }
      return this.mediaType;
    }
  },
  async created() {
    this.personData = await this.getPersonData(this.id);
    this.combinedCreditsData = await this.getPersonCombinedCreditsData(this.id);
  }
}
</script>

<template>
  <div class="w-[80vw] m-auto pt-32">
    <div class="flex">
      <div class="min-w-[20%]">
        <img class="w-[200px] rounded-md" :src="imageUrl + personData.profile_path" alt="">
        <h2 class="font-bold text-xl mt-8">Personal Info</h2>

        <h3 class="mt-4">Known For</h3>
        <p class="text-gray-400">{{ personData.known_for_department }}</p>

        <h3 class="mt-4">Gender</h3>
        <p class="text-gray-400">{{ personData.gender === 1 ? 'Female' : 'Male' }}</p>

        <h3 class="mt-4">Birthday</h3>
        <p class="text-gray-400">{{ changeDateFormat() }}</p>

        <h3 class="mt-4">Place of Birth</h3>
        <p class="text-gray-400">{{ personData.place_of_birth }}</p>
      </div>
      <div class="min-w-[80%] ml-8">
        <h1 class="font-bold text-3xl">{{ personData.name }}</h1>
        <p class="biography mt-8">{{ personData.biography }}</p>
        <h2 class="font-bold text-xl mt-8">Known For</h2>
        <Slider :api-data="combinedCreditsData.cast"
          :media-type="getMediaType()" :compo="'CardItem'" :margin="'mr-12'" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.biography {
  white-space: pre-wrap;
}
</style>