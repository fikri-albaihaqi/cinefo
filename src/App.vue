<script setup>
import { RouterView } from 'vue-router'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

AOS.init({ once: true });
</script>

<template>
  <Navbar />
  <div id="container" class="min-h-screen">
    <RouterView />
  </div>
  <Footer />
</template>

