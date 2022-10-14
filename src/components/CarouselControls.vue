<script>
export default {
  name: 'CarouselControls',
  emits: ['prev', 'next'],
}
</script>

<template>
  <button class="absolute bg-primary border-none inline-block w-[70px] h-[50px] top-[50%] cursor-pointer left-0"
    @click="$emit('next')">Prev</button>
  <button class="absolute bg-primary border-none inline-block w-[70px] h-[50px] top-[50%] cursor-pointer right-0"
    @click="$emit('prev')">Next</button>
</template>