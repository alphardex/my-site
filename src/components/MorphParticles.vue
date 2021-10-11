<template>
  <div
    class="morph-particles absolute z-0 w-screen h-screen overflow-hidden"
  ></div>
</template>

<script lang="ts">
import MorphParticles from "@/scenes/morphParticles";
import { defineComponent, onMounted, onUnmounted, reactive } from "vue";

export default defineComponent({
  name: "MorphParticles",
  setup() {
    const state = reactive({
      timer: null,
      morphParticles: null,
    });
    const start = () => {
      const morphParticles = new MorphParticles(".morph-particles", false);
      morphParticles.init();
      state.morphParticles = morphParticles;
    };
    const changeParticleByInterval = () => {
      const timer = setInterval(() => {
        state.morphParticles.changeParticles();
      }, 2000);
      state.timer = timer;
    };
    onMounted(() => {
      start();
      changeParticleByInterval();
    });
    onUnmounted(() => {
      if (state.timer) {
        clearInterval(state.timer);
      }
    });
  },
});
</script>
