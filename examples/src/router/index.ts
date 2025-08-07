import { createRouter, createWebHistory } from "vue-router";
import Layout from "../components/Layout.vue";
import Home from "../views/Home.vue";
import ButtonDemo from "../views/ButtonDemo.vue";
import InputDemo from "../views/InputDemo.vue";
import CardDemo from "../views/CardDemo.vue";
import AvatarDemo from "../views/AvatarDemo.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "",
          name: "Home",
          component: Home,
        },
        {
          path: "/button",
          name: "Button",
          component: ButtonDemo,
        },
        {
          path: "/input",
          name: "Input",
          component: InputDemo,
        },
        {
          path: "/card",
          name: "Card",
          component: CardDemo,
        },
        {
          path: "/avatar",
          name: "Avatar",
          component: AvatarDemo,
        },
        // 其他组件路由将在后续添加
        {
          path: "/icon",
          name: "Icon",
          component: () => import("../views/IconDemo.vue"),
        },
        {
          path: "/divider",
          name: "Divider",
          component: () => import("../views/DividerDemo.vue"),
        },
        {
          path: "/checkbox",
          name: "Checkbox",
          component: () => import("../views/CheckboxDemo.vue"),
        },
        {
          path: "/radio",
          name: "Radio",
          component: () => import("../views/RadioDemo.vue"),
        },
        {
          path: "/switch",
          name: "Switch",
          component: () => import("../views/SwitchDemo.vue"),
        },
        {
          path: "/select",
          name: "Select",
          component: () => import("../views/SelectDemo.vue"),
        },
        {
          path: "/badge",
          name: "Badge",
          component: () => import("../views/BadgeDemo.vue"),
        },
        {
          path: "/image",
          name: "Image",
          component: () => import("../views/ImageDemo.vue"),
        },
        {
          path: "/tag",
          name: "Tag",
          component: () => import("../views/TagDemo.vue"),
        },
        {
          path: "/message-box",
          name: "MessageBox",
          component: () => import("../views/MessageBoxDemo.vue"),
        },
        {
          path: "/tooltip",
          name: "Tooltip",
          component: () => import("../views/TooltipDemo.vue"),
        },
      ],
    },
  ],
});

export default router;
