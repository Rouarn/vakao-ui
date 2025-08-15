<template>
  <div class="tag-demo">
    <h1>Tag 标签</h1>
    <p>用于标记和选择。</p>

    <!-- 基础用法 -->
    <section class="demo-section">
      <h2>基础用法</h2>
      <p>由 type 属性来选择 tag 的类型，也可以通过 color 属性来自定义背景色。</p>
      <div class="demo-block">
        <VkTag>标签一</VkTag>
        <VkTag type="success">标签二</VkTag>
        <VkTag type="info">标签三</VkTag>
        <VkTag type="warning">标签四</VkTag>
        <VkTag type="danger">标签五</VkTag>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkTag&gt;标签一&lt;/VkTag&gt;
&lt;VkTag type="success"&gt;标签二&lt;/VkTag&gt;
&lt;VkTag type="info"&gt;标签三&lt;/VkTag&gt;
&lt;VkTag type="warning"&gt;标签四&lt;/VkTag&gt;
&lt;VkTag type="danger"&gt;标签五&lt;/VkTag&gt;</code></pre>
      </div>
    </section>

    <!-- 可移除标签 -->
    <section class="demo-section">
      <h2>可移除标签</h2>
      <p>设置 closable 属性可以定义一个标签是否可移除。</p>
      <div class="demo-block">
        <VkTag v-for="tag in dynamicTags" :key="tag" closable @close="handleClose(tag)">
          {{ tag }}
        </VkTag>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkTag
  v-for="tag in tags"
  :key="tag"
  closable
  @close="handleClose(tag)"
&gt;
{{ $attrs.tag }}
&lt;/VkTag&gt;</code></pre>
      </div>
    </section>

    <!-- 动态编辑标签 -->
    <section class="demo-section">
      <h2>动态编辑标签</h2>
      <p>动态编辑标签可以通过点击标签关闭按钮后触发的 close 事件来实现。</p>
      <div class="demo-block">
        <VkTag v-for="tag in editableTags" :key="tag" closable @close="handleEditableClose(tag)">
          {{ tag }}
        </VkTag>
        <VkInput
          v-if="inputVisible"
          ref="saveTagInput"
          v-model="inputValue"
          size="small"
          style="width: 90px; margin-left: 10px"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <VkButton v-else size="small" style="margin-left: 10px" @click="showInput"> + New Tag </VkButton>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkTag
  v-for="tag in tags"
  :key="tag"
  closable
  @close="handleClose(tag)"
&gt;
  {{ $attrs.tag }}
&lt;/VkTag&gt;
&lt;VkInput
  v-if="inputVisible"
  v-model="inputValue"
  @keyup.enter="handleInputConfirm"
  @blur="handleInputConfirm"
/&gt;</code></pre>
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="demo-section">
      <h2>不同尺寸</h2>
      <p>Tag 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的标签尺寸。</p>
      <div class="demo-block">
        <VkTag size="large">大型标签</VkTag>
        <VkTag>默认标签</VkTag>
        <VkTag size="small">小型标签</VkTag>
        <VkTag size="mini">超小标签</VkTag>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkTag size="large"&gt;大型标签&lt;/VkTag&gt;
&lt;VkTag&gt;默认标签&lt;/VkTag&gt;
&lt;VkTag size="small"&gt;小型标签&lt;/VkTag&gt;
&lt;VkTag size="mini"&gt;超小标签&lt;/VkTag&gt;</code></pre>
      </div>
    </section>

    <!-- 不同主题 -->
    <section class="demo-section">
      <h2>不同主题</h2>
      <p>Tag 组件提供了三个不同的主题：dark、light 和 plain。</p>
      <div class="demo-block">
        <div class="theme-group">
          <h4>Dark 主题</h4>
          <VkTag effect="dark">标签一</VkTag>
          <VkTag type="success" effect="dark">标签二</VkTag>
          <VkTag type="info" effect="dark">标签三</VkTag>
          <VkTag type="warning" effect="dark">标签四</VkTag>
          <VkTag type="danger" effect="dark">标签五</VkTag>
        </div>
        <div class="theme-group">
          <h4>Light 主题</h4>
          <VkTag effect="light">标签一</VkTag>
          <VkTag type="success" effect="light">标签二</VkTag>
          <VkTag type="info" effect="light">标签三</VkTag>
          <VkTag type="warning" effect="light">标签四</VkTag>
          <VkTag type="danger" effect="light">标签五</VkTag>
        </div>
        <div class="theme-group">
          <h4>Plain 主题</h4>
          <VkTag effect="plain">标签一</VkTag>
          <VkTag type="success" effect="plain">标签二</VkTag>
          <VkTag type="info" effect="plain">标签三</VkTag>
          <VkTag type="warning" effect="plain">标签四</VkTag>
          <VkTag type="danger" effect="plain">标签五</VkTag>
        </div>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkTag effect="dark"&gt;标签一&lt;/VkTag&gt;
&lt;VkTag effect="light"&gt;标签二&lt;/VkTag&gt;
&lt;VkTag effect="plain"&gt;标签三&lt;/VkTag&gt;</code></pre>
      </div>
    </section>

    <!-- 圆形标签 -->
    <section class="demo-section">
      <h2>圆形标签</h2>
      <p>通过 round 属性可以控制标签是否为圆形。</p>
      <div class="demo-block">
        <VkTag round>标签一</VkTag>
        <VkTag type="success" round>标签二</VkTag>
        <VkTag type="info" round>标签三</VkTag>
        <VkTag type="warning" round>标签四</VkTag>
        <VkTag type="danger" round>标签五</VkTag>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkTag round&gt;标签一&lt;/VkTag&gt;
&lt;VkTag type="success" round&gt;标签二&lt;/VkTag&gt;</code></pre>
      </div>
    </section>

    <!-- 可选择标签 -->
    <section class="demo-section">
      <h2>可选择标签</h2>
      <p>设置 checkable 属性可以定义标签是否可选择。</p>
      <div class="demo-block">
        <VkTag v-for="tag in checkableTags" :key="tag.name" :type="tag.type" checkable :checked="tag.checked" @change="handleTagCheck(tag)">
          {{ tag.name }}
        </VkTag>
        <div class="selected-tags">
          <h4>已选择的标签：</h4>
          <span v-if="selectedTags.length === 0" class="no-selection">暂无选择</span>
          <VkTag v-for="tag in selectedTags" :key="tag.name" :type="tag.type" size="small">
            {{ tag.name }}
          </VkTag>
        </div>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkTag
  checkable
  :checked="checked"
  @change="handleChange"
&gt;
  标签
&lt;/VkTag&gt;</code></pre>
      </div>
    </section>

    <!-- 自定义颜色 -->
    <section class="demo-section">
      <h2>自定义颜色</h2>
      <p>通过 color 属性可以自定义标签的背景色。</p>
      <div class="demo-block">
        <VkTag color="#f56c6c">红色标签</VkTag>
        <VkTag color="#67c23a">绿色标签</VkTag>
        <VkTag color="#409eff">蓝色标签</VkTag>
        <VkTag color="#e6a23c">橙色标签</VkTag>
        <VkTag color="#909399">灰色标签</VkTag>
        <VkTag color="linear-gradient(45deg, #409eff, #67c23a)">渐变标签</VkTag>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkTag color="#f56c6c"&gt;红色标签&lt;/VkTag&gt;
&lt;VkTag color="#67c23a"&gt;绿色标签&lt;/VkTag&gt;
&lt;VkTag color="linear-gradient(45deg, #409eff, #67c23a)"&gt;渐变标签&lt;/VkTag&gt;</code></pre>
      </div>
    </section>

    <!-- 实际应用场景 -->
    <section class="demo-section">
      <h2>实际应用场景</h2>
      <p>在实际项目中的常见使用场景。</p>

      <!-- 文章标签 -->
      <div class="demo-subsection">
        <h3>文章标签管理</h3>
        <div class="demo-block">
          <div class="article-tags">
            <div class="tag-category">
              <h4>技术标签</h4>
              <VkTag v-for="tag in techTags" :key="tag" type="primary" closable @close="removeTechTag(tag)">
                {{ tag }}
              </VkTag>
              <VkInput
                v-if="techInputVisible"
                ref="techInput"
                v-model="techInputValue"
                size="small"
                style="width: 90px; margin-left: 10px"
                @keyup.enter="addTechTag"
                @blur="addTechTag"
              />
              <VkButton v-else size="small" style="margin-left: 10px" @click="showTechInput"> + 添加技术标签 </VkButton>
            </div>
            <div class="tag-category">
              <h4>分类标签</h4>
              <VkTag v-for="tag in categoryTags" :key="tag" type="success" closable @close="removeCategoryTag(tag)">
                {{ tag }}
              </VkTag>
              <VkInput
                v-if="categoryInputVisible"
                ref="categoryInput"
                v-model="categoryInputValue"
                size="small"
                style="width: 90px; margin-left: 10px"
                @keyup.enter="addCategoryTag"
                @blur="addCategoryTag"
              />
              <VkButton v-else size="small" style="margin-left: 10px" @click="showCategoryInput"> + 添加分类标签 </VkButton>
            </div>
          </div>
        </div>
      </div>

      <!-- 商品标签 -->
      <div class="demo-subsection">
        <h3>商品标签展示</h3>
        <div class="demo-block">
          <div class="product-list">
            <div v-for="product in products" :key="product.id" class="product-item">
              <div class="product-info">
                <h4>{{ product.name }}</h4>
                <p class="product-price">¥{{ product.price }}</p>
              </div>
              <div class="product-tags">
                <VkTag v-for="tag in product.tags" :key="tag.name" :type="tag.type" :effect="tag.effect" size="small">
                  {{ tag.name }}
                </VkTag>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 状态标签 -->
      <div class="demo-subsection">
        <h3>状态标签</h3>
        <div class="demo-block">
          <div class="status-list">
            <div v-for="item in statusItems" :key="item.id" class="status-item">
              <span class="item-name">{{ item.name }}</span>
              <VkTag :type="item.status.type" :effect="item.status.effect" size="small">
                {{ item.status.text }}
              </VkTag>
            </div>
          </div>
        </div>
      </div>

      <!-- 筛选标签 -->
      <div class="demo-subsection">
        <h3>筛选标签</h3>
        <div class="demo-block">
          <div class="filter-section">
            <div class="filter-group">
              <h4>技能筛选</h4>
              <VkTag v-for="skill in skills" :key="skill" checkable :checked="selectedSkills.includes(skill)" @change="toggleSkill(skill)">
                {{ skill }}
              </VkTag>
            </div>
            <div class="filter-group">
              <h4>经验筛选</h4>
              <VkTag
                v-for="exp in experiences"
                :key="exp"
                checkable
                type="success"
                :checked="selectedExperiences.includes(exp)"
                @change="toggleExperience(exp)"
              >
                {{ exp }}
              </VkTag>
            </div>
            <div class="filter-result">
              <h4>筛选结果：</h4>
              <div class="result-tags">
                <VkTag
                  v-for="skill in selectedSkills"
                  :key="'skill-' + skill"
                  type="primary"
                  size="small"
                  closable
                  @close="toggleSkill(skill)"
                >
                  技能：{{ skill }}
                </VkTag>
                <VkTag
                  v-for="exp in selectedExperiences"
                  :key="'exp-' + exp"
                  type="success"
                  size="small"
                  closable
                  @close="toggleExperience(exp)"
                >
                  经验：{{ exp }}
                </VkTag>
              </div>
              <VkButton size="small" type="danger" style="margin-top: 10px" @click="clearFilters"> 清空筛选 </VkButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 事件处理 -->
    <section class="demo-section">
      <h2>事件处理</h2>
      <p>Tag 的各种事件处理。</p>
      <div class="demo-block">
        <div class="event-demo">
          <VkTag
            v-for="tag in eventTags"
            :key="tag.name"
            :type="tag.type"
            closable
            checkable
            :checked="tag.checked"
            @close="handleEventClose(tag)"
            @change="handleEventChange(tag)"
            @click="handleEventClick(tag)"
          >
            {{ tag.name }}
          </VkTag>
        </div>
        <div class="event-log">
          <h4>事件日志：</h4>
          <div class="log-content">
            <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
              {{ log }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";

// 类型定义
interface CheckableTag {
  name: string;
  type: "primary" | "success" | "info" | "warning" | "danger";
  checked: boolean;
}

interface ProductTag {
  name: string;
  type: "primary" | "success" | "info" | "warning" | "danger";
  effect: "dark" | "light" | "plain";
}

interface Product {
  id: number;
  name: string;
  price: number;
  tags: ProductTag[];
}

interface StatusItem {
  id: number;
  name: string;
  status: {
    text: string;
    type: "primary" | "success" | "info" | "warning" | "danger";
    effect: "dark" | "light" | "plain";
  };
}

interface EventTag {
  name: string;
  type: "primary" | "success" | "info" | "warning" | "danger";
  checked: boolean;
}

// 基础数据
const dynamicTags = ref<string[]>(["标签一", "标签二", "标签三"]);
const editableTags = ref<string[]>(["标签一", "标签二", "标签三"]);
const inputVisible = ref<boolean>(false);
const inputValue = ref<string>("");
const saveTagInput = ref<HTMLInputElement | null>(null);

// 可选择标签
const checkableTags = ref<CheckableTag[]>([
  { name: "Vue.js", type: "primary", checked: false },
  { name: "React", type: "success", checked: true },
  { name: "Angular", type: "info", checked: false },
  { name: "Svelte", type: "warning", checked: false },
  { name: "Node.js", type: "danger", checked: true },
]);

// 文章标签
const techTags = ref<string[]>(["Vue.js", "JavaScript", "TypeScript"]);
const categoryTags = ref<string[]>(["前端开发", "技术分享"]);
const techInputVisible = ref<boolean>(false);
const techInputValue = ref<string>("");
const categoryInputVisible = ref<boolean>(false);
const categoryInputValue = ref<string>("");
const techInput = ref<HTMLInputElement | null>(null);
const categoryInput = ref<HTMLInputElement | null>(null);

// 商品数据
const products = ref<Product[]>([
  {
    id: 1,
    name: "iPhone 14 Pro",
    price: 7999,
    tags: [
      { name: "热销", type: "danger", effect: "dark" },
      { name: "新品", type: "success", effect: "plain" },
      { name: "5G", type: "primary", effect: "light" },
    ],
  },
  {
    id: 2,
    name: "MacBook Pro",
    price: 14999,
    tags: [
      { name: "专业", type: "info", effect: "dark" },
      { name: "高性能", type: "warning", effect: "plain" },
    ],
  },
  {
    id: 3,
    name: "AirPods Pro",
    price: 1999,
    tags: [
      { name: "降噪", type: "success", effect: "light" },
      { name: "无线", type: "primary", effect: "plain" },
      { name: "便携", type: "info", effect: "light" },
    ],
  },
]);

// 状态数据
const statusItems = ref<StatusItem[]>([
  {
    id: 1,
    name: "订单 #001",
    status: { text: "已完成", type: "success", effect: "light" },
  },
  {
    id: 2,
    name: "订单 #002",
    status: { text: "处理中", type: "warning", effect: "light" },
  },
  {
    id: 3,
    name: "订单 #003",
    status: { text: "已取消", type: "danger", effect: "light" },
  },
  {
    id: 4,
    name: "订单 #004",
    status: { text: "待支付", type: "info", effect: "light" },
  },
]);

// 筛选数据
const skills = ref<string[]>(["Vue.js", "React", "Angular", "Node.js", "Python", "Java"]);
const experiences = ref<string[]>(["1-3年", "3-5年", "5-10年", "10年以上"]);
const selectedSkills = ref<string[]>(["Vue.js", "React"]);
const selectedExperiences = ref<string[]>(["3-5年"]);

// 事件标签
const eventTags = ref<EventTag[]>([
  { name: "标签1", type: "primary", checked: false },
  { name: "标签2", type: "success", checked: true },
  { name: "标签3", type: "warning", checked: false },
]);

// 事件日志
const eventLogs = ref<string[]>([]);

// 计算属性
const selectedTags = computed(() => {
  return checkableTags.value.filter((tag) => tag.checked);
});

// 基础方法
const handleClose = (tag: string): void => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};

const handleEditableClose = (tag: string): void => {
  editableTags.value.splice(editableTags.value.indexOf(tag), 1);
};

const showInput = (): void => {
  inputVisible.value = true;
  nextTick(() => {
    saveTagInput.value?.focus();
  });
};

const handleInputConfirm = (): void => {
  const { value } = inputValue;
  if (value && !editableTags.value.includes(value)) {
    editableTags.value.push(value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};

const handleTagCheck = (tag: CheckableTag): void => {
  tag.checked = !tag.checked;
};

// 文章标签方法
const removeTechTag = (tag: string): void => {
  techTags.value.splice(techTags.value.indexOf(tag), 1);
};

const removeCategoryTag = (tag: string): void => {
  categoryTags.value.splice(categoryTags.value.indexOf(tag), 1);
};

const showTechInput = (): void => {
  techInputVisible.value = true;
  nextTick(() => {
    techInput.value?.focus();
  });
};

const showCategoryInput = (): void => {
  categoryInputVisible.value = true;
  nextTick(() => {
    categoryInput.value?.focus();
  });
};

const addTechTag = (): void => {
  const { value } = techInputValue;
  if (value && !techTags.value.includes(value)) {
    techTags.value.push(value);
  }
  techInputVisible.value = false;
  techInputValue.value = "";
};

const addCategoryTag = (): void => {
  const { value } = categoryInputValue;
  if (value && !categoryTags.value.includes(value)) {
    categoryTags.value.push(value);
  }
  categoryInputVisible.value = false;
  categoryInputValue.value = "";
};

// 筛选方法
const toggleSkill = (skill: string): void => {
  const index = selectedSkills.value.indexOf(skill);
  if (index > -1) {
    selectedSkills.value.splice(index, 1);
  } else {
    selectedSkills.value.push(skill);
  }
};

const toggleExperience = (exp: string): void => {
  const index = selectedExperiences.value.indexOf(exp);
  if (index > -1) {
    selectedExperiences.value.splice(index, 1);
  } else {
    selectedExperiences.value.push(exp);
  }
};

const clearFilters = (): void => {
  selectedSkills.value = [];
  selectedExperiences.value = [];
  addLog("筛选条件已清空");
};

// 事件处理方法
const handleEventClose = (tag: EventTag): void => {
  const index = eventTags.value.findIndex((t) => t.name === tag.name);
  if (index > -1) {
    eventTags.value.splice(index, 1);
    addLog(`标签 "${tag.name}" 被关闭`);
  }
};

const handleEventChange = (tag: EventTag): void => {
  tag.checked = !tag.checked;
  addLog(`标签 "${tag.name}" 选择状态变为: ${tag.checked ? "选中" : "未选中"}`);
};

const handleEventClick = (tag: EventTag): void => {
  addLog(`标签 "${tag.name}" 被点击`);
};

const addLog = (message: string): void => {
  const timestamp = new Date().toLocaleTimeString();
  eventLogs.value.unshift(`[${timestamp}] ${message}`);
  if (eventLogs.value.length > 10) {
    eventLogs.value.pop();
  }
};
</script>

<style scoped>
.tag-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background-color: #fff;
}

.demo-section h2 {
  margin: 0 0 10px 0;
  font-size: 20px;
  color: #303133;
}

.demo-section p {
  margin: 0 0 20px 0;
  color: #606266;
  font-size: 14px;
}

.demo-block {
  padding: 20px;
  border: 1px solid #ebebeb;
  border-radius: 6px;
  background-color: #fafafa;
  margin-bottom: 20px;
}

.demo-block .vk-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}

.demo-code {
  background-color: #f5f7fa;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 15px;
}

.demo-code pre {
  margin: 0;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 12px;
  color: #525252;
}

.demo-subsection {
  margin-bottom: 30px;
}

.demo-subsection h3 {
  margin: 0 0 15px 0;
  font-size: 16px;
  color: #409eff;
}

.theme-group {
  margin-bottom: 20px;
}

.theme-group h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #303133;
}

.theme-group .vk-tag {
  margin-right: 10px;
}

.selected-tags {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.selected-tags h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #303133;
}

.no-selection {
  color: #909399;
  font-size: 12px;
}

.article-tags {
  max-width: 800px;
}

.tag-category {
  margin-bottom: 25px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.tag-category h4 {
  margin: 0 0 15px 0;
  font-size: 14px;
  color: #303133;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.product-item {
  padding: 15px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background-color: #fff;
}

.product-info h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #303133;
}

.product-price {
  margin: 0 0 15px 0;
  font-size: 18px;
  color: #f56c6c;
  font-weight: bold;
}

.product-tags .vk-tag {
  margin-right: 8px;
  margin-bottom: 5px;
}

.status-list {
  max-width: 400px;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e4e7ed;
}

.status-item:last-child {
  border-bottom: none;
}

.item-name {
  font-size: 14px;
  color: #303133;
}

.filter-section {
  max-width: 800px;
}

.filter-group {
  margin-bottom: 25px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.filter-group h4 {
  margin: 0 0 15px 0;
  font-size: 14px;
  color: #303133;
}

.filter-result {
  padding: 15px;
  background-color: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
}

.filter-result h4 {
  margin: 0 0 15px 0;
  font-size: 14px;
  color: #303133;
}

.result-tags .vk-tag {
  margin-right: 8px;
  margin-bottom: 8px;
}

.event-demo {
  margin-bottom: 20px;
}

.event-log {
  margin-top: 20px;
}

.event-log h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #303133;
}

.log-content {
  max-height: 200px;
  overflow-y: auto;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 10px;
}

.log-item {
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
  padding: 2px 0;
  border-bottom: 1px solid #eee;
}

.log-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}
</style>
