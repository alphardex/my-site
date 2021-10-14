<template>
  <div class="my-btn relative border border-solid border-info cursor-pointer">
    <div class="my-btn-overlay absolute cover bg-red-2"></div>
    <div class="relative z-1">
      <div class="flex">
        <div class="flex-center w-40 h-16">
          <magnet-mouse>
            <slot></slot>
          </magnet-mouse>
        </div>
        <div class="flex-center w-24 h-16">
          <div class="triangle-right text-white"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MagnetMouse from "@/components/MagnetMouse.vue";

export default defineComponent({
  name: "MyBtn",
  components: {
    MagnetMouse,
  },
});
</script>

<style lang="scss" scoped>
.my-btn {
  &-overlay {
    transform-origin: right;
    transform: scaleX(0.375);
    transition: 0.4s ease-in-out;
  }

  &:hover {
    .my-btn-overlay {
      transform: scaleX(1);
      background: var(--red-color-1);
    }
  }
}
</style>
