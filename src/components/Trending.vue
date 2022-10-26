<script>
export default {
  name: 'Trending',
  emits: ['id-sent'],
  props: {
    apiData: Object,
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
  },
  mounted() {
    this.$emit('id-sent');
  }
}
</script>

<template>
  <Transition :name="transitionEffect">
    <div class="flex items-end absolute w-screen h-screen -z-10" v-show="currentSlide === index" :style="{
      backgroundImage: 'url(' + imageUrl + apiData[index].backdrop_path + ')',
      backgroundSize: 'cover',
    }">
      <div class="absolute bg-gradient-to-t from-background w-screen h-1/2"></div>
      <div class="absolute top-0 w-screen h-[15%]" :style="{
        backgroundColor: '#1B1A17',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0))',
      }"></div>
      <div class="flex flex-col relative mx-auto mb-16 w-[80vw] z-index-10">
        <h1 class="font-bold text-4xl">{{ apiData[index].title ||
            apiData[index].name
        }}</h1>
        <h3 class="mb-4">{{ apiData[index].vote_average.toFixed(1) }} Score</h3>
        <p>
          {{ apiData[index].overview }}
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