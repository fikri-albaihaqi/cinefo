<script>
import Trending from './Trending.vue';
import CarouselControls from './CarouselControls.vue';
import CarouselIndicators from './CarouselIndicators.vue';

export default {
  name: 'ImageSlider',
  components: {
    Trending,
    CarouselControls,
    CarouselIndicators,
  },
  props: {
    apiData: Object,
    interval: {
      type: Number,
      default: 10000,
    },
    compo: String,
    width: String,
    height: String,
    itemWidth: String, 
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
      const index = this.currentSlide > 0 ? this.currentSlide + step : this.apiData.length - 1;
      this.setCurrentSlide(index);
      this.direction = 'left';
      this.startSlideTimer();
    },
    _next(step = 1) {
      const index = this.currentSlide < this.apiData.length - 1 ? this.currentSlide + step : 0;
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
    <div class="flex justify-center" :class="height">
      <CarouselIndicators :total="apiData.length" :current-index="currentSlide" @switch="switchSlide($event)" />
      <a :class="itemWidth" href="">
        <component :is="compo" v-for="(item, index) in apiData" :key="`item-${index}`" :api-data="apiData"
          :index="index" :current-slide="currentSlide" :direction="direction">
        </component>
      </a>
      <CarouselControls :top="'top-[50%]'" @prev="prev" @next="next" />
    </div>
  </div>
</template>