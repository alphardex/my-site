import imagesLoaded from "imagesloaded";

// 获取归一化的鼠标位置
const getNormalizedMousePos = (e: MouseEvent | Touch) => {
  return {
    x: (e.clientX / window.innerWidth) * 2 - 1,
    y: -(e.clientY / window.innerHeight) * 2 + 1,
  };
};

// 图片预加载
const preloadImages = (sel = "img") => {
  return new Promise((resolve) => {
    imagesLoaded(sel, { background: true }, resolve);
  });
};

export { getNormalizedMousePos, preloadImages };
