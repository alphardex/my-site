<template>
  <div class="relative z-1">
    <div class="absolute top-20 left-20">
      <router-link :to="{ name: 'Home' }">
        <div class="font-bold text-lg fade-in">ALPHARDEX</div>
      </router-link>
    </div>
    <div class="flex-center">
      <div class="container h-screen">
        <div class="absolute v-center">
          <div class="flex flex-col items-start space-y-12">
            <div class="tracking-widest" data-splitting>我是ALPHARDEX</div>
            <div class="font-bold text-6xl" data-splitting>
              <div>一个专注于</div>
              <div>创作特效的前端</div>
            </div>
            <router-link
              class="float-in"
              style="animation-delay: 0.6s"
              :to="{ name: 'About' }"
            >
              <my-btn>关于我</my-btn>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import MyBtn from "@/components/MyBtn.vue";
import Splitting from "splitting";

export default defineComponent({
  name: "SiteIntro",
  components: {
    MyBtn,
  },
  setup() {
    onMounted(() => {
      Splitting();
    });
  },
});
</script>

<style lang="scss" scoped></style>
