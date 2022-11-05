<script>
import { getTvDetail, getTvCredits, getTvImages, getTvVideos } from "../api/index.js";
import Button from '../components/Button.vue';
import ImageItem from "../components/ImageItem.vue";

export default {
  name: 'TvDetailView',
  components: {
    Button,
    ImageItem,
  },
  data() {
    return {
      id: this.$route.params.id,
      tvData: Object,
      creditsData: Object,
      imagesData: Object,
      imageUrl: 'https://image.tmdb.org/t/p/original',
      videoVisibility: 'hidden',
      imageVisibility: 'hidden',
      trailerData: Object,
      youtubeUrl: 'https://www.youtube.com/embed/',
    }
  },
  methods: {
    async getTvDetailData(id) {
      return (await getTvDetail(id)).data;
    },
    async getCreditsData(id) {
      return (await getTvCredits(id)).data;
    },
    async getImagesData(id) {
      return (await getTvImages(id)).data.backdrops;
    },
    async getTrailerData(id) {
      const videos = (await getTvVideos(id)).data.results;
      const trailer = videos.filter(video => (video.name.includes('Trailer')) && (video.type === 'Trailer'));
      return trailer[0];
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
    },
  },
  async created() {
    this.tvData = await this.getTvDetailData(this.id);
    this.creditsData = await this.getCreditsData(this.id);
    this.imagesData = await this.getImagesData(this.id);
    this.trailerData = await this.getTrailerData(this.id);
  },
}
</script>

<template>
  <div class="absolute w-screen h-screen -z-10" :style="{
    backgroundImage: 'url(' + imageUrl + tvData.backdrop_path + ')',
    backgroundSize: 'cover',
    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), 70%, rgba(0,0,0,0))',
  }"></div>
  <div class="absolute w-screen h-[15%] -z-10" :style="{
    backgroundColor: '#1B1A17',
    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0))',
  }"></div>
  <div class="fixed w-screen h-screen z-50" :class="videoVisibility" :style="{ backgroundColor: 'rgba(0,0,0,0.8)' }">
    <span class="absolute material-symbols-outlined text-5xl right-10 top-4 cursor-pointer" @click="stopVideo()">
      close
    </span>
    <div class="w-[80vw] h-full m-auto flex items-center">
      <iframe ref="video" class="w-full h-[90%]" :src="youtubeUrl + trailerData.key">
      </iframe>
    </div>
  </div>
  <div class="fixed w-screen h-screen z-50" :class="imageVisibility" :style="{ backgroundColor: 'rgba(0,0,0,0.8)' }">
    <span class="absolute material-symbols-outlined text-5xl right-10 top-4 cursor-pointer"
      @click="imageVisibility = 'hidden'">
      close
    </span>
    <div class="w-[80vw] h-full m-auto flex items-center">
      <img :src="selectedImage" alt="">
    </div>
  </div>
  <div class="flex w-[80vw] m-auto -z-10">
    <div class="pt-[40vh] w-[75%]">
      <h1 class="text-3xl font-bold">{{ tvData.name }}</h1>
      <h3>Original title: {{ tvData.original_name }}</h3>

      <h3 class="font-bold mt-4">{{ tvData.episode_run_time[0] || tvData.last_episode_to_air.runtime }} minutes • {{
          tvData.first_air_date.slice(0, 4)
      }} - {{ tvData.last_air_date.slice(0, 4) }} • {{ tvData.number_of_seasons }} {{ tvData.number_of_seasons > 1 ?
    'seasons' : 'season'
}} • {{ tvData.number_of_episodes }} {{ tvData.number_of_episodes > 1 ? 'episodes' : 'episode' }} • {{
    tvData.vote_average.toFixed(1)
}} Score</h3>

      <p class="mt-4">{{ tvData.overview }}</p>
      <Button :text="'Watch Trailer'" @click="videoVisibility = ''"
        :class="['bg-primary', 'py-3', 'px-8', 'rounded-full', 'mt-8']" />
      <div class="flex">
        <div class="mr-16" v-for="creator in tvData.created_by">
          <h3 class="font-bold mt-8">{{ creator.name }}</h3>
          <h3>Creator</h3>
        </div>
      </div>
      <div class="flex mt-8">
        <h3 class="text-xs mr-2 bg-slate-500 px-4 py-2 rounded-full" v-for="(i, n) in tvData.genres">{{
            tvData.genres[n].name
        }}</h3>
      </div>
    </div>
    <div class="pt-[40vh] ml-12" v-if="creditsData.hasOwnProperty('cast')">
      <h1 class="text-2xl font-bold">Top Cast</h1>
      <div>
        <router-link :to="{ name: 'person-detail', params: { id: creditsData.cast[i].id } }"
          class="flex items-center my-4" v-for="(n, i) in 4">
          <div class="w-[80px] h-[80px] rounded-full" :style="{
            backgroundImage: creditsData.cast[i].profile_path !== null ? 'url(' + imageUrl + creditsData.cast[i].profile_path + ')' : 'url(../src/assets/avatar.png)',
            backgroundSize: 'cover',
            backgroundPosition: '0px 35%'
          }">
          </div>
          <div class="ml-4">
            <h3 class="font-bold">{{ creditsData.cast[i].name }}</h3>
            <h3>as {{ creditsData.cast[i].character }}</h3>
          </div>
        </router-link>
        <router-link :to="{ name: 'cast', params: { media: 'tv', id: tvData.id } }" class="text-primary font-bold">View
          all</router-link>
      </div>
    </div>
  </div>
  <div class="w-[80vw] m-auto mt-16">
    <h1 class="text-2xl font-bold">Backdrops</h1>
    <div class="flex flex-wrap justify-center">
      <ImageItem @image-selected="showImage" :api-data="imagesData" v-for="(item, index) in imagesData"
        :key="`item-${index}`" :index="index" :width="'w-[290px]'" />
    </div>
  </div>
</template>