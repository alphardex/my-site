<template>
  <div class="relative z-1">
    <div class="flex-center">
      <div class="container h-screen">
        <div class="absolute v-center">
          <div class="flex flex-col items-start space-y-12">
            <div class="space-y-6">
              <div class="text-6xl font-bold staggered-rise-in" data-splitting>
                动画，是前端的灵魂
              </div>
              <div class="leading-relaxed">
                <div class="staggered-rise-in" data-splitting>
                  这些年来，我致力于研究CSS、SVG和WebGL的奥秘
                </div>
                <div class="staggered-rise-in" data-splitting>
                  不为别的，就为了能给大家带来至高的视觉体验
                </div>
              </div>
            </div>
            <my-btn
              class="xyz-in"
              xyz="fade down-50% duration-6 delay-6"
              @click="dialog.openContactDialog"
            >
              联系我
            </my-btn>
          </div>
        </div>
      </div>
    </div>
    <teleport to="#dialogs">
      <div
        class="backdrop"
        :class="{ 'pointer-events-none': !dialog.isBackdropClosable.value }"
        v-if="dialog.showBackdrop.value"
        @click="dialog.clickCloseDialog"
      ></div>
    </teleport>
    <teleport to="#dialogs">
      <div class="dialog glass" v-show="dialog.showContactDialog.value">
        <contact-info></contact-info>
        <div class="close-icon" @click="dialog.closeAllDialog"></div>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Splitting from "splitting";
import MyBtn from "@/components/MyBtn.vue";
import useDialog from "@/hooks/useDialog";
import ContactInfo from "@/components/ContactInfo.vue";

export default defineComponent({
  name: "AboutMe",
  components: {
    MyBtn,
    ContactInfo,
  },
  setup() {
    const dialog = useDialog();
    onMounted(() => {
      Splitting();
    });
    return { dialog };
  },
});
</script>
