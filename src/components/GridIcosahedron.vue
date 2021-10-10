<template>
  <div
    class="
      grid-icosahedron
      absolute
      z-0
      top-0
      left-0
      w-screen
      h-screen
      overflow-hidden
    "
  ></div>
</template>

<script lang="ts">
import GridIcosahedron from "@/scenes/gridIcosahedron";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "GridIcosahedron",
  setup() {
    const start = () => {
      const gridIcosahedron = new GridIcosahedron(".grid-icosahedron", false);
      gridIcosahedron.init();
    };
    onMounted(() => {
      start();
    });
  },
});
</script>
