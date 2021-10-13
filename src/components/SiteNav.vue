<template>
  <div class="fixed z-5 top-20 right-20">
    <div class="flex items-center space-x-12">
      <router-link
        :to="{ name: item.path }"
        v-for="(item, i) in navItems"
        :key="i"
      >
        <div class="text-lg fade-in">{{ item.name }}</div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { navItems } from "@/consts";
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "SiteNav",
  setup() {
    const state = reactive({
      navItems,
    });
    return { ...toRefs(state) };
  },
});
</script>
