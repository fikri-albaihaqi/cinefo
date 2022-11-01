<script>
export default {
  name: 'ImageItem',
  emits: ['card-element-sent', 'image-selected'],
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
  <div ref="card" class="card mr-2" :style="{ transform: styling }">
    <img class="min-w-[300px] rounded-xl cursor-pointer" @click="$emit('image-selected', imageUrl + apiData[index].file_path)" :src="imageUrl + apiData[index].file_path" alt="">
  </div>
</template>

<style scoped>
.card {
  transition: all 1s ease;
}
</style>