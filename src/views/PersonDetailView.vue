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
  <div class="w-[90vw] lg:w-[80vw] m-auto xl:pt-32">
    <div class="flex flex-col items-center lg:items-start lg:flex-row">
      <div class="flex flex-col items-center lg:items-start w-[90vw] lg:min-w-[20%]">
        <img class="w-[200px] rounded-md" :src="imageUrl + personData.profile_path" alt="">
        <h1 class="lg:hidden font-bold text-3xl mt-4">{{ personData.name }}</h1>
        <h2 class="text-xl mt-8 self-start">Personal Info</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:flex lg:flex-col self-start">
          <div class="pr-4">
            <h3 class="mt-4">Known For</h3>
            <p class="text-gray-400">{{ personData.known_for_department }}</p>
          </div>

          <div class="pr-4">
            <h3 class="mt-4">Gender</h3>
            <p class="text-gray-400">{{ personData.gender === 1 ? 'Female' : 'Male' }}</p>
          </div>

          <div class="pr-4">
            <h3 class="mt-4">Birthday</h3>
            <p class="text-gray-400">{{ changeDateFormat() }}</p>
          </div>

          <div class="pr-4">
            <h3 class="mt-4">Place of Birth</h3>
            <p class="text-gray-400">{{ personData.place_of_birth }}</p>
          </div>
        </div>
      </div>
      <div class="min-w-[80%] lg:ml-8">
        <h1 class="hidden lg:block font-bold text-3xl">{{ personData.name }}</h1>
        <h1 class="lg:hidden text-xl mt-8">Biography</h1>
        <p class="biography font-[100] mt-2 lg:mt-8">{{ personData.biography }}</p>
        <h2 class="font-bold text-xl mt-8">Known For</h2>
        <Slider class="hidden lg:flex" :api-data="combinedCreditsData.cast" :media-type="getMediaType()"
          :compo="'CardItem'" :margin="'mr-12'" />
      </div>
      <Slider class="lg:hidden" :api-data="combinedCreditsData.cast" :media-type="getMediaType()"
        :compo="'CardItem'" :margin="'mr-12'" />
    </div>
  </div>
</template>

<style scoped>
.biography {
  white-space: pre-wrap;
}
</style>