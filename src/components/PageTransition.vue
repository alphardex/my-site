<template>
  <div>
    <transition :name="transition" :mode="mode">
      <slot></slot>
    </transition>
    <div class="overlay-top"></div>
    <div class="overlay-bottom"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PageTransition",
  props: {
    name: {
      type: String,
    },
  },
  setup(props) {
    const state = reactive({
      transition: "fade",
      mode: "out-in",
    });
    const router = useRouter();
    router.beforeEach((to, from, next) => {
      let transition = to.meta.transition ? to.meta.transition : props.name;
      if (!from.name) {
        transition = "fade";
      }
      state.transition = transition as any;
      next();
    });
    return { ...toRefs(state) };
  },
});
</script>

<style lang="scss" scoped>
@mixin cover(
  $position: absolute,
  $top: 0,
  $left: 0,
  $width: 100%,
  $height: 100%
) {
  position: $position;
  top: $top;
  left: $left;
  width: $width;
  height: $height;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.overlay-top {
  @include cover(fixed);
  z-index: 1000;
  background: var(--overlay-bg);
  transform-origin: top;
  transform: scaleY(0);
  transition-duration: var(--transition-duration);
}

.overlay-bottom {
  @include cover(fixed);
  z-index: 1000;
  background: var(--overlay-bg);
  transform-origin: bottom;
  transform: scaleY(0);
  transition-duration: var(--transition-duration);
}

.overlay-up-full-enter ~ .overlay-bottom {
  transform: scaleY(1);
}

.overlay-up-full-enter-active ~ .overlay-bottom,
.overlay-up-full-leave-active ~ .overlay-bottom {
  transform: scaleY(1);
}

.overlay-up-full-enter-active ~ .overlay-bottom {
  transition-timing-function: var(--ease-in-quart);
}

.overlay-up-full-enter-active ~ .overlay-bottom,
.overlay-up-full-enter-to ~ .overlay-bottom {
  display: none;
}

.overlay-up-full-enter-to ~ .overlay-top {
  transform: scaleY(0);
}

.overlay-up-full-leave-active ~ .overlay-top {
  transition-timing-function: var(--ease-out-quart);
}

.overlay-up-full-enter ~ .overlay-top,
.overlay-up-full-enter-active ~ .overlay-top,
.overlay-up-full-enter-to ~ .overlay-top {
  transition-duration: unset !important;
  transform: scaleY(1);
}

.overlay-up-full-enter-active,
.overlay-up-full-leave-active {
  transition-duration: var(--transition-duration);
}
</style>
