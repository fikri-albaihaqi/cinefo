<script>
export default {
  name: 'CardItem',
  emits: ['card-element-sent'],
  props: {
    index: Number,
    apiData: Object,
    styling: String,
    upcoming: Boolean,
    mediaType: String,
    margin: String,
    hide: String,
  },
  data() {
    return {
      imageUrl: 'https://image.tmdb.org/t/p/original',
      cardElement: [],
      monthNames: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
      score: ''
    }
  },
  methods: {
    changeDateFormat() {
      const newDate = new Date(this.apiData[this.index].release_date);
      return `${newDate.getDate()} ${this.monthNames[newDate.getMonth()]}, ${newDate.getFullYear()}`;
    },
    getRouteName() {
      if (this.mediaType === 'movie') {
        return 'movie-detail';
      } else if (this.mediaType === 'tv') {
        return 'tv-detail';
      } else if (this.mediaType === 'person') {
        return 'person-detail';
      }
    },
    getPosterPath() {
      if (this.mediaType === 'movie' || 'tv') {
        if (this.apiData[this.index].poster_path === null) {
          return '../src/assets/blank-image.png';
        }
        return this.imageUrl + this.apiData[this.index].poster_path;
      }
    },
    getProfilePath() {
      if (this.mediaType === 'person') {
        if (this.apiData[this.index].profile_path === null) {
          return '../src/assets/blank-image.png';
        }
        return this.imageUrl + this.apiData[this.index].profile_path;
      }
    },
  },
  mounted() {
    this.cardElement = window.getComputedStyle(this.$refs.card);
    this.$emit('card-element-sent', this.cardElement);
    if (this.mediaType !== 'person') {
      this.score = this.apiData[this.index].vote_average.toFixed(1) + ' Score';
    }
  }
}
</script>

<template>
  <div ref="card" class="card w-[100px] md:w-[110px] lg:w-[150px] xl:w-[200px] my-2" :class="margin" :style="{ transform: styling }">
    <router-link :to="{ name: getRouteName(), params: { id: apiData[index].id } }">
      <img class="min-w-[100px] md:min-w-[110px] lg:min-w-[150px] xl:min-w-[200px] xl:h-[300px] rounded-lg"
        :src="mediaType === 'person' ? getProfilePath() : getPosterPath()"
        alt="">
      <div class=" mt-2">
        <h1 class="truncate">{{ apiData[index].title ||
            apiData[index].name
        }}</h1>
        <h3 class="text-sm text-gray-400 mb-4" :class="hide">{{ upcoming ? changeDateFormat() :
            score
        }}</h3>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.card {
  transition: all 1s ease;
}
</style>