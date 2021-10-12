<template>
  <div class="min-h-screen">
    <project-list></project-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProjectList from "@/components/ProjectList.vue";

export default defineComponent({
  name: "Project",
  components: {
    ProjectList,
  },
});
</script>
