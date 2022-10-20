<script>
export default {
  name: 'CardItem',
  emits: ['card-element-sent'],
  props: {
    index: Number,
    apiData: Object,
    styling: String,
  },
  data() {
    return {
      imageUrl: 'https://image.tmdb.org/t/p/original',
      cardElement: [],
    }
  },
  mounted() {
    this.cardElement = window.getComputedStyle(this.$refs.card);
    this.$emit('card-element-sent', this.cardElement);
    // console.log(this.cardElement);
  }
}
</script>

<template>
  <a href="" ref="card" class="card mr-[3.58rem]" :style="{ transform: styling }">
    <img class="min-w-[200px] h-[300px]" :src="imageUrl + apiData[index].poster_path" alt="">
    <div class="mt-2">
      <h1 class="font-bold">{{ apiData[index].title ||
      apiData[index].name }}</h1>
      <h3 class="mb-4">{{ apiData[index].vote_average.toFixed(1) }} Score</h3>
    </div>
  </a>
</template>

<style scoped>
.card {
  transition: all 1s ease;
}
</style>