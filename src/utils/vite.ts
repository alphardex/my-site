// 动态加载图片
const getImage = (path: string) => {
  const images = import.meta.globEager("/src/assets/*");
  const url = images[path].default;
  return url;
};

export { getImage };
