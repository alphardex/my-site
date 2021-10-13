<template>
  <div class="fixed z-5 top-14 left-14">
    <magnet-mouse>
      <router-link :to="{ name: 'Home' }">
        <div class="font-bold text-lg">ALPHARDEX</div>
      </router-link>
    </magnet-mouse>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MagnetMouse from "@/components/MagnetMouse.vue";

export default defineComponent({
  name: "SiteTitle",
  components: {
    MagnetMouse,
  },
});
</script>
