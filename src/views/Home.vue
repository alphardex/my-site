<template>
  <div class="bg-purple-grad-1 min-h-screen">
    <noise-marble></noise-marble>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NoiseMarble from "@/components/NoiseMarble.vue";

export default defineComponent({
  name: "Home",
  components: {
    NoiseMarble,
  },
});
</script>
