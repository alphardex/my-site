<template>
  <div class="min-h-screen">
    <about-me></about-me>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import ky from "kyouka";
import AboutMe from "@/components/AboutMe.vue";

export default defineComponent({
  name: "About",
  components: {
    AboutMe,
  },
  setup() {
    const state = reactive<any>({});
    return { ky, ...toRefs(state) };
  },
});
</script>

<style lang="scss" scoped></style>
