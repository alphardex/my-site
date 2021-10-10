<template>
  <div class="text-white bg-blue-grad-1 min-h-screen">
    <grid-icosahedron></grid-icosahedron>
    <site-intro></site-intro>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GridIcosahedron from "@/components/GridIcosahedron.vue";
import SiteIntro from "@/components/SiteIntro.vue";

export default defineComponent({
  name: "Home",
  components: {
    GridIcosahedron,
    SiteIntro,
  },
});
</script>
