import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  lang: "zh-CN",
  title: "博客",
  description: " ",

  base: "/blog/",

  theme,
});
