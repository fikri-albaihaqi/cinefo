<script>
import { getMovieDetail, getMovieCredits, getMovieImages, getMovieVideos } from "../api/index.js";
import Button from '../components/Button.vue';
import ImageItem from '../components/ImageItem.vue';

export default {
  name: 'MovieDetailView',
  components: {
    Button,
    ImageItem,
  },
  data() {
    return {
      id: this.$route.params.id,
      movieData: Object,
      creditsData: Object,
      imagesData: Object,
      trailerData: Object,
      imageUrl: 'https://image.tmdb.org/t/p/original',
      videoVisibility: 'hidden',
      imageVisibility: 'hidden',
      youtubeUrl: 'https://www.youtube.com/embed/',
      selectedImage: '',
      hasTrailer: true,
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
    async getTrailerData(id) {
      const videos = (await getMovieVideos(id)).data.results;
      const trailer = videos.filter(video => (video.name.includes('Trailer')) && (video.type === 'Trailer'));
      if (trailer.length == 0) {
        this.hasTrailer = false;
      }
      return trailer[0];
    },
    getDirector() {
      const crew = this.creditsData.crew;
      const director = crew.filter(crew => crew.job === 'Director');
      return director[0].name;
    },
    stopVideo() {
      const iframe = this.$refs.video;
      const temp = iframe.src;
      iframe.src = temp;
      this.videoVisibility = 'hidden';
    },
    showImage(n) {
      this.imageVisibility = '';
      this.selectedImage = n;
    }
  },
  async created() {
    this.movieData = await this.getMovieDetailData(this.id);
    this.creditsData = await this.getCreditsData(this.id);
    this.imagesData = await this.getImagesData(this.id);
    this.trailerData = await this.getTrailerData(this.id);
  },
}
</script>

<template>
  <div class="hidden lg:block absolute w-screen h-screen -z-10" :style="{
    backgroundImage: 'url(' + imageUrl + movieData.backdrop_path + ')',
    backgroundSize: 'cover',
    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), 70%, rgba(0,0,0,0))',
  }"></div>
  <div class="absolute lg:hidden w-screen h-screen -z-10" :style="{
    backgroundImage: 'url(' + imageUrl + movieData.poster_path + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), 70%, rgba(0,0,0,0))',
  }"></div>
  <div class="absolute w-screen h-[15%] -z-10" :style="{
    backgroundColor: '#1B1A17',
    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0))',
  }"></div>
  <div v-if="hasTrailer" class="fixed top-0 w-screen h-screen z-50" :class="videoVisibility"
    :style="{ backgroundColor: 'rgba(0,0,0,0.8)' }">
    <span class="absolute material-symbols-outlined text-3xl md:text-5xl right-10 top-4 cursor-pointer"
      @click="stopVideo()">
      close
    </span>
    <div class="relative top-32 lg:top-0 w-[95vw] lg:w-[80vw] h-1/2 lg:h-full m-auto flex justify-center items-center">
      <iframe ref="video" class="w-full h-[60%] md:h-[80%] lg:h-[80%] xl:h-[90%]" :src="youtubeUrl + trailerData.key">
      </iframe>
    </div>
  </div>
  <div class="fixed top-0 w-screen h-screen z-50" :class="imageVisibility"
    :style="{ backgroundColor: 'rgba(0,0,0,0.8)' }">
    <span class="absolute material-symbols-outlined text-3xl md:text-5xl right-10 top-4 cursor-pointer"
      @click="imageVisibility = 'hidden'">
      close
    </span>
    <div class="w-[80vw] h-full m-auto flex items-center">
      <img :src="selectedImage" alt="">
    </div>
  </div>
  <div class="flex flex-col w-[90vw] md:w-[80vw] m-auto -z-10">
    <div class="md:flex" data-aos="fade-up" data-aos-delay="300">
      <div class="pt-16 md:pt-40 xl:pt-[40vh] md:w-[75%]">
        <h1 class="text-3xl font-bold">{{ movieData.title }}</h1>
        <h3>Original title: {{ movieData.original_title }}</h3>

        <h3 class="font-bold mt-4">{{ movieData.runtime }} minutes • {{ movieData.release_date.slice(0, 4) }} • {{
            movieData.vote_average.toFixed(1)
        }} Score</h3>

        <p class="mt-4">{{ movieData.overview }}</p>
        <Button v-if="hasTrailer" :text="'Watch Trailer'" @click="videoVisibility = ''"
          :class="['bg-primary', 'py-3', 'px-8', 'rounded-full', 'mt-8']" />
        <h3 class="font-bold mt-8">{{ getDirector() }}</h3>
        <h3>Director</h3>
        <div class="flex mt-8">
          <h3 class="text-xs mr-2 bg-slate-500 px-4 py-2 rounded-full" v-for="(i, n) in movieData.genres">{{
              movieData.genres[n].name
          }}</h3>
        </div>
      </div>
      <div class="pt-16 md:pt-40 xl:pt-[40vh] md:ml-12">
        <h1 class="text-2xl font-bold">Top Cast</h1>
        <div>
          <router-link :to="{ name: 'person-detail', params: { id: creditsData.cast[i].id } }"
            class="flex items-center my-4" v-for="(n, i) in 4">
            <div v-if="creditsData.cast[i].profile_path != null" class="w-[80px] h-[80px] rounded-full" :style="{
              backgroundImage: 'url(' + imageUrl + creditsData.cast[i].profile_path + ')',
              backgroundSize: 'cover',
              backgroundPosition: '0px 35%'
            }">
            </div>
            <div v-if="creditsData.cast[i].profile_path == null" class="bg-gray-300 w-[80px] h-[80px] rounded-full"></div>
            <div class="ml-4">
              <h3 class="font-bold">{{ creditsData.cast[i].name }}</h3>
              <h3>as {{ creditsData.cast[i].character }}</h3>
            </div>
          </router-link>
          <router-link :to="{ name: 'cast', params: { media: 'movie', id: movieData.id } }"
            class="text-primary font-bold">View all</router-link>
        </div>
      </div>
    </div>
    <div class="w-[90vw] md:w-[80vw] m-auto mt-16">
      <h1 class="text-2xl font-bold">Backdrops</h1>
      <div class="grid grid-cols-2 md:grid-cols-3 justify-item-center mt-4 lg:mt-8">
        <ImageItem @image-selected="showImage" :api-data="imagesData" v-for="(item, index) in imagesData" :key="`item-${index}`"
          :index="index" data-aos="fade-up" />
      </div>
    </div>
  </div>
</template>