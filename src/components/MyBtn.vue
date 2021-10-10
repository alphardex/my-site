<template>
  <div class="relative flex border border-solid border-info cursor-pointer">
    <div class="flex-center w-40 h-16">
      <slot></slot>
    </div>
    <div class="flex-center w-24 h-16 bg-red-2">
      <div class="triangle-right text-white"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyBtn",
});
</script>
