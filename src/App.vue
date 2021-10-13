<template>
  <site-title></site-title>
  <router-view v-slot="{ Component }">
    <page-transition :name="`fade`">
      <component :is="Component" />
    </page-transition>
  </router-view>
</template>

<script lang="ts">
import "@alphardex/aqua.css/dist/aqua.min.css";
import "normalize.css/normalize.css";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import "swiper/swiper-bundle.min.css";
import PageTransition from "@/components/PageTransition.vue";
import { defineComponent } from "@vue/runtime-core";
import SiteTitle from "@/components/SiteTitle.vue";

export default defineComponent({
  name: "App",
  components: {
    SiteTitle,
    PageTransition,
  },
});
</script>

<style lang="scss">
body {
  color: white;
  background: var(--blue-grad-1);
}

:root {
  --blue-grad-1: radial-gradient(at 50% 0%, #343299 0%, transparent 100%),
    linear-gradient(#0e1242 0%, #0e1242 100%);
  --red-color-1: #fa2354;
  --red-color-2: #{transparentize(#fa2354, 0.75)};
  --info-color: var(--red-color-1);
  --overlay-bg: var(--info-color);
  --transition-duration: 0.4s;
}

// reset

a {
  color: currentColor;
  text-decoration: none;
}

// utils

$colors: "red", "blue";
@each $c in $colors {
  @for $i from 1 through 2 {
    .text-#{$c}-#{$i} {
      color: var(--#{$c}-color-#{$i});
    }

    .bg-#{$c}-#{$i} {
      background: var(--#{$c}-color-#{$i});
    }

    .border-#{$c}-#{$i} {
      border-color: var(--#{$c}-color-#{$i});
    }
  }
}

.bg-blue-grad-1 {
  background: var(--blue-grad-1);
}

.container {
  width: 1000px;
}

.triangle-right {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 0 5px 7.5px;
  border-color: transparent transparent transparent currentColor;
}

.glass {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

// animations

.float-in {
  animation: float-in 0.6s both;
}

@keyframes float-in {
  from {
    transform: translateY(1rem);
    opacity: 0;
  }
}

.splitting {
  perspective: 15vw;

  * {
    transform-style: preserve-3d;
  }

  .char {
    transform-origin: center center -40px;
    backface-visibility: hidden;
    animation: flip-in 1s cubic-bezier(0.425, 0.005, 0, 1) both;
    animation-delay: calc(0.04s * var(--char-index));
  }
}

@keyframes flip-in {
  from {
    opacity: 1;
    transform: rotateY(120deg);
  }
}
</style>
