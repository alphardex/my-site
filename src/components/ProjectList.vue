<template>
  <div
    class="unroll-images fixed z-0 w-screen h-screen pointer-events-none"
  ></div>
  <swiper
    class="w-screen h-screen"
    :direction="`vertical`"
    :slidesPerView="1"
    :mousewheel="true"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide class="flex-center" v-for="(item, i) in projectList" :key="i">
      <img :src="item.pic" alt="" />
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import UnrollImages from "@/scenes/unrollImages";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { projectList } from "@/consts/projectList";
import { Swiper, SwiperSlide } from "swiper/vue";

import SwiperCore, { Mousewheel } from "swiper";

SwiperCore.use([Mousewheel]);

interface State {
  projectList: any;
  swiper: any;
  unrollImages: UnrollImages;
}

export default defineComponent({
  name: "ProjectList",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const state = reactive<State>({
      projectList,
      swiper: null,
      unrollImages: null,
    });
    const onSwiper = (swiper: any) => {
      state.swiper = swiper;
    };
    const onSlideChange = (swiper: any) => {
      const activeIndex = swiper.activeIndex;
      if (state.unrollImages) {
        state.unrollImages.scroller.scroll.target = -swiper.translate;
        state.unrollImages.revealImage(
          state.unrollImages.imageDOMMeshObjGroup.imageDOMMeshObjs[
            activeIndex
          ] as any
        );
      }
    };
    const start = async () => {
      const unrollImages = new UnrollImages(".unroll-images", false);
      await unrollImages.init();
      state.unrollImages = unrollImages;
    };
    onMounted(() => {
      start();
    });
    return { ...toRefs(state), onSwiper, onSlideChange };
  },
});
</script>

<style lang="scss" scoped>
img {
  width: 50rem;
  opacity: 0;
}
</style>
