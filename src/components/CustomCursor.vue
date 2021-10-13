<template>
  <div class="cursor"></div>
  <div class="cursor-border"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "CustomCursor",
  setup() {
    const initCursor = () => {
      let cursor = document.querySelector(".cursor");
      let cursorBorder = document.querySelector(".cursor-border");
      let getXY = (event: Event, element: Element) => {
        let x = (event as MouseEvent).clientX;
        let y = (event as MouseEvent).clientY;
        let rect = element.getBoundingClientRect();
        x -= rect.width / 2;
        y -= rect.height / 2;
        return [x, y];
      };

      document.addEventListener("mouseenter", (e) => {
        cursor.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 300,
          fill: "forwards",
        });
        cursorBorder.animate(
          [
            {
              opacity: 0,
            },
            {
              opacity: 0.8,
            },
          ],
          {
            duration: 300,
            fill: "forwards",
          }
        );
      });

      document.addEventListener("mousemove", (e) => {
        let [cursorX, cursorY] = getXY(e, cursor);
        let [cursorBorderX, cursorBorderY] = getXY(e, cursorBorder);
        let targetName = (e.target as HTMLElement).tagName.toLowerCase();
        if (
          targetName === "a" ||
          targetName === "label" ||
          targetName === "button"
        ) {
          cursorBorder.classList.add("on-focus");
        } else {
          cursorBorder.classList.remove("on-focus");
        }
        cursor.animate(
          [
            { transform: `translate(${cursorX}px, ${cursorY}px)` },
            { transform: `translate(${cursorX}px, ${cursorY}px)` },
          ],
          {
            duration: 300,
            fill: "forwards",
            delay: 50,
          }
        );
        cursorBorder.animate(
          [
            { transform: `translate(${cursorBorderX}px, ${cursorBorderY}px)` },
            { transform: `translate(${cursorBorderX}px, ${cursorBorderY}px)` },
          ],
          {
            duration: cursorBorder.classList.contains("on-focus") ? 1500 : 300,
            fill: "forwards",
            delay: 150,
          }
        );
      });

      document.addEventListener("mouseleave", (e) => {
        cursor.animate([{ opacity: 0.8 }, { opacity: 0 }], {
          duration: 500,
          fill: "forwards",
        });
        cursorBorder.animate(
          [
            {
              opacity: 0.8,
            },
            {
              opacity: 0,
            },
          ],
          {
            duration: 500,
            fill: "forwards",
          }
        );
      });
    };
    onMounted(() => {
      initCursor();
    });
  },
});
</script>

<style lang="scss" scoped>
// Cursor Follow & Hover Effect https://codepen.io/alphardex/pen/jOEgYjr
.cursor,
.cursor-border {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  will-change: transform;
  transition: 0.3s;
}

.cursor {
  background: var(--cursor-color);
}

.cursor-border {
  padding: 2rem;
  border: 0.1rem solid var(--cursor-color);

  &.on-focus {
    padding: 0.5rem;
    background: var(--cursor-hover-color);
    border-color: transparent;
  }
}
</style>
