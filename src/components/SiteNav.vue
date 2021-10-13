<template>
  <div class="fixed z-5 top-14 right-14">
    <div class="relative flex items-center">
      <div v-for="(item, i) in navItems" :key="i">
        <magnet-mouse>
          <router-link :to="{ name: item.path }">
            <div class="text-lg">{{ item.name }}</div>
          </router-link>
        </magnet-mouse>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { navItems } from "@/consts";
import { defineComponent, reactive, toRefs } from "vue";
import MagnetMouse from "@/components/MagnetMouse.vue";

export default defineComponent({
  name: "SiteNav",
  components: {
    MagnetMouse,
  },
  setup() {
    const state = reactive({
      navItems,
    });
    return { ...toRefs(state) };
  },
});
</script>
