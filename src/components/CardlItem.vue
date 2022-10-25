<script>
export default {
  name: 'CardItem',
  emits: ['card-element-sent'],
  props: {
    index: Number,
    apiData: Object,
    styling: String,
    upcoming: Boolean,
    mediaType: String,
  },
  data() {
    return {
      imageUrl: 'https://image.tmdb.org/t/p/original',
      cardElement: [],
      monthNames: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
    }
  },
  methods: {
    changeDateFormat() {
      const newDate = new Date(this.apiData[this.index].release_date);
      return `${newDate.getDate()} ${this.monthNames[newDate.getMonth()]}, ${newDate.getFullYear()}`;
    }
  },
  mounted() {
    this.cardElement = window.getComputedStyle(this.$refs.card);
    this.$emit('card-element-sent', this.cardElement);
  }
}
</script>

<template>
  <div ref="card" class="card mr-[3.58rem]" :style="{ transform: styling }">
    <router-link :to="{ name: mediaType === 'movie' ? 'movie-detail' : 'tv-detail', params: { id: apiData[index].id } }">
      <img class="min-w-[200px] h-[300px]" :src="imageUrl + apiData[index].poster_path" alt="">
      <div class="mt-2">
        <h1 class="font-bold">{{ apiData[index].title ||
        apiData[index].name }}</h1>
        <h3 class="mb-4">{{ upcoming ? changeDateFormat() : `${apiData[index].vote_average.toFixed(1)} score` }}</h3>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.card {
  transition: all 1s ease;
}
</style>