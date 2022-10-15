<script>
export default {
  name: 'CarouselControls',
  emits: ['prev', 'next'],
}
</script>

<template>
  <button class="absolute border-none inline-block w-[70px] h-[50px] top-[50%] cursor-pointer left-0"
    @click="$emit('next')"><span class="material-symbols-outlined text-6xl">chevron_left</span></button>
  <button class="absolute border-none inline-block w-[70px] h-[50px] top-[50%] cursor-pointer right-0"
    @click="$emit('prev')"><span class="material-symbols-outlined text-6xl">chevron_right</span></button>
</template>