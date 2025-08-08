<template>
  <div class="select-demo">
    <h1>Select 选择器</h1>
    <p>当选项过多时，使用下拉菜单展示并选择内容。</p>

    <!-- 基础用法 -->
    <section class="demo-section">
      <h2>基础用法</h2>
      <p>适用广泛的基础单选。</p>
      <div class="demo-block">
        <VkSpace vertical>
          <VkSelect v-model="basicValue" placeholder="请选择">
            <VkOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </VkSelect>
          <p>选中值：{{ basicValue }}</p>
        </VkSpace>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkSelect v-model="value" placeholder="请选择"&gt;
  &lt;VkOption
    v-for="item in options"
    :key="item.value"
    :label="item.label"
    :value="item.value"
  /&gt;
&lt;/VkSelect&gt;</code></pre>
      </div>
    </section>

    <!-- 有禁用选项 -->
    <section class="demo-section">
      <h2>有禁用选项</h2>
      <p>在 VkOption 中，设定 disabled 值为 true，即可禁用该选项。</p>
      <div class="demo-block">
        <VkSpace vertical>
          <VkSelect v-model="disabledValue" placeholder="请选择">
            <VkOption v-for="item in disabledOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
          </VkSelect>
          <p>选中值：{{ disabledValue }}</p>
        </VkSpace>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkOption
  :label="item.label"
  :value="item.value"
  :disabled="item.disabled"
/&gt;</code></pre>
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="demo-section">
      <h2>禁用状态</h2>
      <p>选择器不可用状态。</p>
      <div class="demo-block">
        <VkSpace vertical>
          <VkSelect v-model="disabledSelectValue" disabled placeholder="请选择">
            <VkOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </VkSelect>
          <p>选中值：{{ disabledSelectValue }}</p>
        </VkSpace>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkSelect v-model="value" disabled placeholder="请选择"&gt;
  &lt;VkOption label="选项1" value="option1" /&gt;
&lt;/VkSelect&gt;</code></pre>
      </div>
    </section>

    <!-- 可清空单选 -->
    <section class="demo-section">
      <h2>可清空单选</h2>
      <p>包含清空按钮，可将选择器清空为初始状态。</p>
      <div class="demo-block">
        <VkSpace vertical>
          <VkSelect v-model="clearableValue" clearable placeholder="请选择">
            <VkOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </VkSelect>
          <p>选中值：{{ clearableValue }}</p>
        </VkSpace>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkSelect v-model="value" clearable placeholder="请选择"&gt;
  &lt;VkOption label="选项1" value="option1" /&gt;
&lt;/VkSelect&gt;</code></pre>
      </div>
    </section>

    <!-- 基础多选 -->
    <section class="demo-section">
      <h2>基础多选</h2>
      <p>适用性较广的基础多选，用 Tag 展示已选项。</p>
      <div class="demo-block">
        <VkSpace vertical>
          <VkSelect v-model="multipleValue" multiple placeholder="请选择">
            <VkOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </VkSelect>
          <p>选中值：{{ multipleValue }}</p>
        </VkSpace>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkSelect v-model="value" multiple placeholder="请选择"&gt;
  &lt;VkOption label="选项1" value="option1" /&gt;
&lt;/VkSelect&gt;</code></pre>
      </div>
    </section>

    <!-- 自定义模板 -->
    <section class="demo-section">
      <h2>自定义模板</h2>
      <p>可以自定义备选项的模板。</p>
      <div class="demo-block">
        <VkSpace vertical>
          <VkSelect v-model="customValue" placeholder="请选择">
            <VkOption v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.desc }}</span>
            </VkOption>
          </VkSelect>
          <p>选中值：{{ customValue }}</p>
        </VkSpace>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkOption :value="item.value"&gt;
  &lt;span style="float: left"&gt;&#123;&#123; item.label &#125;&#125;&lt;/span&gt;
  &lt;span style="float: right"&gt;&#123;&#123; item.desc &#125;&#125;&lt;/span&gt;
&lt;/VkOption&gt;</code></pre>
      </div>
    </section>

    <!-- 分组 -->
    <section class="demo-section">
      <h2>分组</h2>
      <p>备选项进行分组展示。</p>
      <div class="demo-block">
        <VkSpace vertical>
          <VkSelect v-model="groupValue" placeholder="请选择">
            <VkOptionGroup v-for="group in groupOptions" :key="group.label" :label="group.label">
              <VkOption v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
            </VkOptionGroup>
          </VkSelect>
          <p>选中值：{{ groupValue }}</p>
        </VkSpace>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkSelect v-model="value" placeholder="请选择"&gt;
  &lt;VkOptionGroup label="热门城市"&gt;
    &lt;VkOption label="上海" value="shanghai" /&gt;
    &lt;VkOption label="北京" value="beijing" /&gt;
  &lt;/VkOptionGroup&gt;
&lt;/VkSelect&gt;</code></pre>
      </div>
    </section>

    <!-- 可搜索 -->
    <section class="demo-section">
      <h2>可搜索</h2>
      <p>可以利用搜索功能快速查找选项。</p>
      <div class="demo-block">
        <VkSpace vertical>
          <VkSelect v-model="searchValue" filterable placeholder="请选择">
            <VkOption v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value" />
          </VkSelect>
          <p>选中值：{{ searchValue }}</p>
        </VkSpace>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkSelect v-model="value" filterable placeholder="请选择"&gt;
  &lt;VkOption label="选项1" value="option1" /&gt;
&lt;/VkSelect&gt;</code></pre>
      </div>
    </section>

    <!-- 远程搜索 -->
    <section class="demo-section">
      <h2>远程搜索</h2>
      <p>从服务器搜索数据，输入关键字进行查找。</p>
      <div class="demo-block">
        <VkSpace vertical>
          <VkSelect
            v-model="remoteValue"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <VkOption v-for="item in remoteOptions" :key="item.value" :label="item.label" :value="item.value" />
          </VkSelect>
          <p>选中值：{{ remoteValue }}</p>
        </VkSpace>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkSelect
  v-model="value"
  filterable
  remote
  :remote-method="remoteMethod"
  :loading="loading"
&gt;
  &lt;VkOption :label="item.label" :value="item.value" /&gt;
&lt;/VkSelect&gt;</code></pre>
      </div>
    </section>

    <!-- 创建条目 -->
    <section class="demo-section">
      <h2>创建条目</h2>
      <p>可以创建并选中选项中不存在的条目。</p>
      <div class="demo-block">
        <VkSpace vertical>
          <VkSelect v-model="createValue" multiple filterable allow-create default-first-option placeholder="请选择文章标签">
            <VkOption v-for="item in createOptions" :key="item.value" :label="item.label" :value="item.value" />
          </VkSelect>
          <p>选中值：{{ createValue }}</p>
        </VkSpace>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkSelect
  v-model="value"
  multiple
  filterable
  allow-create
  default-first-option
&gt;
  &lt;VkOption :label="item.label" :value="item.value" /&gt;
&lt;/VkSelect&gt;</code></pre>
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="demo-section">
      <h2>不同尺寸</h2>
      <p>Select 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的尺寸。</p>
      <div class="demo-block">
        <VkSpace vertical>
          <VkSelect v-model="sizeValue1" size="large" placeholder="大尺寸">
            <VkOption label="选项1" value="option1" />
            <VkOption label="选项2" value="option2" />
          </VkSelect>
          <VkSelect v-model="sizeValue2" placeholder="默认尺寸">
            <VkOption label="选项1" value="option1" />
            <VkOption label="选项2" value="option2" />
          </VkSelect>
          <VkSelect v-model="sizeValue3" size="small" placeholder="小尺寸">
            <VkOption label="选项1" value="option1" />
            <VkOption label="选项2" value="option2" />
          </VkSelect>
          <VkSelect v-model="sizeValue4" size="mini" placeholder="迷你尺寸">
            <VkOption label="选项1" value="option1" />
            <VkOption label="选项2" value="option2" />
          </VkSelect>
        </VkSpace>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkSelect size="large" placeholder="大尺寸"&gt;
&lt;VkSelect placeholder="默认尺寸"&gt;
&lt;VkSelect size="small" placeholder="小尺寸"&gt;
&lt;VkSelect size="mini" placeholder="迷你尺寸"&gt;</code></pre>
      </div>
    </section>

    <!-- 实际应用场景 -->
    <section class="demo-section">
      <h2>实际应用场景</h2>
      <p>在实际项目中的常见使用场景。</p>

      <!-- 表单选择 -->
      <div class="demo-subsection">
        <h3>用户信息表单</h3>
        <div class="demo-block">
          <div class="form-demo">
            <div class="form-item">
              <label>国家/地区：</label>
              <VkSelect v-model="formData.country" placeholder="请选择国家">
                <VkOption v-for="country in countries" :key="country.value" :label="country.label" :value="country.value" />
              </VkSelect>
            </div>
            <div class="form-item">
              <label>城市：</label>
              <VkSelect v-model="formData.city" placeholder="请选择城市" :disabled="!formData.country">
                <VkOption v-for="city in filteredCities" :key="city.value" :label="city.label" :value="city.value" />
              </VkSelect>
            </div>
            <div class="form-item">
              <label>兴趣爱好：</label>
              <VkSelect v-model="formData.hobbies" multiple placeholder="请选择兴趣爱好">
                <VkOption v-for="hobby in hobbies" :key="hobby.value" :label="hobby.label" :value="hobby.value" />
              </VkSelect>
            </div>
            <div class="form-result">
              <h4>表单数据：</h4>
              <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
            </div>
          </div>
        </div>
      </div>

      <!-- 筛选器 -->
      <div class="demo-subsection">
        <h3>商品筛选器</h3>
        <div class="demo-block">
          <div class="filter-demo">
            <div class="filter-controls">
              <VkSelect v-model="filterData.category" placeholder="商品分类" clearable>
                <VkOption v-for="category in categories" :key="category.value" :label="category.label" :value="category.value" />
              </VkSelect>
              <VkSelect v-model="filterData.brand" placeholder="品牌" clearable>
                <VkOption v-for="brand in brands" :key="brand.value" :label="brand.label" :value="brand.value" />
              </VkSelect>
              <VkSelect v-model="filterData.priceRange" placeholder="价格区间" clearable>
                <VkOption v-for="range in priceRanges" :key="range.value" :label="range.label" :value="range.value" />
              </VkSelect>
              <VkButton type="danger" @click="resetFilters">重置筛选</VkButton>
            </div>
            <div class="filter-result">
              <h4>筛选条件：</h4>
              <div class="filter-tags">
                <VkTag v-if="filterData.category" closable @close="filterData.category = ''">
                  分类：{{ getCategoryLabel(filterData.category) }}
                </VkTag>
                <VkTag v-if="filterData.brand" closable @close="filterData.brand = ''"> 品牌：{{ getBrandLabel(filterData.brand) }} </VkTag>
                <VkTag v-if="filterData.priceRange" closable @close="filterData.priceRange = ''">
                  价格：{{ getPriceRangeLabel(filterData.priceRange) }}
                </VkTag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 事件处理 -->
    <section class="demo-section">
      <h2>事件处理</h2>
      <p>Select 的各种事件处理。</p>
      <div class="demo-block">
        <div class="event-demo">
          <VkSelect
            v-model="eventValue"
            placeholder="请选择"
            multiple
            clearable
            @change="handleChange"
            @visible-change="handleVisibleChange"
            @remove-tag="handleRemoveTag"
            @clear="handleClear"
            @blur="handleBlur"
            @focus="handleFocus"
          >
            <VkOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </VkSelect>
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

<script setup>
import { ref, computed, watch } from "vue";

// 基础数据
const basicValue = ref("");
const disabledValue = ref("");
const disabledSelectValue = ref("");
const clearableValue = ref("");
const multipleValue = ref([]);
const customValue = ref("");
const groupValue = ref("");
const searchValue = ref("");
const remoteValue = ref("");
const createValue = ref([]);
const sizeValue1 = ref("");
const sizeValue2 = ref("");
const sizeValue3 = ref("");
const sizeValue4 = ref("");
const eventValue = ref([]);

// 选项数据
const options = ref([
  { value: "option1", label: "黄金糕" },
  { value: "option2", label: "双皮奶" },
  { value: "option3", label: "蚵仔煎" },
  { value: "option4", label: "龙须面" },
  { value: "option5", label: "北京烤鸭" },
]);

const disabledOptions = ref([
  { value: "option1", label: "黄金糕" },
  { value: "option2", label: "双皮奶", disabled: true },
  { value: "option3", label: "蚵仔煎" },
  { value: "option4", label: "龙须面", disabled: true },
  { value: "option5", label: "北京烤鸭" },
]);

const cities = ref([
  { value: "beijing", label: "北京", desc: "首都" },
  { value: "shanghai", label: "上海", desc: "魔都" },
  { value: "nanjing", label: "南京", desc: "六朝古都" },
  { value: "chengdu", label: "成都", desc: "天府之国" },
  { value: "shenzhen", label: "深圳", desc: "特区" },
  { value: "guangzhou", label: "广州", desc: "花城" },
]);

const groupOptions = ref([
  {
    label: "热门城市",
    options: [
      { value: "shanghai", label: "上海" },
      { value: "beijing", label: "北京" },
    ],
  },
  {
    label: "城市名",
    options: [
      { value: "chengdu", label: "成都" },
      { value: "shenzhen", label: "深圳" },
      { value: "guangzhou", label: "广州" },
      { value: "dalian", label: "大连" },
    ],
  },
]);

const searchOptions = ref([
  { value: "vue", label: "Vue.js" },
  { value: "react", label: "React" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "ember", label: "Ember.js" },
  { value: "backbone", label: "Backbone.js" },
  { value: "jquery", label: "jQuery" },
  { value: "lodash", label: "Lodash" },
]);

const createOptions = ref([
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "vue", label: "Vue.js" },
  { value: "react", label: "React" },
]);

// 远程搜索相关
const loading = ref(false);
const remoteOptions = ref([]);
const allRemoteOptions = [
  { value: "alabama", label: "Alabama" },
  { value: "alaska", label: "Alaska" },
  { value: "arizona", label: "Arizona" },
  { value: "arkansas", label: "Arkansas" },
  { value: "california", label: "California" },
  { value: "colorado", label: "Colorado" },
  { value: "connecticut", label: "Connecticut" },
  { value: "delaware", label: "Delaware" },
  { value: "florida", label: "Florida" },
  { value: "georgia", label: "Georgia" },
];

// 表单数据
const formData = ref({
  country: "",
  city: "",
  hobbies: [],
});

const countries = ref([
  { value: "china", label: "中国" },
  { value: "usa", label: "美国" },
  { value: "japan", label: "日本" },
  { value: "korea", label: "韩国" },
]);

const allCities = ref([
  { value: "beijing", label: "北京", country: "china" },
  { value: "shanghai", label: "上海", country: "china" },
  { value: "guangzhou", label: "广州", country: "china" },
  { value: "newyork", label: "纽约", country: "usa" },
  { value: "losangeles", label: "洛杉矶", country: "usa" },
  { value: "tokyo", label: "东京", country: "japan" },
  { value: "osaka", label: "大阪", country: "japan" },
  { value: "seoul", label: "首尔", country: "korea" },
  { value: "busan", label: "釜山", country: "korea" },
]);

const hobbies = ref([
  { value: "reading", label: "阅读" },
  { value: "music", label: "音乐" },
  { value: "sports", label: "运动" },
  { value: "travel", label: "旅行" },
  { value: "photography", label: "摄影" },
  { value: "cooking", label: "烹饪" },
]);

// 筛选数据
const filterData = ref({
  category: "",
  brand: "",
  priceRange: "",
});

const categories = ref([
  { value: "electronics", label: "电子产品" },
  { value: "clothing", label: "服装" },
  { value: "books", label: "图书" },
  { value: "home", label: "家居" },
]);

const brands = ref([
  { value: "apple", label: "苹果" },
  { value: "samsung", label: "三星" },
  { value: "huawei", label: "华为" },
  { value: "xiaomi", label: "小米" },
]);

const priceRanges = ref([
  { value: "0-100", label: "0-100元" },
  { value: "100-500", label: "100-500元" },
  { value: "500-1000", label: "500-1000元" },
  { value: "1000+", label: "1000元以上" },
]);

// 事件日志
const eventLogs = ref([]);

// 计算属性
const filteredCities = computed(() => {
  if (!formData.value.country) return [];
  return allCities.value.filter((city) => city.country === formData.value.country);
});

// 监听国家变化，清空城市选择
watch(
  () => formData.value.country,
  () => {
    formData.value.city = "";
  },
);

// 远程搜索方法
const remoteMethod = (query) => {
  if (query !== "") {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      remoteOptions.value = allRemoteOptions.filter((item) => {
        return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
      });
    }, 200);
  } else {
    remoteOptions.value = [];
  }
};

// 筛选相关方法
const resetFilters = () => {
  filterData.value = {
    category: "",
    brand: "",
    priceRange: "",
  };
  addLog("筛选条件已重置");
};

const getCategoryLabel = (value) => {
  const category = categories.value.find((item) => item.value === value);
  return category ? category.label : value;
};

const getBrandLabel = (value) => {
  const brand = brands.value.find((item) => item.value === value);
  return brand ? brand.label : value;
};

const getPriceRangeLabel = (value) => {
  const range = priceRanges.value.find((item) => item.value === value);
  return range ? range.label : value;
};

// 事件处理方法
const handleChange = (value) => {
  addLog(`选择改变: ${JSON.stringify(value)}`);
};

const handleVisibleChange = (visible) => {
  addLog(`下拉框${visible ? "展开" : "收起"}`);
};

const handleRemoveTag = (value) => {
  addLog(`移除标签: ${value}`);
};

const handleClear = () => {
  addLog("清空选择");
};

const handleBlur = () => {
  addLog("失去焦点");
};

const handleFocus = () => {
  addLog("获得焦点");
};

const addLog = (message) => {
  const timestamp = new Date().toLocaleTimeString();
  eventLogs.value.unshift(`[${timestamp}] ${message}`);
  if (eventLogs.value.length > 10) {
    eventLogs.value.pop();
  }
};
</script>

<style scoped>
.select-demo {
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

.form-demo {
  max-width: 600px;
}

.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.form-item label {
  width: 100px;
  text-align: right;
  margin-right: 15px;
  font-size: 14px;
  color: #606266;
}

.form-item .vk-select {
  flex: 1;
}

.form-result {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.form-result h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #303133;
}

.form-result pre {
  margin: 0;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 12px;
  color: #525252;
  white-space: pre-wrap;
}

.filter-demo {
  max-width: 800px;
}

.filter-controls {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-controls .vk-select {
  min-width: 150px;
}

.filter-result h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #303133;
}

.filter-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
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
