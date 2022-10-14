<script>
export default {
  name: 'TrendingItem',
  emits: ['mouseenter', 'mouseout'],
  props: {
    trendingItem: Object,
    index: Number,
    currentSlide: Number,
    direction: String,
  },
  data() {
    return {
      imageUrl: 'https://image.tmdb.org/t/p/original',
    }
  },
  computed: {
    transitionEffect() {
      return this.direction === 'right' ? 'slide-out' : 'slide-in';
    }
  }
}
</script>

<template>
  <Transition :name="transitionEffect">
    <div class="absolute -z-10 top-0 bottom-0 left-0 right-0" v-show="currentSlide === index"
      @mouseenter="$emit('mouseenter')" @mouseout="$emit('mouseout')">
      <img :src="imageUrl + trendingItem[index].backdrop_path" alt="">
    </div>
  </Transition>
</template>

<style scoped>
.slide-in-enter-active,
.slide-in-leave-active,
.slide-out-enter-active,
.slide-out-leave-active {
  transition: all 1s ease-in-out;
}

.slide-in-enter-from {
  transform: translateX(-100%);
}

.slide-in-leave-to {
  transform: translateX(100%);
}

.slide-out-enter-from {
  transform: translateX(100%);
}

.slide-out-leave-to {
  transform: translateX(-100%);
}
</style>