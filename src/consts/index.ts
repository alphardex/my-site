import ky from "kyouka";

const navItems = [
  { name: "Home", path: "Home" },
  { name: "Project", path: "Project" },
  { name: "About", path: "About" },
];

const isDevMode = process.env.NODE_ENV === "development";
const isMobile = ky.detectDeviceType() === "Mobile";

export { navItems, isDevMode, isMobile };
