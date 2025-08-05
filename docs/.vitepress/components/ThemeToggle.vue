<template>
  <div class="theme-toggle">
    <button class="theme-toggle-btn" @click="toggleTheme" :title="isDark ? '切换到浅色模式' : '切换到深色模式'">
      <svg v-if="!isDark" class="icon" viewBox="0 0 24 24" width="18" height="18">
        <path
          fill="currentColor"
          d="M12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6a6 6 0 0 1 6 6a6 6 0 0 1-6 6z"
        />
      </svg>
      <svg v-else class="icon" viewBox="0 0 24 24" width="18" height="18">
        <path
          fill="currentColor"
          d="M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0-7l2.39 3.42C13.65 5.15 12.84 5 12 5s-1.65.15-2.39.42L12 2M3.34 7l4.16-.35A7.2 7.2 0 0 0 5.94 8.5c-.44.74-.69 1.5-.83 2.29L3.34 7m.02 10l1.76-3.77a7.131 7.131 0 0 0 2.38 4.14L3.36 17M20.65 7l-1.77 3.79a7.023 7.023 0 0 0-2.38-4.15l4.15.36m-.01 10l-4.14.36c.59-.51 1.12-1.14 1.54-1.86c.42-.73.69-1.5.83-2.29L20.64 17M12 22l-2.41-3.44c.74.27 1.55.44 2.41.44c.82 0 1.65-.17 2.39-.44L12 22z"
        />
      </svg>
      <span class="theme-toggle-text">{{ isDark ? "浅色" : "深色" }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const isDark = ref(false);

// 初始化主题
const initTheme = () => {
  const savedTheme = localStorage.getItem("vitepress-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = savedTheme || (prefersDark ? "dark" : "light");

  isDark.value = theme === "dark";
  applyTheme(theme);
};

// 应用主题
const applyTheme = (theme: string) => {
  const html = document.documentElement;

  // VitePress 主题切换
  html.classList.remove("dark", "light");
  html.classList.add(theme);

  // Vakao UI 主题切换
  html.setAttribute("data-theme", theme);

  localStorage.setItem("vitepress-theme", theme);
};

// 切换主题
const toggleTheme = () => {
  const newTheme = isDark.value ? "light" : "dark";
  isDark.value = !isDark.value;
  applyTheme(newTheme);
};

onMounted(() => {
  initTheme();

  // 监听系统主题变化
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleChange = (e: MediaQueryListEvent) => {
    if (!localStorage.getItem("vitepress-theme")) {
      isDark.value = e.matches;
      applyTheme(e.matches ? "dark" : "light");
    }
  };

  mediaQuery.addEventListener("change", handleChange);
});
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
}

.theme-toggle-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  line-height: 1;
}

.theme-toggle-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.theme-toggle-btn:active {
  transform: scale(0.98);
}

.icon {
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.theme-toggle-text {
  font-weight: 500;
}

/* 深色模式下的样式调整 */
:global(.dark) .theme-toggle-btn {
  border-color: var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

:global(.dark) .theme-toggle-btn:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
}
</style>
