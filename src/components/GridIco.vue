<script lang="ts" setup>
import createSketch from "@/sketches/grid-ico";

import { onMounted, reactive } from "vue";

import gsap from "gsap";

import ky from "kyouka";

let sketch: ReturnType<typeof createSketch> | null = null;

const state = reactive({
  isLoaded: false,
});

onMounted(() => {
  setTimeout(() => {
    sketch = createSketch("#grid-ico-sketch");
    sketch.ico.am.on("ready", () => {
      state.isLoaded = true;
    });
  });
});

const t1 = gsap.timeline();

const moveForward = () => {
  return new Promise((resolve) => {
    if (!sketch?.ico.ico) {
      return;
    }
    t1.to(sketch.ico.ico.position, {
      y: "+=0.2",
      z: "+=1.3",
      duration: 3,
      ease: "power3.inOut",
      onUpdate() {
        if (this.ratio > 0.85) {
          sketch?.ico.disableRandom();
        }
        if (this.ratio > 0.94) {
          resolve(true);
        }
      },
    });
  });
};

const returnBack = () => {
  return new Promise((resolve) => {
    if (!sketch?.ico.ico) {
      return;
    }
    t1.to(sketch.ico.ico.position, {
      y: "-=0.2",
      z: "-=1.3",
      duration: 3,
      ease: "power3.inOut",
      onUpdate() {
        if (this.ratio > 0.85) {
          sketch?.ico.enableRandom();
        }
        if (this.ratio > 0.94) {
          resolve(true);
        }
      },
    });
  });
};

defineExpose({
  moveForward,
  returnBack,
  state,
});
</script>

<template>
  <div
    id="grid-ico-sketch"
    class="absolute top-0 left-0 w-screen h-screen overflow-hidden"
  ></div>
</template>
