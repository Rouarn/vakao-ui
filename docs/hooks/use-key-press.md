# useKeyPress

一个键盘按键检测 Hook，提供简洁的 API 来监听键盘事件。支持单键、组合键、键盘快捷键等多种场景，自动处理按键状态管理。

## 基础用法

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">⌨️ 基础按键检测</h3>
    <!-- 单键检测 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">单键检测</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; margin-bottom: 12px;">
        <div v-for="key in singleKeys" :key="key.name"
             style="padding: 12px; border-radius: 8px; text-align: center; font-weight: bold; transition: all 0.2s;"
             :style="{ 
               background: key.isPressed.value ? 'linear-gradient(45deg, #1890ff, #52c41a)' : '#f5f5f5',
               color: key.isPressed.value ? 'white' : '#666',
               transform: key.isPressed.value ? 'scale(1.05)' : 'scale(1)',
               boxShadow: key.isPressed.value ? '0 4px 12px rgba(24, 144, 255, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
             }">
          <div style="font-size: 18px; margin-bottom: 4px;">{{ key.icon }}</div>
          <div style="font-size: 12px;">{{ key.name }}</div>
          <div style="font-size: 10px; opacity: 0.8;">{{ key.isPressed.value ? '按下' : '释放' }}</div>
        </div>
      </div>
      <div style="padding: 12px; background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 6px; font-size: 14px;">
        💡 试试按下 <kbd style="padding: 2px 6px; background: #f0f0f0; border: 1px solid #d9d9d9; border-radius: 3px; font-family: monospace;">Space</kbd>、
        <kbd style="padding: 2px 6px; background: #f0f0f0; border: 1px solid #d9d9d9; border-radius: 3px; font-family: monospace;">Enter</kbd>、
        <kbd style="padding: 2px 6px; background: #f0f0f0; border: 1px solid #d9d9d9; border-radius: 3px; font-family: monospace;">Escape</kbd> 或 
        <kbd style="padding: 2px 6px; background: #f0f0f0; border: 1px solid #d9d9d9; border-radius: 3px; font-family: monospace;">Tab</kbd> 键
      </div>
    </div>
    <!-- 组合键检测 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">组合键检测</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-bottom: 12px;">
        <div v-for="combo in comboKeys" :key="combo.name"
             style="padding: 16px; border-radius: 8px; text-align: center; font-weight: bold; transition: all 0.2s;"
             :style="{ 
               background: combo.isPressed.value ? 'linear-gradient(45deg, #722ed1, #eb2f96)' : '#f5f5f5',
               color: combo.isPressed.value ? 'white' : '#666',
               transform: combo.isPressed.value ? 'scale(1.05)' : 'scale(1)',
               boxShadow: combo.isPressed.value ? '0 4px 12px rgba(114, 46, 209, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
             }">
          <div style="font-size: 20px; margin-bottom: 6px;">{{ combo.icon }}</div>
          <div style="font-size: 12px; margin-bottom: 4px;">{{ combo.name }}</div>
          <div style="font-size: 10px; opacity: 0.8;">{{ combo.description }}</div>
          <div v-if="combo.isPressed.value" style="font-size: 10px; margin-top: 4px; color: #fff; opacity: 0.9;">✅ 激活</div>
        </div>
      </div>
      <div style="padding: 12px; background: #fff7e6; border: 1px solid #ffd591; border-radius: 6px; font-size: 14px;">
        🎯 试试按下组合键：
        <kbd style="padding: 2px 6px; background: #f0f0f0; border: 1px solid #d9d9d9; border-radius: 3px; font-family: monospace;">Ctrl+S</kbd>、
        <kbd style="padding: 2px 6px; background: #f0f0f0; border: 1px solid #d9d9d9; border-radius: 3px; font-family: monospace;">Ctrl+C</kbd>、
        <kbd style="padding: 2px 6px; background: #f0f0f0; border: 1px solid #d9d9d9; border-radius: 3px; font-family: monospace;">Ctrl+Z</kbd> 或 
        <kbd style="padding: 2px 6px; background: #f0f0f0; border: 1px solid #d9d9d9; border-radius: 3px; font-family: monospace;">Alt+Tab</kbd>
      </div>
    </div>
    <!-- 方向键检测 -->
    <div>
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">方向键检测</h4>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; margin-bottom: 12px;">
        <!-- 上 -->
        <div style="padding: 12px 16px; border-radius: 6px; font-weight: bold; transition: all 0.2s;"
             :style="{ 
               background: arrowKeys.up.value ? 'linear-gradient(45deg, #fa8c16, #f759ab)' : '#f5f5f5',
               color: arrowKeys.up.value ? 'white' : '#666',
               transform: arrowKeys.up.value ? 'scale(1.1)' : 'scale(1)'
             }">
          ↑
        </div>
        <!-- 左中右 -->
        <div style="display: flex; gap: 8px;">
          <div style="padding: 12px 16px; border-radius: 6px; font-weight: bold; transition: all 0.2s;"
               :style="{ 
                 background: arrowKeys.left.value ? 'linear-gradient(45deg, #fa8c16, #f759ab)' : '#f5f5f5',
                 color: arrowKeys.left.value ? 'white' : '#666',
                 transform: arrowKeys.left.value ? 'scale(1.1)' : 'scale(1)'
               }">
            ←
          </div>
          <div style="padding: 12px 16px; border-radius: 6px; font-weight: bold; transition: all 0.2s;"
               :style="{ 
                 background: arrowKeys.down.value ? 'linear-gradient(45deg, #fa8c16, #f759ab)' : '#f5f5f5',
                 color: arrowKeys.down.value ? 'white' : '#666',
                 transform: arrowKeys.down.value ? 'scale(1.1)' : 'scale(1)'
               }">
            ↓
          </div>
          <div style="padding: 12px 16px; border-radius: 6px; font-weight: bold; transition: all 0.2s;"
               :style="{ 
                 background: arrowKeys.right.value ? 'linear-gradient(45deg, #fa8c16, #f759ab)' : '#f5f5f5',
                 color: arrowKeys.right.value ? 'white' : '#666',
                 transform: arrowKeys.right.value ? 'scale(1.1)' : 'scale(1)'
               }">
            →
          </div>
        </div>
      </div>
      <div style="padding: 12px; background: #f0f0f0; border-radius: 6px; font-family: monospace; font-size: 12px;">
        当前按下: {{ getCurrentPressedKeys() }}
      </div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <!-- 单键检测 -->
    <div>
      <h4>单键检测</h4>
      <div class="key-grid">
        <div v-for="key in singleKeys" :key="key.name" class="key-indicator" :class="{ pressed: key.isPressed }">
          <div class="key-icon">{{ key.icon }}</div>
          <div class="key-name">{{ key.name }}</div>
          <div class="key-status">{{ key.isPressed ? "按下" : "释放" }}</div>
        </div>
      </div>
      <div class="tip">💡 试试按下 <kbd>Space</kbd>、<kbd>Enter</kbd>、<kbd>Escape</kbd> 或 <kbd>Tab</kbd> 键</div>
    </div>

    <!-- 组合键检测 -->
    <div>
      <h4>组合键检测</h4>
      <div class="combo-grid">
        <div v-for="combo in comboKeys" :key="combo.name" class="combo-indicator" :class="{ pressed: combo.isPressed }">
          <div class="combo-icon">{{ combo.icon }}</div>
          <div class="combo-name">{{ combo.name }}</div>
          <div class="combo-description">{{ combo.description }}</div>
          <div v-if="combo.isPressed" class="combo-active">✅ 激活</div>
        </div>
      </div>
      <div class="tip">🎯 试试按下组合键：<kbd>Ctrl+S</kbd>、<kbd>Ctrl+C</kbd>、<kbd>Ctrl+Z</kbd> 或 <kbd>Alt+Tab</kbd></div>
    </div>

    <!-- 方向键检测 -->
    <div>
      <h4>方向键检测</h4>
      <div class="arrow-keys">
        <div class="arrow-up" :class="{ pressed: arrowKeys.up }">↑</div>
        <div class="arrow-row">
          <div class="arrow-left" :class="{ pressed: arrowKeys.left }">←</div>
          <div class="arrow-down" :class="{ pressed: arrowKeys.down }">↓</div>
          <div class="arrow-right" :class="{ pressed: arrowKeys.right }">→</div>
        </div>
      </div>
      <div class="current-keys">当前按下: {{ getCurrentPressedKeys() }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useKeyPress } from "@vakao-ui/hooks";

// 单键检测
const [spacePressed] = useKeyPress(" ");
const [enterPressed] = useKeyPress("Enter");
const [escapePressed] = useKeyPress("Escape");
const [tabPressed] = useKeyPress("Tab");

const singleKeys = reactive([
  { name: "Space", icon: "⎵", isPressed: spacePressed },
  { name: "Enter", icon: "⏎", isPressed: enterPressed },
  { name: "Escape", icon: "⎋", isPressed: escapePressed },
  { name: "Tab", icon: "⇥", isPressed: tabPressed },
]);

// 组合键检测
const [ctrlSPressed] = useKeyPress(["ctrl", "s"]);
const [ctrlCPressed] = useKeyPress(["ctrl", "c"]);
const [ctrlZPressed] = useKeyPress(["ctrl", "z"]);
const [altTabPressed] = useKeyPress(["alt", "tab"]);

const comboKeys = reactive([
  {
    name: "Ctrl+S",
    icon: "💾",
    description: "保存",
    isPressed: ctrlSPressed,
  },
  {
    name: "Ctrl+C",
    icon: "📋",
    description: "复制",
    isPressed: ctrlCPressed,
  },
  {
    name: "Ctrl+Z",
    icon: "↶",
    description: "撤销",
    isPressed: ctrlZPressed,
  },
  {
    name: "Alt+Tab",
    icon: "🔄",
    description: "切换",
    isPressed: altTabPressed,
  },
]);

// 方向键检测
const [upPressed] = useKeyPress("ArrowUp");
const [downPressed] = useKeyPress("ArrowDown");
const [leftPressed] = useKeyPress("ArrowLeft");
const [rightPressed] = useKeyPress("ArrowRight");

const arrowKeys = reactive({
  up: upPressed,
  down: downPressed,
  left: leftPressed,
  right: rightPressed,
});

// 获取当前按下的键
const getCurrentPressedKeys = () => {
  const pressed = [];

  singleKeys.forEach((key) => {
    if (key.isPressed) pressed.push(key.name);
  });

  comboKeys.forEach((combo) => {
    if (combo.isPressed) pressed.push(combo.name);
  });

  Object.entries(arrowKeys).forEach(([direction, isPressed]) => {
    if (isPressed) pressed.push(`Arrow${direction.charAt(0).toUpperCase() + direction.slice(1)}`);
  });

  return pressed.length > 0 ? pressed.join(", ") : "无";
};
</script>

<style scoped>
.key-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  margin-bottom: 12px;
}

.key-indicator {
  padding: 12px;
  background: #f5f5f5;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  transition: all 0.2s;
  color: #666;
}

.key-indicator.pressed {
  background: linear-gradient(45deg, #1890ff, #52c41a);
  color: white;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
}

.key-icon {
  font-size: 18px;
  margin-bottom: 4px;
}

.key-name {
  font-size: 12px;
}

.key-status {
  font-size: 10px;
  opacity: 0.8;
}

.combo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 12px;
}

.combo-indicator {
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  transition: all 0.2s;
  color: #666;
}

.combo-indicator.pressed {
  background: linear-gradient(45deg, #722ed1, #eb2f96);
  color: white;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(114, 46, 209, 0.3);
}

.combo-icon {
  font-size: 20px;
  margin-bottom: 6px;
}

.combo-name {
  font-size: 12px;
  margin-bottom: 4px;
}

.combo-description {
  font-size: 10px;
  opacity: 0.8;
}

.combo-active {
  font-size: 10px;
  margin-top: 4px;
  color: #fff;
  opacity: 0.9;
}

.arrow-keys {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.arrow-up,
.arrow-down,
.arrow-left,
.arrow-right {
  padding: 12px 16px;
  background: #f5f5f5;
  border-radius: 6px;
  font-weight: bold;
  transition: all 0.2s;
  color: #666;
}

.arrow-up.pressed,
.arrow-down.pressed,
.arrow-left.pressed,
.arrow-right.pressed {
  background: linear-gradient(45deg, #fa8c16, #f759ab);
  color: white;
  transform: scale(1.1);
}

.arrow-row {
  display: flex;
  gap: 8px;
}

.tip {
  padding: 12px;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 6px;
  font-size: 14px;
}

.current-keys {
  padding: 12px;
  background: #f0f0f0;
  border-radius: 6px;
  font-family: monospace;
  font-size: 12px;
}

kbd {
  padding: 2px 6px;
  background: #f0f0f0;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  font-family: monospace;
}
</style>
```

  </template>
</Demo>

## 高级用法示例

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">⚡ 高级按键功能</h3>
    <!-- 游戏控制 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">游戏控制示例</h4>
      <div style="position: relative; width: 100%; height: 200px; background: linear-gradient(45deg, #001529, #002140); border-radius: 8px; overflow: hidden;">
        <!-- 玩家 -->
        <div style="position: absolute; width: 30px; height: 30px; background: #52c41a; border-radius: 50%; transition: all 0.1s;"
             :style="{ 
               left: playerPosition.x + 'px', 
               top: playerPosition.y + 'px',
               boxShadow: '0 0 20px rgba(82, 196, 26, 0.6)'
             }">
        </div>
        <!-- 控制说明 -->
        <div style="position: absolute; top: 12px; left: 12px; color: white; font-size: 12px; opacity: 0.8;">
          使用 WASD 或方向键移动
        </div>
        <!-- 速度显示 -->
        <div style="position: absolute; top: 12px; right: 12px; color: white; font-size: 12px;">
          速度: {{ gameSpeed }}x
          <div style="margin-top: 4px;">按住 Shift 加速</div>
        </div>
        <!-- 位置显示 -->
        <div style="position: absolute; bottom: 12px; left: 12px; color: white; font-size: 12px;">
          位置: ({{ Math.round(playerPosition.x) }}, {{ Math.round(playerPosition.y) }})
        </div>
      </div>
    </div>
    <!-- 文本编辑器快捷键 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">文本编辑器快捷键</h4>
      <div style="border: 1px solid #d9d9d9; border-radius: 6px; overflow: hidden;">
        <div style="padding: 8px 12px; background: #fafafa; border-bottom: 1px solid #d9d9d9; font-size: 12px; color: #666;">
          编辑器 - 支持常用快捷键
        </div>
        <textarea v-model="editorContent" 
                  ref="editorRef"
                  style="width: 100%; height: 120px; padding: 12px; border: none; outline: none; resize: none; font-family: monospace; font-size: 14px;"
                  placeholder="在这里输入文本，试试 Ctrl+A (全选)、Ctrl+Z (撤销)、Ctrl+Y (重做) 等快捷键..."></textarea>
      </div>
      <div style="margin-top: 8px; display: flex; gap: 8px; flex-wrap: wrap;">
        <span v-for="shortcut in editorShortcuts" :key="shortcut.name"
              style="padding: 4px 8px; border-radius: 4px; font-size: 12px; font-family: monospace;"
              :style="{ 
                background: shortcut.isPressed ? '#1890ff' : '#f0f0f0',
                color: shortcut.isPressed ? 'white' : '#666'
              }">
          {{ shortcut.name }}: {{ shortcut.description }}
        </span>
      </div>
    </div>
    <!-- 快捷键帮助 -->
    <div>
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">快捷键帮助面板</h4>
      <div style="margin-bottom: 12px;">
        <span style="font-size: 14px;">按 </span>
        <kbd style="padding: 4px 8px; background: #f0f0f0; border: 1px solid #d9d9d9; border-radius: 4px; font-family: monospace;">F1</kbd>
        <span style="font-size: 14px;"> 显示/隐藏帮助面板</span>
        <span style="margin-left: 16px; font-size: 12px; color: #666;">(当前: {{ helpVisible ? '显示' : '隐藏' }})</span>
      </div>
      <div v-if="helpVisible" 
           style="padding: 16px; background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 6px; transition: all 0.3s;">
        <h5 style="margin: 0 0 12px 0; color: #52c41a;">🎯 快捷键列表</h5>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px; font-size: 12px;">
          <div v-for="help in helpItems" :key="help.key">
            <kbd style="padding: 2px 6px; background: #f0f0f0; border: 1px solid #d9d9d9; border-radius: 3px; font-family: monospace;">{{ help.key }}</kbd>
            <span style="margin-left: 8px;">{{ help.description }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <!-- 游戏控制 -->
    <div>
      <h4>游戏控制示例</h4>
      <div class="game-container">
        <div
          class="player"
          :style="{
            left: playerPosition.x + 'px',
            top: playerPosition.y + 'px',
          }"
        ></div>
        <div class="game-info">
          <div class="control-tip">使用 WASD 或方向键移动</div>
          <div class="speed-info">
            速度: {{ gameSpeed }}x
            <div>按住 Shift 加速</div>
          </div>
          <div class="position-info">位置: ({{ Math.round(playerPosition.x) }}, {{ Math.round(playerPosition.y) }})</div>
        </div>
      </div>
    </div>

    <!-- 文本编辑器快捷键 -->
    <div>
      <h4>文本编辑器快捷键</h4>
      <div class="editor-container">
        <div class="editor-header">编辑器 - 支持常用快捷键</div>
        <textarea
          v-model="editorContent"
          ref="editorRef"
          class="editor-textarea"
          placeholder="在这里输入文本，试试 Ctrl+A (全选)、Ctrl+Z (撤销)、Ctrl+Y (重做) 等快捷键..."
        ></textarea>
      </div>
      <div class="shortcut-indicators">
        <span v-for="shortcut in editorShortcuts" :key="shortcut.name" class="shortcut-indicator" :class="{ active: shortcut.isPressed }">
          {{ shortcut.name }}: {{ shortcut.description }}
        </span>
      </div>
    </div>

    <!-- 快捷键帮助 -->
    <div>
      <h4>快捷键帮助面板</h4>
      <div class="help-trigger">
        <span>按 </span><kbd>F1</kbd><span> 显示/隐藏帮助面板</span>
        <span class="help-status">(当前: {{ helpVisible ? "显示" : "隐藏" }})</span>
      </div>

      <div v-if="helpVisible" class="help-panel">
        <h5>🎯 快捷键列表</h5>
        <div class="help-grid">
          <div v-for="help in helpItems" :key="help.key" class="help-item">
            <kbd>{{ help.key }}</kbd>
            <span>{{ help.description }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { useKeyPress } from "@vakao-ui/hooks";

// 游戏控制
const playerPosition = reactive({ x: 100, y: 85 });
const gameSpeed = ref(1);

// 移动控制
const [moveUp] = useKeyPress(["w", "ArrowUp"]);
const [moveDown] = useKeyPress(["s", "ArrowDown"]);
const [moveLeft] = useKeyPress(["a", "ArrowLeft"]);
const [moveRight] = useKeyPress(["d", "ArrowRight"]);
const [speedBoost] = useKeyPress("shift");

// 游戏循环
let gameLoop: number;
const startGameLoop = () => {
  gameLoop = setInterval(() => {
    const speed = speedBoost.value ? 3 : 1;
    gameSpeed.value = speedBoost.value ? 2 : 1;

    if (moveUp.value && playerPosition.y > 0) {
      playerPosition.y -= speed;
    }
    if (moveDown.value && playerPosition.y < 170) {
      playerPosition.y += speed;
    }
    if (moveLeft.value && playerPosition.x > 0) {
      playerPosition.x -= speed;
    }
    if (moveRight.value && playerPosition.x < 270) {
      playerPosition.x += speed;
    }
  }, 16);
};

startGameLoop();

// 文本编辑器快捷键
const editorContent = ref("这是一个支持快捷键的文本编辑器。\n试试使用 Ctrl+A 全选文本，或者 Ctrl+Z 撤销操作。");
const editorRef = ref<HTMLTextAreaElement>();

const editorShortcuts = reactive([
  {
    name: "Ctrl+A",
    description: "全选",
    isPressed: useKeyPress(["ctrl", "a"])[0],
  },
  {
    name: "Ctrl+Z",
    description: "撤销",
    isPressed: useKeyPress(["ctrl", "z"])[0],
  },
  {
    name: "Ctrl+Y",
    description: "重做",
    isPressed: useKeyPress(["ctrl", "y"])[0],
  },
  {
    name: "Ctrl+X",
    description: "剪切",
    isPressed: useKeyPress(["ctrl", "x"])[0],
  },
]);

// 快捷键帮助
const helpVisible = ref(false);
const [helpToggle] = useKeyPress("F1");

watch(helpToggle, (pressed, wasPrevPressed) => {
  if (pressed && !wasPrevPressed) {
    helpVisible.value = !helpVisible.value;
  }
});

const helpItems = [
  { key: "F1", description: "显示/隐藏帮助" },
  { key: "Ctrl+S", description: "保存文档" },
  { key: "Ctrl+O", description: "打开文件" },
  { key: "Ctrl+N", description: "新建文档" },
  { key: "Ctrl+F", description: "查找" },
  { key: "Ctrl+H", description: "替换" },
  { key: "Ctrl+Z", description: "撤销" },
  { key: "Ctrl+Y", description: "重做" },
];
</script>

<style scoped>
.game-container {
  position: relative;
  width: 100%;
  height: 200px;
  background: linear-gradient(45deg, #001529, #002140);
  border-radius: 8px;
  overflow: hidden;
}

.player {
  position: absolute;
  width: 30px;
  height: 30px;
  background: #52c41a;
  border-radius: 50%;
  transition: all 0.1s;
  box-shadow: 0 0 20px rgba(82, 196, 26, 0.6);
}

.game-info {
  position: absolute;
  color: white;
  font-size: 12px;
}

.control-tip {
  top: 12px;
  left: 12px;
  opacity: 0.8;
}

.speed-info {
  top: 12px;
  right: 12px;
}

.position-info {
  bottom: 12px;
  left: 12px;
}

.editor-container {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  overflow: hidden;
}

.editor-header {
  padding: 8px 12px;
  background: #fafafa;
  border-bottom: 1px solid #d9d9d9;
  font-size: 12px;
  color: #666;
}

.editor-textarea {
  width: 100%;
  height: 120px;
  padding: 12px;
  border: none;
  outline: none;
  resize: none;
  font-family: monospace;
  font-size: 14px;
}

.shortcut-indicators {
  margin-top: 8px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.shortcut-indicator {
  padding: 4px 8px;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 12px;
  font-family: monospace;
  color: #666;
}

.shortcut-indicator.active {
  background: #1890ff;
  color: white;
}

.help-trigger {
  margin-bottom: 12px;
  font-size: 14px;
}

.help-status {
  margin-left: 16px;
  font-size: 12px;
  color: #666;
}

.help-panel {
  padding: 16px;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 6px;
  transition: all 0.3s;
}

.help-panel h5 {
  margin: 0 0 12px 0;
  color: #52c41a;
}

.help-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
  font-size: 12px;
}

.help-item kbd {
  padding: 2px 6px;
  background: #f0f0f0;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  font-family: monospace;
}

.help-item span {
  margin-left: 8px;
}

kbd {
  padding: 4px 8px;
  background: #f0f0f0;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-family: monospace;
}
</style>
```

  </template>
</Demo>

## API 参考

### 参数

| 参数      | 类型                 | 默认值 | 说明       |
| --------- | -------------------- | ------ | ---------- |
| keyFilter | `KeyFilter`          | -      | 按键过滤器 |
| options   | `UseKeyPressOptions` | `{}`   | 配置选项   |

### KeyFilter

支持多种按键过滤器格式：

```typescript
type KeyFilter =
  | string // 单个按键
  | string[] // 组合键数组
  | ((event: KeyboardEvent) => boolean); // 自定义过滤函数
```

### UseKeyPressOptions

| 属性       | 类型                                      | 默认值      | 说明               |
| ---------- | ----------------------------------------- | ----------- | ------------------ |
| target     | `EventTarget \| Ref<EventTarget \| null>` | `window`    | 事件目标           |
| eventName  | `'keydown' \| 'keyup'`                    | `'keydown'` | 监听的事件类型     |
| exactMatch | `boolean`                                 | `false`     | 是否精确匹配组合键 |
| useCapture | `boolean`                                 | `false`     | 是否使用捕获模式   |
| enabled    | `boolean \| Ref<boolean>`                 | `true`      | 是否启用监听       |

### 返回值

`useKeyPress` 返回一个包含三个元素的数组：

```typescript
const [isPressed, enable, disable] = useKeyPress(keyFilter, options);
```

| 索引 | 类型                   | 说明               |
| ---- | ---------------------- | ------------------ |
| 0    | `ComputedRef<boolean>` | 按键是否被按下     |
| 1    | `() => void`           | 启用按键监听的函数 |
| 2    | `() => void`           | 禁用按键监听的函数 |

### 类型定义

```typescript
export type KeyType = string | string[];

export interface UseKeyPressOptions {
  eventType?: "keydown" | "keyup";
  target?: Window | Document | HTMLElement | Ref<HTMLElement | null> | (() => HTMLElement | null);
  enabled?: boolean | Ref<boolean>;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  exactMatch?: boolean;
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
}

export type UseKeyPressReturn = [ComputedRef<boolean>, () => void, () => void];

export function useKeyPress(keys: KeyType, options?: UseKeyPressOptions): UseKeyPressReturn;
```

## 使用场景

1. **快捷键系统** - 应用程序快捷键
2. **游戏控制** - 游戏角色移动控制
3. **编辑器功能** - 文本编辑器快捷操作
4. **导航控制** - 键盘导航和操作
5. **可访问性** - 键盘无障碍访问

## 高级用法

### 组合键检测

```typescript
// 检测 Ctrl+S
const [ctrlS] = useKeyPress(["ctrl", "s"]);

// 检测 Ctrl+Shift+Z
const [ctrlShiftZ] = useKeyPress(["ctrl", "shift", "z"]);

// 检测 Alt+F4
const [altF4] = useKeyPress(["alt", "F4"]);
```

### 自定义过滤函数

```typescript
// 检测任意数字键
const [isNumberKey] = useKeyPress(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

// 检测功能键 (F1-F12)
const [isFunctionKey] = useKeyPress(["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"]);
```

### 特定元素监听

```typescript
const inputRef = ref<HTMLInputElement>();
const [enterPressed] = useKeyPress("Enter", {
  target: inputRef,
});
```

### 条件启用

```typescript
const isEnabled = ref(true);
const [spacePressed] = useKeyPress(" ", {
  enabled: isEnabled,
});
```

### 精确匹配

```typescript
// 只有同时按下 Ctrl+S 才触发，不允许其他修饰键
const [exactCtrlS] = useKeyPress(["ctrl", "s"], {
  exactMatch: true,
});
```

## 常用按键名称

### 修饰键

- `ctrl` / `control`
- `alt` / `option`
- `shift`
- `meta` / `cmd` (Mac Command 键)

### 特殊键

- `Enter` / `Return`
- `Escape` / `Esc`
- `Space` / ` `
- `Tab`
- `Backspace`
- `Delete`

### 方向键

- `ArrowUp` / `Up`
- `ArrowDown` / `Down`
- `ArrowLeft` / `Left`
- `ArrowRight` / `Right`

### 功能键

- `F1` - `F12`

## 注意事项

1. 组件卸载时会自动清理事件监听器
2. 支持响应式的启用/禁用控制
3. 组合键检测不区分大小写
4. 某些浏览器快捷键可能被拦截
5. 在输入框中使用时需要注意事件冒泡
6. 移动设备上的虚拟键盘行为可能不同

<script setup>
import { ref, reactive, watch, onMounted, onBeforeUnmount } from 'vue';
import { useKeyPress } from '@vakao-ui/hooks';

// 基础用法
const singleKeys = reactive([
  { name: 'Space', icon: '⎵', isPressed: ref(false) },
  { name: 'Enter', icon: '⏎', isPressed: ref(false) },
  { name: 'Escape', icon: '⎋', isPressed: ref(false) },
  { name: 'Tab', icon: '⇥', isPressed: ref(false) }
]);

const comboKeys = reactive([
  { 
    name: 'Ctrl+S', 
    icon: '💾', 
    description: '保存', 
    isPressed: ref(false)
  },
  { 
    name: 'Ctrl+C', 
    icon: '📋', 
    description: '复制', 
    isPressed: ref(false)
  },
  { 
    name: 'Ctrl+Z', 
    icon: '↶', 
    description: '撤销', 
    isPressed: ref(false)
  },
  { 
    name: 'Alt+Tab', 
    icon: '🔄', 
    description: '切换', 
    isPressed: ref(false)
  }
]);

const arrowKeys = reactive({
  up: ref(false),
  down: ref(false),
  left: ref(false),
  right: ref(false)
});

const pressedKeys = reactive(new Set());

const getCurrentPressedKeys = () => {
  return pressedKeys.size > 0 ? Array.from(pressedKeys).join(', ') : '无';
};

// 高级用法 - 游戏控制
const playerPosition = reactive({ x: 100, y: 85 });
const gameSpeed = ref(1);

// 文本编辑器
const editorContent = ref('这是一个支持快捷键的文本编辑器。\n试试使用 Ctrl+A 全选文本，或者 Ctrl+Z 撤销操作。');
const editorRef = ref();

const editorShortcuts = reactive([
  { name: 'Ctrl+A', description: '全选', isPressed: ref(false) },
  { name: 'Ctrl+Z', description: '撤销', isPressed: ref(false) },
  { name: 'Ctrl+Y', description: '重做', isPressed: ref(false) },
  { name: 'Ctrl+X', description: '剪切', isPressed: ref(false) }
]);

// 帮助面板
const helpVisible = ref(false);

const helpItems = [
  { key: 'F1', description: '显示/隐藏帮助' },
  { key: 'Ctrl+S', description: '保存文档' },
  { key: 'Ctrl+O', description: '打开文件' },
  { key: 'Ctrl+N', description: '新建文档' },
  { key: 'Ctrl+F', description: '查找' },
  { key: 'Ctrl+H', description: '替换' },
  { key: 'Ctrl+Z', description: '撤销' },
  { key: 'Ctrl+Y', description: '重做' }
];

// 使用 useKeyPress 钩子函数
const setupKeyListeners = () => {
  // 单键检测
  const [spacePressed] = useKeyPress(' ', { preventDefault: true });
  const [enterPressed] = useKeyPress('Enter');
  const [escapePressed] = useKeyPress('Escape');
  const [tabPressed] = useKeyPress('Tab', { preventDefault: true });

  watch(spacePressed, (value) => {
    singleKeys[0].isPressed.value = value;
    if (value) pressedKeys.add('Space');
    else pressedKeys.delete('Space');
  });

  watch(enterPressed, (value) => {
    singleKeys[1].isPressed.value = value;
    if (value) pressedKeys.add('Enter');
    else pressedKeys.delete('Enter');
  });

  watch(escapePressed, (value) => {
    singleKeys[2].isPressed.value = value;
    if (value) pressedKeys.add('Escape');
    else pressedKeys.delete('Escape');
  });

  watch(tabPressed, (value) => {
    singleKeys[3].isPressed.value = value;
    if (value) pressedKeys.add('Tab');
    else pressedKeys.delete('Tab');
  });

  // 组合键检测
  const [ctrlSPressed] = useKeyPress(['ctrl', 's'], { preventDefault: true });
  const [ctrlCPressed] = useKeyPress(['ctrl', 'c']);
  const [ctrlZPressed] = useKeyPress(['ctrl', 'z']);
  const [altTabPressed] = useKeyPress(['alt', 'tab'], { preventDefault: true });

  watch(ctrlSPressed, (value) => {
    comboKeys[0].isPressed.value = value;
    if (value) pressedKeys.add('Ctrl+S');
    else pressedKeys.delete('Ctrl+S');
  });

  watch(ctrlCPressed, (value) => {
    comboKeys[1].isPressed.value = value;
    if (value) pressedKeys.add('Ctrl+C');
    else pressedKeys.delete('Ctrl+C');
  });

  watch(ctrlZPressed, (value) => {
    comboKeys[2].isPressed.value = value;
    if (value) pressedKeys.add('Ctrl+Z');
    else pressedKeys.delete('Ctrl+Z');
  });

  watch(altTabPressed, (value) => {
    comboKeys[3].isPressed.value = value;
    if (value) pressedKeys.add('Alt+Tab');
    else pressedKeys.delete('Alt+Tab');
  });

  // 方向键检测
  const [upPressed] = useKeyPress('ArrowUp');
  const [downPressed] = useKeyPress('ArrowDown');
  const [leftPressed] = useKeyPress('ArrowLeft');
  const [rightPressed] = useKeyPress('ArrowRight');

  watch(upPressed, (value) => {
    arrowKeys.up.value = value;
    if (value) {
      pressedKeys.add('ArrowUp');
      moveUp();
    } else {
      pressedKeys.delete('ArrowUp');
    }
  });

  watch(downPressed, (value) => {
    arrowKeys.down.value = value;
    if (value) {
      pressedKeys.add('ArrowDown');
      moveDown();
    } else {
      pressedKeys.delete('ArrowDown');
    }
  });

  watch(leftPressed, (value) => {
    arrowKeys.left.value = value;
    if (value) {
      pressedKeys.add('ArrowLeft');
      moveLeft();
    } else {
      pressedKeys.delete('ArrowLeft');
    }
  });

  watch(rightPressed, (value) => {
    arrowKeys.right.value = value;
    if (value) {
      pressedKeys.add('ArrowRight');
      moveRight();
    } else {
      pressedKeys.delete('ArrowRight');
    }
  });

  // WASD 键检测
  const [wPressed] = useKeyPress('w');
  const [aPressed] = useKeyPress('a');
  const [sPressed] = useKeyPress('s');
  const [dPressed] = useKeyPress('d');

  watch(wPressed, (value) => {
    if (value) moveUp();
  });

  watch(sPressed, (value) => {
    if (value) moveDown();
  });

  watch(aPressed, (value) => {
    if (value) moveLeft();
  });

  watch(dPressed, (value) => {
    if (value) moveRight();
  });

  // Shift 键检测
  const [shiftPressed] = useKeyPress('shift');
  
  watch(shiftPressed, (value) => {
    gameSpeed.value = value ? 2 : 1;
  });

  // 编辑器快捷键
  const [ctrlAPressed] = useKeyPress(['ctrl', 'a']);
  const [ctrlYPressed] = useKeyPress(['ctrl', 'y']);
  const [ctrlXPressed] = useKeyPress(['ctrl', 'x']);

  watch(ctrlAPressed, (value) => {
    editorShortcuts[0].isPressed.value = value;
  });

  watch(ctrlZPressed, (value) => {
    editorShortcuts[1].isPressed.value = value;
  });

  watch(ctrlYPressed, (value) => {
    editorShortcuts[2].isPressed.value = value;
  });

  watch(ctrlXPressed, (value) => {
    editorShortcuts[3].isPressed.value = value;
  });

  // 帮助面板切换
  const [f1Pressed] = useKeyPress('F1', { preventDefault: true });
  
  watch(f1Pressed, (value, oldValue) => {
    if (value && !oldValue) {
      helpVisible.value = !helpVisible.value;
    }
  });
};

// 游戏循环
let gameLoop;
const moveUp = () => {
  if (playerPosition.y > 0) {
    playerPosition.y -= gameSpeed.value;
  }
};
const moveDown = () => {
  if (playerPosition.y < 170) {
    playerPosition.y += gameSpeed.value;
  }
};
const moveLeft = () => {
  if (playerPosition.x > 0) {
    playerPosition.x -= gameSpeed.value;
  }
};
const moveRight = () => {
  if (playerPosition.x < 270) {
    playerPosition.x += gameSpeed.value;
  }
};

onMounted(() => {
  // 设置按键监听
  setupKeyListeners();
  
  // 启动游戏循环
  gameLoop = setInterval(() => {
    // 游戏循环逻辑已移至按键处理函数中
  }, 16);
});

onBeforeUnmount(() => {
  if (gameLoop) {
    clearInterval(gameLoop);
  }
});
</script>
