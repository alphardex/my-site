<template>
  <div class="relative z-1">
    <div class="absolute top-20 left-20">
      <router-link :to="{ name: 'Home' }">
        <div class="font-bold text-lg">ALPHARDEX</div>
      </router-link>
    </div>
    <div class="flex-center">
      <div class="container h-screen">
        <div class="absolute v-center">
          <div class="flex flex-col items-start space-y-12">
            <div class="space-y-6">
              <div class="text-6xl font-bold" data-splitting>
                动画，是前端的灵魂
              </div>
              <div class="leading-relaxed">
                <div data-splitting>
                  这些年来，我致力于研究CSS、SVG和WebGL的奥秘
                </div>
                <div data-splitting>
                  不为别的，就为了能给予用户至高的视觉体验
                </div>
              </div>
            </div>
            <my-btn
              class="float-in"
              style="animation-delay: 0.6s"
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
        <div class="space-y-2">
          <div>微信：blacklurker</div>
          <div>
            Github:
            <a target="_blank" href="https://github.com/alphardex">alphardex</a>
          </div>
          <div>
            Codepen:
            <a target="_blank" href="https://codepen.com/alphardex"
              >alphardex</a
            >
          </div>
          <div>
            Twitter:
            <a target="_blank" href="https://twitter.com/alphardex007"
              >alphardex007</a
            >
          </div>
        </div>
        <div
          class="close-icon cursor-pointer"
          @click="dialog.closeAllDialog"
        ></div>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Splitting from "splitting";
import MyBtn from "@/components/MyBtn.vue";
import useDialog from "@/hooks/useDialog";

export default defineComponent({
  name: "AboutMe",
  components: {
    MyBtn,
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
