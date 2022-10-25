<script>
import { getMovieDetail, getMovieCredits, getMovieImages } from "../api/index.js";
import Button from '../components/Button.vue';
import Slider from '../components/Slider.vue';

export default {
  name: 'MovieDetail',
  components: {
    Button,
    Slider,
  },
  data() {
    return {
      id: this.$route.params.id,
      movieData: Object,
      creditsData: Object,
      imagesData: Object,
      imageUrl: 'https://image.tmdb.org/t/p/original',
    }
  },
  methods: {
    async getMovieDetailData(id) {
      return (await getMovieDetail(id)).data;
    },
    async getCreditsData(id) {
      return (await getMovieCredits(id)).data;
    },
    async getImagesData(id) {
      return (await getMovieImages(id)).data.backdrops;
    },
    getDirector(){
      const crew = this.creditsData.crew;
      const director = crew.filter(crew => crew.job === 'Director');
      return director[0].name;
    },
  },
  async created() {
    this.movieData = await this.getMovieDetailData(this.id);
    this.creditsData = await this.getCreditsData(this.id);
    this.imagesData = await this.getImagesData(this.id);
  },
}
</script>

<template>
  <div class="absolute w-screen h-screen -z-10" :style="{
    backgroundImage: 'url(' + imageUrl + movieData.backdrop_path + ')',
    backgroundSize: 'cover',
    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), 70%, rgba(0,0,0,0))',
  }"></div>
  <div class="absolute w-screen h-[15%] -z-10" :style="{
    backgroundColor: '#1B1A17',
    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0))',
  }"></div>
  <div class="flex w-[80vw] m-auto -z-10">
    <div class="pt-[40vh] w-[75%]">
      <h1 class="text-3xl font-bold">{{ movieData.title }}</h1>
      <h3>Original title: {{ movieData.original_title }}</h3>

      <h3 class="font-bold mt-4">{{ movieData.runtime }} minutes • {{ movieData.release_date.slice(0, 4) }} • {{
      movieData.vote_average.toFixed(1) }} Score</h3>

      <p class="mt-4">{{ movieData.overview }}</p>
      <Button :text="'Watch Trailer'" :class="['bg-primary', 'py-3', 'px-8', 'rounded-full', 'mt-8']" />
      <h3 class="font-bold mt-8">{{ getDirector() }}</h3>
      <h3>Director</h3>
    </div>
    <div class="pt-[40vh] ml-12">
      <h1 class="text-2xl font-bold">Top Cast</h1>
      <div>
        <div class="flex items-center my-4" v-for="(n, i) in 4">
          <div class="w-[80px] h-[80px] rounded-full" :style="{
            backgroundImage: 'url(' + imageUrl + creditsData.cast[i].profile_path + ')',
            backgroundSize: 'cover',
            backgroundPosition: '0px 35%'
          }">
          </div>
          <div class="ml-4">
            <h3 class="font-bold">{{ creditsData.cast[i].name }}</h3>
            <h3>as {{ creditsData.cast[i].character }}</h3>
          </div>
        </div>
        <a href="" class="text-primary font-bold">View all</a>
      </div>
    </div>
  </div>
  <div class="w-[80vw] m-auto">
    <h1 class="text-2xl font-bold">Backdrops</h1>
    <Slider :compo="'ImageItem'" :api-data="imagesData" :width="'w-[80vw]'" />
  </div>
</template>