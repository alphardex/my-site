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
  --blue-grad-1: radial-gradient(at 50% 0%, #343299 0%, transparent 100%),
    linear-gradient(#0e1242 0%, #0e1242 100%);
  --red-color-1: #fa2354;
  --red-color-2: #{transparentize(#fa2354, 0.75)};
  --info-color: var(--red-color-1);
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

.bg-blue-grad-1 {
  background: var(--blue-grad-1);
}

.h-05 {
  height: 0.125rem;
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
</style>
