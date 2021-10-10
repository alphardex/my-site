<template>
  <router-view />
</template>

<script lang="ts">
import "normalize.css/normalize.css";
import "@alphardex/aqua.css/dist/aqua.min.css";

export default {};
</script>

<style lang="scss">
:root {
  --purple-grad-1: radial-gradient(at 50% 0%, #723da9 0%, transparent 100%),
    linear-gradient(#29183a 0%, #29183a 100%);
}

$colors: "red", "orange", "yellow", "green", "blue", "purple", "brown", "black",
  "white";
@each $c in $colors {
  @for $i from 1 through 8 {
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

.bg-purple-grad-1 {
  background: var(--purple-grad-1);
}
</style>
