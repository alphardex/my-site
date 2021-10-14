<template>
  <div class="min-h-screen">
    <div class="absolute hv-center text-center">
      <div class="space-y-6">
        <div class="tracking-widest">我是ALPHARDEX</div>
        <div class="font-bold text-2xl">
          <div>一个专注于</div>
          <div>创作特效的前端</div>
        </div>
        <div>请前往PC端查看全部案例</div>
        <div class="space-y-2">
          <div>联系方式：</div>
          <contact-info></contact-info>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContactInfo from "@/components/ContactInfo.vue";

export default defineComponent({
  name: "MobilePage",
  components: {
    ContactInfo,
  },
});
</script>
