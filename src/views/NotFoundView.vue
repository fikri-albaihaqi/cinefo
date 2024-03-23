<script>
import Button from '../components/Button.vue';

export default {
  name: 'NotFound',
  components: {
    Button
  }
}
</script>

<template>
  <main class="h-screen flex flex-col justify-center items-center bg-not-found bg-cover">
    <div class="w-screen h-screen absolute bg-black opacity-40 -z-1"></div>
    <h1 class="relative z-1 text-4xl">
      <span class="font-normal">Sorry we can’t find what you’re looking for.</span>
      <br>
      <br>
      <br>
      <span class="font-bold">“Not all those who wander are lost.”</span>
      <br>
      <span class="text-base">- J.R.R. Tolkien (from "The Lord of the Rings: The Fellowship of the Ring")</span>
    </h1>
    <router-link :to="{name: 'home'}">
      <Button :text="'Return Home'" :class="['relative', 'z-1', 'bg-primary', 'py-3', 'px-8', 'rounded-full', 'mt-16']" />
    </router-link>
  </main>
</template>