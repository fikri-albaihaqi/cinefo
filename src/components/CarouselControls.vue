<script>
export default {
  name: 'CarouselControls',
  emits: ['prev', 'next'],
  props: {
    top: String,
  }
}
</script>

<template>
  <button class="absolute border-none inline-block w-[70px] h-[50px] cursor-pointer left-0" :class="top"
    @click="$emit('prev')"><span class="material-symbols-outlined text-3xl md:text-6xl">chevron_left</span></button>
  <button class="absolute border-none inline-block w-[70px] h-[50px] cursor-pointer right-0" :class="top"
    @click="$emit('next')"><span class="material-symbols-outlined text-3xl md:text-6xl">chevron_right</span></button>
</template>