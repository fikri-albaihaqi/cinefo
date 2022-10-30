<script>
import router from '../router';

export default {
  name: 'Navbar',
  methods: {
    search(queryData) {
      router.push({ name: 'search', params: { query: queryData } });
    }
  }
}
</script>

<template>
  <nav class="m-auto w-[80vw]">
    <div class="flex justify-between absolute w-[80%] items-center text-white p-8">
      <router-link to="/" class="font-lexend-exa font-bold text-2xl"><span class="text-primary">C</span>inefo
      </router-link>
      <input v-model="queryData" @keyup.enter="search(queryData)" class="
            mx-2
            p-2
            rounded-lg
            bg-white/20
            backdrop-blur-sm
            placeholder:text-white/60 placeholder:italic
            w-[80vh]
          " type="text" placeholder="Search movies, TV shows, actors, more..." />
      <div>
        <li class="p-4 inline-block hover:cursor-pointer hover:text-primary">
          Movies
          <div class="dropdown-content hidden absolute bg-primary w-[160px] mt-2 rounded-md text-white">
            <router-link :to="{ name: 'movies', params: { type: 'popular' } }"
              class="block text-left p-2 hover:bg-white hover:text-primary hover:rounded-t-md">Popular</router-link>
            <router-link :to="{ name: 'movies', params: { type: 'upcoming' } }"
              class="block text-left p-2 hover:bg-white hover:text-primary">Upcoming</router-link>
            <router-link :to="{ name: 'movies', params: { type: 'top rated' } }"
              class="block text-left p-2 hover:bg-white hover:text-primary hover:rounded-b-md">Top Rated</router-link>
          </div>
        </li>
        <li class="p-4 inline-block hover:cursor-pointer hover:text-primary">
          TV Shows
          <div class="dropdown-content hidden absolute bg-primary w-[160px] mt-2 rounded-md text-white">
            <router-link router-link :to="{ name: 'tvs', params: { type: 'popular' } }"
              class="block text-left p-2 hover:bg-white hover:text-primary hover:rounded-t-md" href="">Popular
            </router-link>
            <router-link router-link :to="{ name: 'tvs', params: { type: 'top rated' } }"
              class="block text-left p-2 hover:bg-white hover:text-primary hover:rounded-b-md" href="">Top Rated
            </router-link>
          </div>
        </li>
        <router-link :to="{ name: 'people' }" class="p-4 hover:text-primary" href="">People</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend+Exa&display=swap');

li {
  transition: background-color 0.5s;
}

li:hover .dropdown-content {
  display: block;
}
</style>