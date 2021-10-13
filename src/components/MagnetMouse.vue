<template>
  <use-mouse-in-element
    v-slot="{ elementX, elementY, elementWidth, elementHeight, isOutside }"
  >
    <div
      class="magnet p-6 inline-flex"
      :style="`
      --mouse-x:${isOutside ? 0 : percent(elementX, elementWidth) - offset}%;
      --mouse-y:${isOutside ? 0 : percent(elementY, elementHeight) - offset}%`"
    >
      <slot></slot>
    </div>
  </use-mouse-in-element>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { UseMouseInElement } from "@vueuse/components";
import { percent } from "@/utils/math";

export default defineComponent({
  name: "MagnetMouse",
  components: {
    UseMouseInElement,
  },
  setup() {
    const state = reactive({
      offset: 50,
    });
    return { ...toRefs(state), percent };
  },
});
</script>

<style lang="scss" scoped>
.magnet {
  transform: translate(var(--mouse-x), var(--mouse-y));
  transition: 0.3s;
}
</style>
