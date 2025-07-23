<template>
  <div class="demo-container">
    <div class="demo-content">
      <slot></slot>
    </div>
    <div v-if="showCode" class="demo-code">
      <slot name="code"></slot>
    </div>
    <div class="demo-footer" @click="toggleCode">
      <span>{{ showCode ? '隐藏代码' : '显示代码' }}</span>
      <svg
        :class="['icon', { 'icon-rotate': showCode }]"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
      >
        <path
          fill="currentColor"
          d="M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showCode = ref(false);

const toggleCode = () => {
  showCode.value = !showCode.value;
};
</script>

<style scoped>
.demo-container {
  border: 1px solid #ebedf0;
  border-radius: 4px;
  margin: 16px 0;
  transition: all 0.2s;
}

.demo-container:hover {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.demo-content {
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.demo-code {
  border-top: 1px solid #ebedf0;
  padding: 16px;
  background-color: #fafafa;
}

.demo-footer {
  border-top: 1px solid #ebedf0;
  padding: 10px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #909399;
  cursor: pointer;
  transition: all 0.2s;
}

.demo-footer:hover {
  color: #18a058;
}

.icon {
  margin-left: 6px;
  transition: transform 0.3s;
}

.icon-rotate {
  transform: rotate(180deg);
}
</style>