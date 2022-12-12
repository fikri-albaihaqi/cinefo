<script>
import router from '../router';

export default {
  name: 'Navbar',
  data() {
    return {
      showMenu: false,
      showMoviesMenu: false,
      showTvsMenu: false,
    }
  },
  methods: {
    search(queryData) {
      router.push({ name: 'search', params: { query: queryData } });
    }
  }
}
</script>

<template>
  <!-- Big screen nav -->
  <nav class="hidden relative z-20 lg:block m-auto">
    <div class="flex justify-between absolute w-screen items-center text-white py-8 lg:px-32 xl:px-36">
      <router-link to="/" class="font-lexend-exa font-bold text-2xl" data-aos="fade-down" data-aos-delay="300"><span
          class="text-primary">C</span>inefo
      </router-link>
      <input v-model="queryData" @keyup.enter="search(queryData)" data-aos="fade-down" data-aos-delay="600" class="
            mx-2
            p-2
            rounded-lg
            bg-white/20
            backdrop-blur-sm
            placeholder:text-white/60 placeholder:italic
            w-[60vh]
          " type="text" placeholder="Search movies, TV shows, actors, more..." />
      <div class="flex">
        <li class="p-4 inline-block hover:cursor-pointer hover:text-primary" data-aos="fade-down" data-aos-delay="700">
          Movies
          <div class="dropdown absolute bg-primary w-[160px] mt-2 rounded-lg text-white">
            <router-link :to="{ name: 'movies', params: { type: 'popular' } }" 
              class="block text-left p-2 hover:bg-white hover:text-primary hover:rounded-t-lg">Popular</router-link>
            <router-link :to="{ name: 'movies', params: { type: 'upcoming' } }"
              class="block text-left p-2 hover:bg-white hover:text-primary">Upcoming</router-link>
            <router-link :to="{ name: 'movies', params: { type: 'top_rated' } }"
              class="block text-left p-2 hover:bg-white hover:text-primary hover:rounded-b-lg">Top Rated</router-link>
          </div>
        </li>
        <li class="p-4 inline-block hover:cursor-pointer hover:text-primary whitespace-nowrap" data-aos="fade-down" data-aos-delay="800">
          TV Shows
          <div class="dropdown absolute bg-primary w-[160px] mt-2 rounded-lg text-white">
            <router-link router-link :to="{ name: 'tvs', params: { type: 'popular' } }"
              class="block text-left p-2 hover:bg-white hover:text-primary hover:rounded-t-lg" href="">Popular
            </router-link>
            <router-link router-link :to="{ name: 'tvs', params: { type: 'top_rated' } }"
              class="block text-left p-2 hover:bg-white hover:text-primary hover:rounded-b-lg" href="">Top Rated
            </router-link>
          </div>
        </li>
        <router-link :to="{ name: 'people' }" class="p-4 hover:text-primary" href="" data-aos="fade-down" data-aos-delay="900">People</router-link>
      </div>
    </div>
  </nav>

  <!-- Small screen nav -->
  <nav class="m-auto w-screen lg:hidden">
    <div class="flex flex-col justify-center items-center w-screen text-white p-8">
      <router-link to="/" class="font-lexend-exa font-bold text-2xl"><span class="text-primary">C</span>inefo
      </router-link>
      <div class="flex justify-between w-[90vw] mt-4">
        <span class="material-symbols-outlined font-bold text-4xl cursor-pointer" @click="showMenu = !showMenu">
          menu
        </span>
        <input v-model="queryData" @keyup.enter="search(queryData)" class="
            mx-2
            p-2
            rounded-lg
            bg-white/20
            backdrop-blur-sm
            placeholder:text-white/60 placeholder:italic
            w-full
          " type="text" placeholder="Search movies, TV shows, actors, more..." />
      </div>
    </div>
  </nav>

  <Transition name="slide">
    <div v-if="showMenu" class="fixed top-0 lg:hidden flex flex-col bg-background h-screen w-[60vw] z-50">
      <div class="w-full h-[60px] bg-black">
        <span class="material-symbols-outlined absolute cursor-pointer text-white text-2xl font-bold right-5 mt-3"
          @click="showMenu = !showMenu">
          close
        </span>
      </div>
      <li class="inline-block hover:cursor-pointer hover:text-primary p-2"
        :class="showMoviesMenu === true ? 'text-primary' : 'text-white'" @click="showMoviesMenu = !showMoviesMenu">
        <div class="flex items-center">
          <span class="material-symbols-outlined mr-2 text-2xl">
            theaters
          </span>
          <h1>Movies</h1>
        </div>
        <Transition name="slide-fade">
          <div v-if="showMoviesMenu" class="dropdown-content bg-background ml-8 mt-2 text-white">
            <router-link :to="{ name: 'movies', params: { type: 'popular' } }"
              class="block text-left py-2 hover:text-primary">Popular</router-link>
            <router-link :to="{ name: 'movies', params: { type: 'upcoming' } }"
              class="block text-left py-2 hover:text-primary">Upcoming</router-link>
            <router-link :to="{ name: 'movies', params: { type: 'top_rated' } }"
              class="block text-left py-2 hover:text-primary">Top Rated</router-link>
          </div>
        </Transition>
      </li>
      <li class="inline-block hover:cursor-pointer hover:text-primary p-2"
        :class="showTvsMenu === true ? 'text-primary' : 'text-white'" @click="showTvsMenu = !showTvsMenu">
        <div class="flex items-center">
          <span class="material-symbols-outlined mr-2 text-2xl">
            tv
          </span>
          <h1>TV Shows</h1>
        </div>
        <Transition name="slide-fade">
          <div v-if="showTvsMenu" class="dropdown-content mt-2 text-white ml-8">
            <router-link router-link :to="{ name: 'tvs', params: { type: 'popular' } }"
              class="block text-left py-2 hover:text-primary" href="">Popular
            </router-link>
            <router-link router-link :to="{ name: 'tvs', params: { type: 'top_rated' } }"
              class="block text-left py-2 hover:text-primary" href="">Top Rated
            </router-link>
          </div>
        </Transition>
      </li>
      <router-link :to="{ name: 'people' }" class="p-2 hover:text-primary" href="">
        <div class="flex items-center">
          <span class="material-symbols-outlined mr-2 text-2xl">
            people
          </span>
          <h1>People</h1>
        </div>
      </router-link>
    </div>
  </Transition>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend+Exa&display=swap');

li {
  transition: background-color 0.5s;
}

.dropdown {
  display: none;
}

li:hover .dropdown {
  display: block;
}

/* main menu animation */
.slide-enter-active {
  transition: all 0.1s ease-out;
}

.slide-leave-active {
  transition: all 0.1s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

/* sub menu animation */
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>