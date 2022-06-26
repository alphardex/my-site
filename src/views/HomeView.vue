<script lang="ts" setup>
import GridIco from "@/components/GridIco.vue";
import SiteIntro from "@/components/SiteIntro.vue";
import UnrollGallery from "@/components/UnrollGallery.vue";
import MobilePage from "@/components/MobilePage.vue";

import { onMounted, reactive, ref } from "vue";

import * as kokomi from "kokomi.js";
import ky from "kyouka";
import { environ } from "@/consts";

const gridIco = ref<InstanceType<typeof GridIco> | null>(null);

const siteIntro = ref<InstanceType<typeof SiteIntro> | null>(null);

const unrollGallery = ref<InstanceType<typeof UnrollGallery> | null>(null);

const gotoGallery = async () => {
  siteIntro.value?.fadeOut();
  await gridIco.value?.moveForward();
  state.showGallery = true;
  unrollGallery.value?.start();
};

const leaveGallery = async () => {
  state.showGallery = false;
  await gridIco.value?.returnBack();
  siteIntro.value?.fadeIn();
};

const state = reactive({
  loading: true,
  showGallery: false,
});

onMounted(async () => {
  await kokomi.preloadImages();
  await ky.sleep(200);
  state.loading = false;
});
</script>

<template>
  <template v-if="!environ.isMobile">
    <div
      class="relative transition-opacity duration-600"
      :class="{ hollow: state.loading }"
    >
      <div class="fixed z-0">
        <grid-ico ref="gridIco"></grid-ico>
      </div>
      <site-intro class="z-1" ref="siteIntro" @next="gotoGallery"></site-intro>
      <div
        class="absolute z-2 top-0 left-0 cover transition-opacity duration-600"
        :class="{
          invisible: !state.showGallery,
          hollow: !state.showGallery,
          'overflow-hidden': !state.showGallery,
        }"
      >
        <div class="absolute z-5 top-10 left-10">
          <i
            class="gg-chevron-left text-white cursor-pointer"
            style="--ggs: 2"
            @click="leaveGallery"
          ></i>
        </div>
        <unroll-gallery ref="unrollGallery"></unroll-gallery>
      </div>
    </div>
  </template>
  <template v-else>
    <mobile-page></mobile-page>
  </template>
</template>
