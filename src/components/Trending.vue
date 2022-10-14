<script>
import TrendingItem from './TrendingItem.vue';
import CarouselControls from './CarouselControls.vue';
import CarouselIndicators from './CarouselIndicators.vue';

export default {
  name: 'Trending',
  components: {
    TrendingItem,
    CarouselControls,
    CarouselIndicators,
  },
  props: {
    trendingData: Object,
    interval: {
      type: Number,
      default: 5000,
    },
  },
  data() {
    return {
      currentSlide: 0,
      slideInterval: null,
      direction: 'right',
    }
  },
  methods: {
    setCurrentSlide(index) {
      this.currentSlide = index;
    },
    prev(step = -1) {
      const index = this.currentSlide > 0 ? this.currentSlide + step : this.trendingData.length - 1;
      this.setCurrentSlide(index);
      this.direction = 'left';
      this.startSlideTimer();
    },
    _next(step = 1) {
      const index = this.currentSlide < this.trendingData.length - 1 ? this.currentSlide + step : 0;
      this.setCurrentSlide(index);
      this.direction = 'right';
    },
    next(step = 1) {
      this._next(step);
      this.startSlideTimer();
    },
    startSlideTimer() {
      this.stopSlideTimer();
      this.slideInterval = setInterval(() => {
        this._next();
      }, this.interval);
    },
    stopSlideTimer() {
      clearInterval(this.slideInterval);
    },
    switchSlide(index) {
      const step = index - this.currentSlide;
      if (step > 0) {
        this.next(step);
      } else {
        this.prev(step);
      }
    }
  },
  mounted() {
    this.startSlideTimer();
  },
  beforeUnmount() {
    this.stopSlideTimer();
  }
}
</script>

<template>
  <div class="flex justify-center">
    <div class="relative w-[100vw] h-[100vh] overflow-hidden">
      <CarouselIndicators :total="trendingData.length" :current-index="currentSlide" @switch="switchSlide($event)" />
      <TrendingItem v-for="(item, index) in trendingData" :key="`item-${index}`" :trending-item="trendingData"
        :index="index" :current-slide="currentSlide" :direction="direction" @mouseenter="stopSlideTimer"
        @mouseout="startSlideTimer" />
      <CarouselControls @prev="prev" @next="next" />
    </div>
  </div>
</template>