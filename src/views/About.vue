<template>
  <div class="min-h-screen"></div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import ky from "kyouka";

export default defineComponent({
  name: "About",
  setup() {
    const state = reactive<any>({});
    return { ky, ...toRefs(state) };
  },
});
</script>

<style lang="scss" scoped></style>
