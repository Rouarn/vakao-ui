<template>
  <router-view />
</template>

<script setup lang="ts">
// Vakao UI 组件库示例应用
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f7fa;
}

code {
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
}

#app {
  min-height: 100vh;
}

/* 滚动条美化样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #5a6fd8 0%, #6a4190 100%);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.4);
  transform: scale(1.1);
}

::-webkit-scrollbar-corner {
  background: transparent;
}

/* Firefox 滚动条样式 */
* {
  scrollbar-width: thin;
  scrollbar-color: #667eea transparent;
}

/* 可选：完全隐藏滚动条但保持滚动功能 */
/* 
::-webkit-scrollbar {
  display: none;
}

* {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*/
</style>
