<template>
  <div class="twisted-shape fixed z-5 w-screen h-screen overflow-hidden"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import TwistedShape from "@/scenes/twistedShape";

export default defineComponent({
  name: "TwistedShape",
  setup() {
    const start = () => {
      const twistedShape = new TwistedShape(".twisted-shape", false);
      twistedShape.init();
    };
    onMounted(() => {
      start();
    });
  },
});
</script>
