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
    <div class="flex items-end absolute w-screen h-screen -z-10" v-show="currentSlide === index"
      @mouseenter="$emit('mouseenter')" @mouseout="$emit('mouseout')" :style="{
        backgroundImage: 'url(' + imageUrl + trendingItem[index].backdrop_path + ')',
        backgroundSize: 'cover',
      }">
      <div class="absolute bg-gradient-to-t from-black w-screen h-1/2"></div>
      <div class="absolute self-start bg-gradient-to-b from-black w-screen h-1/4"></div>
      <div class="flex flex-col relative mx-auto mb-16 w-[80vw] z-index-10">
        <h1 class="font-bold text-4xl">{{ trendingItem[index].title ||
        trendingItem[index].name }}</h1>
        <h3 class="mb-4">{{ trendingItem[index].vote_average.toFixed(1) }} Score</h3>
        <p>
          {{ trendingItem[index].overview }}
        </p>
      </div>
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