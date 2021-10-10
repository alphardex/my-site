<template>
  <div class="text-white bg-blue-grad-1 min-h-screen">
    <div class="transition-all duration-400" :class="{ 'opacity-0': !loading }">
      <twisted-shape></twisted-shape>
    </div>
    <div class="transition-all duration-1000" :class="{ 'opacity-0': loading }">
      <grid-icosahedron></grid-icosahedron>
      <site-intro></site-intro>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import TwistedShape from "@/components/TwistedShape.vue";
import GridIcosahedron from "@/components/GridIcosahedron.vue";
import SiteIntro from "@/components/SiteIntro.vue";
import { preloadImages } from "@/utils/dom";

export default defineComponent({
  name: "Home",
  components: {
    TwistedShape,
    GridIcosahedron,
    SiteIntro,
  },
  setup() {
    const state = reactive({
      loading: true,
    });
    onMounted(async () => {
      await preloadImages();
      state.loading = false;
    });
    return { ...toRefs(state) };
  },
});
</script>
