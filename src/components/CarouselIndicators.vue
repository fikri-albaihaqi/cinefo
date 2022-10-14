<script>
export default {
  name: 'CarouselIndicators',
  emits: ['switch'],
  props: ['total', 'currentIndex'],
}
</script>

<template>
  <div class="flex justify-center w-[100vw] absolute bottom-[1.5em] z-index-10">
    <button class="w-[15px] h-[15px] border-none bg-white opacity-50 m-[0.2em] rounded-full cursor-pointer"
      :class="{ active: currentIndex === index }" v-for="(item, index) in total" :key="index"
      @click="$emit('switch', index)"></button>
  </div>
</template>

<style scoped>
.active {
  opacity: 1;
}
</style>