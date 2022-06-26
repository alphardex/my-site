import ky from "kyouka";

// 环境变量
const environ = {
  isDevMode: import.meta.env.DEV || location.href.includes("localhost"),
  isMobile: ky.detectDeviceType() === "Mobile",
  isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent),
  isAndroid: /android/i.test(navigator.userAgent),
  isWeixin: /micromessenger/i.test(navigator.userAgent),
  isWindowsWeixin: /WindowsWechat/i.test(navigator.userAgent),
  isWeapp: /miniProgram/i.test(navigator.userAgent),
  isDingTalk: /DingTalk/i.test(navigator.userAgent),
  is090App: (window as any).wapapp ? true : false,
  rootPath: `${location.origin}/${location.pathname.split("/")[1]}/`,
};

export { environ };
