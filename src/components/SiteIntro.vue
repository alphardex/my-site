<template>
  <div class="relative z-1">
    <div class="absolute top-20 left-20">
      <router-link :to="{ name: 'Home' }">
        <div class="font-bold text-lg">ALPHARDEX</div>
      </router-link>
    </div>
    <div class="absolute top-20 right-20 hidden">
      <div class="flex flex-col space-y-1 cursor-pointer">
        <div class="w-6 h-05 bg-white rounded"></div>
        <div class="w-6 h-05 bg-white rounded"></div>
        <div class="w-6 h-05 bg-white rounded"></div>
      </div>
    </div>
    <div class="flex-center">
      <div class="container h-screen">
        <div class="absolute v-center">
          <div class="flex flex-col items-start space-y-12">
            <div class="tracking-widest">我是ALPHARDEX</div>
            <div class="font-bold text-6xl">
              <div>一个专注于</div>
              <div>创作特效的前端</div>
            </div>
            <router-link :to="{ name: 'About' }">
              <my-btn>关于我</my-btn>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyBtn from "@/components/MyBtn.vue";

export default defineComponent({
  name: "SiteIntro",
  components: {
    MyBtn,
  },
});
</script>
