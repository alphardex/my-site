<script lang="ts" setup>
import MouseScroll from "@/components/MouseScroll.vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Mousewheel } from "swiper";
import Splitting from "splitting";

import createSketch from "@/sketches/unroll-gallery";

import { onMounted, reactive } from "vue";

import { getImage } from "@/utils/vite";

let sketch: ReturnType<typeof createSketch> | null = null;

const state = reactive({
  projectList: [
    {
      name: "大数据监控平台",
      pic: getImage("/src/assets/big-screen.jpg"),
      url: "http://show.js2cs.com",
      desc: "一个数据可视化大屏项目，主要用于动态展示公司的各种数据统计<br/>使用Vue.js进行开发，利用Vuex进行数据的管理，Echarts进行数据的可视化<br/>封装了常用的图表组件，适配了所有主流PC和大屏的屏幕尺寸",
    },
    {
      name: "方普智能装备公司官网",
      pic: getImage("/src/assets/farpull.jpg"),
      url: "http://www.farpull.com",
      desc: "一个官网项目，主要用于企业树立形象，展示产品，对外宣传等<br/>使用Vue.js进行开发<br/>同时适配了PC端和移动端",
    },
    {
      name: "运营H5",
      pic: getImage("/src/assets/h5game.jpg"),
      url: "http://s.cs090.com/4334112/",
      desc: "平时开发的各种运营H5项目，种类包括游戏类、滑屏类、互动类等<br/>滑屏互动类H5主要用CSS和GSAP来开发，游戏类H5主要用Phaser引擎来开发<br/>封装了许多常用的业务组件，实现了很多种特效和游戏逻辑",
    },
    {
      name: "aqua.css",
      pic: getImage("/src/assets/aquacss.jpg"),
      url: "https://github.com/alphardex/aqua.css",
      desc: "一个纯CSS框架<br/>封装了许多常用的UI组件和工具类<br/>有助于快速有效地完成页面开发",
    },
    {
      name: "maku.js",
      pic: getImage("/src/assets/maku.jpg"),
      url: "https://github.com/alphardex/maku.js",
      desc: "一个Web 3D的辅助框架<br/>能使HTML标签带上炫酷的着色器特效<br/>有助于实现图片相关的3D特效",
    },
  ],
  swiper: null,
  showDesc: false,
  showHint: true,
});

const swiperModules = [Mousewheel];

const onSwiper = (swiper: any) => {
  state.swiper = swiper;
};

const onSlideChange = (swiper: any) => {
  state.showHint = false;
  const activeIndex = swiper.activeIndex;
  if (sketch?.gallery) {
    if (sketch.gallery.scroller) {
      sketch.gallery.scroller.scroll.target = -swiper.translate;
    }
    if (sketch.gallery.makuGroup) {
      sketch.gallery.revealImage(sketch.gallery.makuGroup.makus[activeIndex]);
    }
  }
};

const start = async () => {
  if (sketch?.gallery && sketch.gallery.makuGroup) {
    sketch.gallery.revealImage(sketch.gallery.makuGroup.makus[0]);
    state.showDesc = true;
  }
};

onMounted(() => {
  setTimeout(() => {
    sketch = createSketch("#unroll-gallery-sketch");
    Splitting();
  });
});

defineExpose({
  start,
});
</script>

<template>
  <div class="relative">
    <div
      id="unroll-gallery-sketch"
      class="fixed top-0 left-0 z-1 w-screen h-screen"
    ></div>
    <swiper
      class="w-screen h-screen"
      :modules="swiperModules"
      :direction="`vertical`"
      :slidesPerView="1"
      :mousewheel="true"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide
        class="flex-center"
        v-for="(item, i) in state.projectList"
        :key="i"
      >
        <div class="relative">
          <a target="_blank" :href="item.url">
            <img :src="item.pic" class="block" alt="" />
          </a>
          <div
            class="desc absolute -left-24 v-center text-white text-shadow-1 pointer-events-none select-none"
            style="--basic-delay: 0.6s"
            v-show="state.showDesc"
          >
            <div class="space-y-8">
              <div
                class="staggered-rise-in font-bold text-5xl no-delay"
                data-splitting
              >
                {{ item.name }}
              </div>
              <div
                class="staggered-rise-in leading-relaxed no-delay"
                v-html="item.desc"
                data-splitting
              ></div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div
      class="fixed h-center bottom-10 transition-opacity duration-600"
      :class="{ hollow: !state.showHint }"
    >
      <mouse-scroll></mouse-scroll>
    </div>
  </div>
</template>

<style lang="scss">
img {
  width: 50rem;
  opacity: 0;
}

.swiper-slide {
  .desc {
    display: none;
  }
}

.swiper-slide-active {
  .desc {
    display: block;
  }
}
</style>
