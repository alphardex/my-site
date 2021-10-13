<template>
  <div class="fixed z-5 top-20 left-20">
    <router-link :to="{ name: 'Home' }">
      <div class="font-bold text-lg fade-in">ALPHARDEX</div>
    </router-link>
  </div>
  <div class="fixed z-5 top-20 right-20">
    <router-link :to="{ name: 'About' }">
      <div class="text-lg fade-in">About</div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SiteTitle",
});
</script>
