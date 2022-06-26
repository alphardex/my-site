<script lang="ts" setup>
import MyBtn from "@/components/MyBtn.vue";

import gsap from "gsap";

const emit = defineEmits(["next"]);

const t1 = gsap.timeline();

const fadeOut = () => {
  t1.to(".site-intro", {
    opacity: 0,
    pointerEvents: "none",
    duration: 0.8,
    ease: "power2.out",
  });
};

const fadeIn = () => {
  t1.to(".site-intro", {
    opacity: 1,
    pointerEvents: "auto",
    duration: 0.8,
    ease: "power2.out",
  });
};

defineExpose({
  fadeOut,
  fadeIn,
});
</script>

<template>
  <div class="flex-center">
    <div class="site-intro h-screen" style="width: 1000px">
      <div class="absolute v-center">
        <div
          class="flex flex-col items-start space-y-12 text-white select-none"
        >
          <div class="staggered-rise-in tracking-widest" data-splitting>
            我是王浩彬
          </div>
          <div class="staggered-rise-in font-bold text-6xl" data-splitting>
            <div>一个专注于</div>
            <div>创新的前端</div>
          </div>
          <my-btn @click="emit(`next`)">作品一览</my-btn>
        </div>
      </div>
    </div>
  </div>
</template>
