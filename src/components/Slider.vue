<script>
import CardItem from './CardItem.vue';
import ImageItem from './ImageItem.vue';
import CarouselControls from './CarouselControls.vue';
import CarouselIndicators from './CarouselIndicators.vue';

export default {
  name: 'Slider',
  components: {
    CardItem,
    ImageItem,
    CarouselControls,
    CarouselIndicators,
  },
  props: {
    apiData: Object,
    compo: String,
    mediaType: String,
    margin: String,
    upcoming: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      sliderWidth: 0,
      offset: 0,
      animation: '',
      cardElement: '',
      cardMarginRight: 0,
    }
  },
  methods: {
    prev() {
      if (this.offset !== 0) {
        this.offset += this.sliderWidth + this.cardMarginRight;
        this.animation = `translateX(${this.offset}px)`
        // console.log(this.offset);
      }
    },
    next() {
      const maxX = -((this.apiData.length / 5) * this.sliderWidth +
        (this.cardMarginRight * (this.apiData.length / 5)) -
        this.sliderWidth - this.cardMarginRight);
      if (this.offset !== maxX) {
        this.offset -= this.sliderWidth + this.cardMarginRight;
        this.animation = `translateX(${this.offset}px)`
        // console.log(maxX);
        // console.log(this.offset);
      }
    },
    assignCardElement(n) {
      this.cardElement = n;
      this.cardMarginRight = Number(this.cardElement.marginRight.match(/\d+/g)[0]);
    }
  },
  mounted() {
    this.sliderWidth = this.$refs.slider.clientWidth;
  }
}
</script>

<template>
  <div ref="slider" class="flex relative w-full overflow-hidden border-white mt-8">
    <component ref="card" @card-element-sent="assignCardElement" :upcoming="upcoming" :styling="animation" :is="compo"
      v-for="(item, index) in apiData" :key="`item-${index}`" :api-data="apiData" :index="index" :mediaType="mediaType"
      :margin="margin" />
    <CarouselControls :top="'top-[35%]'" @prev="prev" @next="next" />
  </div>
</template>

<style scoped>
.card {
  transition: all 1s ease;
}
</style>