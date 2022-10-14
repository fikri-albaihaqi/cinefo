<script>
export default {
  name: 'Navbar',
}
</script>

<template>
  <nav class="m-auto w-[80vw]">
    <div class="flex justify-between fixed w-[80%] items-center text-white p-8">
      <a href="" class="font-lexend-exa font-bold text-2xl"><span class="text-primary">C</span>inefo</a>
      <input @keyup.enter="" class="
            mx-2
            p-2
            rounded-lg
            bg-white/20
            backdrop-blur-sm
            placeholder:text-white/60 placeholder:italic
            w-[80vh]
          " type="text" placeholder="Search movies, TV shows, actors, more..." />
      <div class="font-lexend">
        <a class="p-4 hover:text-primary" href="">Movies</a>
        <a class="p-4 hover:text-primary" href="">TV Shows</a>
        <a class="p-4 hover:text-primary" href="">People</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend+Exa&display=swap');
</style>