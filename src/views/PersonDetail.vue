<script>
import { getPersonDetail, getPersonCombinedCredits } from '../api/index.js';
import Slider from '../components/Slider.vue';

export default {
  name: 'PersonDetail',
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
      knownForActing: [],
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
    getKnownForActing() {
      for (let i = 0; i < 10; i++) {
        this.knownForActing[i] = this.combinedCreditsData.cast[i];
      }
      return this.knownForActing;
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

        <h3 class="font-bold mt-4">Known For</h3>
        <p>{{ personData.known_for_department }}</p>

        <h3 class="font-bold mt-4">Gender</h3>
        <p>{{ personData.gender === 1 ? 'Female' : 'Male' }}</p>

        <h3 class="font-bold mt-4">Birthday</h3>
        <p>{{ changeDateFormat() }}</p>

        <h3 class="font-bold mt-4">Place of Birth</h3>
        <p>{{ personData.place_of_birth }}</p>
      </div>
      <div class="min-w-[80%] ml-8">
        <h1 class="font-bold text-3xl">{{ personData.name }}</h1>
        <p class="biography mt-8">{{ personData.biography }}</p>
        <h2 class="font-bold text-xl mt-8">Known For</h2>
        <Slider :api-data="getKnownForActing()" :compo="'CardItem'"  />
      </div>
    </div>
  </div>
</template>

<style scoped>
.biography {
  white-space: pre-wrap;
}
</style>