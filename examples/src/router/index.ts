import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../components/Layout.vue"),
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("../views/Home.vue"),
        },
        {
          path: "/button",
          name: "Button",
          component: () => import("../views/ButtonDemo.vue"),
        },
        {
          path: "/input",
          name: "Input",
          component: () => import("../views/InputDemo.vue"),
        },
        {
          path: "/card",
          name: "Card",
          component: () => import("../views/CardDemo.vue"),
        },
        {
          path: "/avatar",
          name: "Avatar",
          component: () => import("../views/AvatarDemo.vue"),
        },
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
        {
          path: "/space",
          name: "Space",
          component: () => import("../views/SpaceDemo.vue"),
        },
      ],
    },
  ],
});

export default router;
