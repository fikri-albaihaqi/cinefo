<script>
export default {
  name: 'ImageItem',
  emits: ['card-element-sent'],
  props: {
    index: Number,
    apiData: Object,
    styling: String,
    upcoming: Boolean,
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
  }
}
</script>

<template>
  <div ref="card" class="card mr-2 rounded-" :style="{ transform: styling }">
    <router-link :to="{ name: 'movie-detail' }">
      <img class="min-w-[300px] rounded-xl" :src="imageUrl + apiData[index].file_path" alt="">
    </router-link>
  </div>
</template>

<style scoped>
.card {
  transition: all 1s ease;
}
</style>