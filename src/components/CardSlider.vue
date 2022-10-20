<script>
import CardItem from './CardlItem.vue';
import CarouselControls from './CarouselControls.vue';
import CarouselIndicators from './CarouselIndicators.vue';

export default {
  name: 'ImageSlider',
  components: {
    CardItem,
    CarouselControls,
    CarouselIndicators,
  },
  props: {
    apiData: Object,
    compo: String,
    width: String,
    height: String,
    itemWidth: String,
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
        console.log(this.offset);
        // this.$refs.card.style.transform = `translateX(${this.offset}px)`;
      }
    },
    next() {
      const maxX = -((this.apiData.length / 5) * this.sliderWidth +
        (this.cardMarginRight * (this.apiData.length / 5)) -
        this.sliderWidth - this.cardMarginRight);
      if (this.offset !== maxX) {
        this.offset -= this.sliderWidth + this.cardMarginRight;
        this.animation = `translateX(${this.offset}px)`
        console.log(maxX);
        console.log(this.offset);
        // this.$refs.card.style.transform = `translateX(${this.offset}px)`;
      }
    },
    assignCardElement(n) {
      this.cardElement = n;
      this.cardMarginRight = Number(this.cardElement.marginRight.match(/\d+/g)[0]);
      // console.log(this.cardElement.marginRight.match(/\d+/g)[0]);
      // console.log(this.cardMarginRight);
    }
  },
  mounted() {
    this.sliderWidth = this.$refs.slider.clientWidth;
    console.log(this.sliderWidth);
  }
}
</script>

<template>
  <div ref="slider" class="flex relative w-full overflow-hidden border-white mt-8">
    <component ref="card" @card-element-sent="assignCardElement" :styling="animation" :is="compo"
      v-for="(item, index) in apiData" :key="`item-${index}`" :api-data="apiData" :index="index" />
    <CarouselControls :top="'top-[35%]'" @prev="prev" @next="next" />
  </div>
</template>

<style scoped>
.card {
  transition: all 1s ease;
}
</style>