<template>
  <div class="relative z-1">
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
              class="xyz-in"
              xyz="fade down-50% duration-6 delay-6"
              :to="{ name: 'Project' }"
            >
              <my-btn>作品一览</my-btn>
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
