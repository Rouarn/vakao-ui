<template>
  <div class="radio-demo">
    <div class="demo-header">
      <h1>Radio 单选框</h1>
      <p>在一组备选项中进行单选。</p>
    </div>

    <!-- 基础用法 -->
    <div class="demo-section">
      <h2>基础用法</h2>
      <p>由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。</p>
      <div class="demo-block">
        <VkRadio v-model="radio1" value="1">备选项1</VkRadio>
        <VkRadio v-model="radio1" value="2">备选项2</VkRadio>
        <p class="result">当前选中：{{ radio1 }}</p>
      </div>
    </div>

    <!-- 禁用状态 -->
    <div class="demo-section">
      <h2>禁用状态</h2>
      <p>单选框不可用的状态。</p>
      <div class="demo-block">
        <VkRadio v-model="radio2" value="禁用" disabled>备选项1</VkRadio>
        <VkRadio v-model="radio2" value="选中且禁用" disabled>备选项2</VkRadio>
        <p class="result">当前选中：{{ radio2 }}</p>
      </div>
    </div>

    <!-- 单选框组 -->
    <div class="demo-section">
      <h2>单选框组</h2>
      <p>适用于在多个互斥的选项中选择的场景。</p>
      <div class="demo-block">
        <VkRadioGroup v-model="radio3">
          <VkRadio value="3">备选项1</VkRadio>
          <VkRadio value="6">备选项2</VkRadio>
          <VkRadio value="9">备选项3</VkRadio>
        </VkRadioGroup>
        <p class="result">当前选中：{{ radio3 }}</p>
      </div>
    </div>

    <!-- 按钮样式 -->
    <div class="demo-section">
      <h2>按钮样式</h2>
      <p>按钮样式的单选组合。</p>
      <div class="demo-block">
        <VkRadioGroup v-model="radio4">
          <VkRadio value="上海">上海</VkRadio>
          <VkRadio value="北京">北京</VkRadio>
          <VkRadio value="广州">广州</VkRadio>
          <VkRadio value="深圳">深圳</VkRadio>
        </VkRadioGroup>
        <p class="result">当前选中：{{ radio4 }}</p>
      </div>
    </div>

    <!-- 带有边框 -->
    <div class="demo-section">
      <h2>带有边框</h2>
      <p>设置 border 属性可以渲染为带有边框的单选框。</p>
      <div class="demo-block">
        <div class="border-group">
          <VkRadio v-model="radio5" value="1" border>备选项1</VkRadio>
          <VkRadio v-model="radio5" value="2" border>备选项2</VkRadio>
          <VkRadio v-model="radio5" value="3" border disabled>备选项3（禁用）</VkRadio>
        </div>
        <p class="result">当前选中：{{ radio5 }}</p>
      </div>
    </div>

    <!-- 不同尺寸 -->
    <div class="demo-section">
      <h2>不同尺寸</h2>
      <p>Radio 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。</p>
      <div class="demo-block">
        <div class="size-group">
          <h4>大尺寸</h4>
          <VkRadioGroup v-model="radio6" size="large">
            <VkRadio value="选项1">选项1</VkRadio>
            <VkRadio value="选项2">选项2</VkRadio>
            <VkRadio value="选项3">选项3</VkRadio>
          </VkRadioGroup>
        </div>
        <div class="size-group">
          <h4>默认尺寸</h4>
          <VkRadioGroup v-model="radio7">
            <VkRadio value="选项1">选项1</VkRadio>
            <VkRadio value="选项2">选项2</VkRadio>
            <VkRadio value="选项3">选项3</VkRadio>
          </VkRadioGroup>
        </div>
        <div class="size-group">
          <h4>小尺寸</h4>
          <VkRadioGroup v-model="radio8" size="small">
            <VkRadio value="选项1">选项1</VkRadio>
            <VkRadio value="选项2">选项2</VkRadio>
            <VkRadio value="选项3">选项3</VkRadio>
          </VkRadioGroup>
        </div>
        <div class="size-group">
          <h4>迷你尺寸</h4>
          <VkRadioGroup v-model="radio9" size="mini">
            <VkRadio value="选项1">选项1</VkRadio>
            <VkRadio value="选项2">选项2</VkRadio>
            <VkRadio value="选项3">选项3</VkRadio>
          </VkRadioGroup>
        </div>
      </div>
    </div>

    <!-- 实际应用场景 -->
    <div class="demo-section">
      <h2>实际应用场景</h2>
      <p>单选框在实际项目中的常见用法。</p>

      <!-- 性别选择 -->
      <div class="demo-block">
        <h3>性别选择</h3>
        <div class="gender-demo">
          <VkRadioGroup v-model="gender">
            <VkRadio value="male" border>
              <VkIcon icon="material-symbols:male" size="16" color="#409eff" />
              男
            </VkRadio>
            <VkRadio value="female" border>
              <VkIcon icon="material-symbols:female" size="16" color="#f56c6c" />
              女
            </VkRadio>
            <VkRadio value="other" border>
              <VkIcon icon="material-symbols:question-mark" size="16" color="#909399" />
              其他
            </VkRadio>
          </VkRadioGroup>
          <p class="result">选择的性别：{{ genderText }}</p>
        </div>
      </div>

      <!-- 支付方式选择 -->
      <div class="demo-block">
        <h3>支付方式选择</h3>
        <div class="payment-demo">
          <VkRadioGroup v-model="paymentMethod">
            <div v-for="method in paymentMethods" :key="method.value" class="payment-option">
              <VkRadio :value="method.value" border>
                <div class="payment-content">
                  <VkIcon :icon="'material-symbols:' + method.icon" size="24" :color="method.color" />
                  <div class="payment-info">
                    <div class="payment-name">{{ method.name }}</div>
                    <div class="payment-desc">{{ method.description }}</div>
                  </div>
                </div>
              </VkRadio>
            </div>
          </VkRadioGroup>
          <p class="result">选择的支付方式：{{ selectedPaymentMethod?.name }}</p>
        </div>
      </div>

      <!-- 配送方式选择 -->
      <div class="demo-block">
        <h3>配送方式选择</h3>
        <div class="delivery-demo">
          <VkRadioGroup v-model="deliveryMethod">
            <div v-for="method in deliveryMethods" :key="method.value" class="delivery-option">
              <VkRadio :value="method.value" border>
                <div class="delivery-content">
                  <div class="delivery-header">
                    <span class="delivery-name">{{ method.name }}</span>
                    <span class="delivery-price">{{ method.price }}</span>
                  </div>
                  <div class="delivery-desc">{{ method.description }}</div>
                  <div class="delivery-time">{{ method.time }}</div>
                </div>
              </VkRadio>
            </div>
          </VkRadioGroup>
          <p class="result">选择的配送方式：{{ selectedDeliveryMethod?.name }}</p>
        </div>
      </div>

      <!-- 主题选择 -->
      <div class="demo-block">
        <h3>主题选择</h3>
        <div class="theme-demo">
          <VkRadioGroup v-model="theme">
            <VkRadio v-for="themeOption in themes" :key="themeOption.value" :value="themeOption.value">
              <VkIcon :icon="'material-symbols:' + themeOption.icon" size="16" />
              {{ themeOption.name }}
            </VkRadio>
          </VkRadioGroup>
          <div class="theme-preview" :class="theme">
            <h4>主题预览</h4>
            <p>这是 {{ selectedTheme?.name }} 主题的预览效果</p>
            <VkButton type="primary">主要按钮</VkButton>
            <VkButton>次要按钮</VkButton>
          </div>
        </div>
      </div>

      <!-- 问卷调查 -->
      <div class="demo-block">
        <h3>问卷调查</h3>
        <div class="survey-demo">
          <div v-for="(question, index) in surveyQuestions" :key="index" class="survey-question">
            <h4>{{ index + 1 }}. {{ question.title }}</h4>
            <VkRadioGroup v-model="surveyAnswers[index]">
              <VkRadio v-for="option in question.options" :key="option.value" :value="option.value" border>
                {{ option.label }}
              </VkRadio>
            </VkRadioGroup>
          </div>
          <div class="survey-result">
            <h4>调查结果</h4>
            <div v-for="(answer, index) in surveyAnswers" :key="index" class="answer-item">
              <span class="question-num">问题{{ index + 1 }}：</span>
              <span class="answer-text">{{ getAnswerText(index, answer) }}</span>
            </div>
            <VkButton type="primary" :disabled="!isAllAnswered" style="margin-top: 16px" @click="submitSurvey"> 提交问卷 </VkButton>
          </div>
        </div>
      </div>

      <!-- 评分选择 -->
      <div class="demo-block">
        <h3>评分选择</h3>
        <div class="rating-demo">
          <div v-for="item in ratingItems" :key="item.key" class="rating-item">
            <h4>{{ item.title }}</h4>
            <VkRadioGroup v-model="ratings[item.key]">
              <VkRadio v-for="score in 5" :key="score" :value="score.toString()">
                <VkIcon icon="material-symbols:star" size="16" :color="score <= parseInt(ratings[item.key] || '0') ? '#e6a23c' : '#ddd'" />
                {{ score }}
              </VkRadio>
            </VkRadioGroup>
          </div>
          <div class="rating-summary">
            <h4>评分汇总</h4>
            <div class="rating-result">
              <div v-for="item in ratingItems" :key="item.key" class="rating-result-item">
                <span>{{ item.title }}：</span>
                <span class="rating-stars">
                  <VkIcon
                    v-for="star in 5"
                    :key="star"
                    icon="material-symbols:star"
                    size="14"
                    :color="star <= parseInt(ratings[item.key] || '0') ? '#e6a23c' : '#ddd'"
                  />
                </span>
                <span class="rating-score">{{ ratings[item.key] || "未评分" }}</span>
              </div>
              <div class="average-score">平均分：{{ averageScore }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- API 文档 -->
    <div class="demo-section">
      <h2>API 文档</h2>

      <div class="api-container">
        <h3>Radio 属性</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>参数</th>
              <th>说明</th>
              <th>类型</th>
              <th>可选值</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>v-model / modelValue</td>
              <td>绑定值</td>
              <td>string / number / boolean</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>label</td>
              <td>Radio 的值</td>
              <td>string / number / boolean</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>是否禁用</td>
              <td>boolean</td>
              <td>—</td>
              <td>false</td>
            </tr>
            <tr>
              <td>border</td>
              <td>是否显示边框</td>
              <td>boolean</td>
              <td>—</td>
              <td>false</td>
            </tr>
            <tr>
              <td>size</td>
              <td>Radio 的尺寸，仅在 border 为真时有效</td>
              <td>string</td>
              <td>large / default / small / mini</td>
              <td>default</td>
            </tr>
            <tr>
              <td>name</td>
              <td>原生 name 属性</td>
              <td>string</td>
              <td>—</td>
              <td>—</td>
            </tr>
          </tbody>
        </table>

        <h3>Radio 事件</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>事件名称</th>
              <th>说明</th>
              <th>回调参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>change</td>
              <td>绑定值变化时触发的事件</td>
              <td>选中的 Radio label 值</td>
            </tr>
          </tbody>
        </table>

        <h3>RadioGroup 属性</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>参数</th>
              <th>说明</th>
              <th>类型</th>
              <th>可选值</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>v-model / modelValue</td>
              <td>绑定值</td>
              <td>string / number / boolean</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>size</td>
              <td>单选框组尺寸</td>
              <td>string</td>
              <td>large / default / small / mini</td>
              <td>default</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>是否禁用</td>
              <td>boolean</td>
              <td>—</td>
              <td>false</td>
            </tr>
            <tr>
              <td>text-color</td>
              <td>按钮形式的 Radio 激活时的文本颜色</td>
              <td>string</td>
              <td>—</td>
              <td>#ffffff</td>
            </tr>
            <tr>
              <td>fill</td>
              <td>按钮形式的 Radio 激活时的填充色和边框色</td>
              <td>string</td>
              <td>—</td>
              <td>#409EFF</td>
            </tr>
          </tbody>
        </table>

        <h3>RadioGroup 事件</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>事件名称</th>
              <th>说明</th>
              <th>回调参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>change</td>
              <td>绑定值变化时触发的事件</td>
              <td>选中的 Radio label 值</td>
            </tr>
          </tbody>
        </table>

        <h3>RadioButton 属性</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>参数</th>
              <th>说明</th>
              <th>类型</th>
              <th>可选值</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>label</td>
              <td>Radio 的值</td>
              <td>string / number / boolean</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>是否禁用</td>
              <td>boolean</td>
              <td>—</td>
              <td>false</td>
            </tr>
            <tr>
              <td>name</td>
              <td>原生 name 属性</td>
              <td>string</td>
              <td>—</td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// 基础用法
const radio1 = ref("1");
const radio2 = ref("选中且禁用");
const radio3 = ref("3");
const radio4 = ref("上海");
const radio5 = ref("1");
const radio6 = ref("选项1");
const radio7 = ref("选项2");
const radio8 = ref("选项1");
const radio9 = ref("选项3");

// 性别选择
const gender = ref("male");
const genderText = computed(() => {
  const genderMap = {
    male: "男性",
    female: "女性",
    other: "其他",
  };
  return genderMap[gender.value as keyof typeof genderMap] || "未选择";
});

// 支付方式
const paymentMethods = [
  {
    value: "alipay",
    name: "支付宝",
    description: "使用支付宝余额或银行卡支付",
    icon: "alipay",
    color: "#1677ff",
  },
  {
    value: "wechat",
    name: "微信支付",
    description: "使用微信钱包支付",
    icon: "wechat",
    color: "#07c160",
  },
  {
    value: "bank",
    name: "银行卡",
    description: "使用储蓄卡或信用卡支付",
    icon: "bank-card",
    color: "#f56c6c",
  },
  {
    value: "balance",
    name: "余额支付",
    description: "使用账户余额支付",
    icon: "wallet",
    color: "#e6a23c",
  },
];
const paymentMethod = ref("alipay");
const selectedPaymentMethod = computed(() => paymentMethods.find((method) => method.value === paymentMethod.value));

// 配送方式
const deliveryMethods = [
  {
    value: "standard",
    name: "标准配送",
    price: "免费",
    description: "由第三方物流配送",
    time: "预计3-5个工作日送达",
  },
  {
    value: "express",
    name: "快速配送",
    price: "¥10",
    description: "优先处理，快速配送",
    time: "预计1-2个工作日送达",
  },
  {
    value: "same-day",
    name: "当日达",
    price: "¥25",
    description: "当日下单，当日送达",
    time: "今日18:00前送达",
  },
];
const deliveryMethod = ref("standard");
const selectedDeliveryMethod = computed(() => deliveryMethods.find((method) => method.value === deliveryMethod.value));

// 主题选择
const themes = [
  { value: "light", name: "浅色主题", icon: "sun" },
  { value: "dark", name: "深色主题", icon: "moon" },
  { value: "auto", name: "跟随系统", icon: "desktop" },
];
const theme = ref("light");
const selectedTheme = computed(() => themes.find((t) => t.value === theme.value));

// 问卷调查
const surveyQuestions = [
  {
    title: "您对我们的产品整体满意度如何？",
    options: [
      { value: "very-satisfied", label: "非常满意" },
      { value: "satisfied", label: "满意" },
      { value: "neutral", label: "一般" },
      { value: "dissatisfied", label: "不满意" },
      { value: "very-dissatisfied", label: "非常不满意" },
    ],
  },
  {
    title: "您会向朋友推荐我们的产品吗？",
    options: [
      { value: "definitely", label: "肯定会" },
      { value: "probably", label: "可能会" },
      { value: "maybe", label: "不确定" },
      { value: "probably-not", label: "可能不会" },
      { value: "definitely-not", label: "肯定不会" },
    ],
  },
  {
    title: "您认为我们最需要改进的方面是？",
    options: [
      { value: "quality", label: "产品质量" },
      { value: "price", label: "价格" },
      { value: "service", label: "客户服务" },
      { value: "delivery", label: "配送速度" },
      { value: "other", label: "其他" },
    ],
  },
];
const surveyAnswers = ref<string[]>([]);

const isAllAnswered = computed(() => {
  return surveyAnswers.value.length === surveyQuestions.length && surveyAnswers.value.every((answer) => answer);
});

const getAnswerText = (questionIndex: number, answerValue: string) => {
  if (!answerValue) return "未回答";
  const question = surveyQuestions[questionIndex];
  const option = question.options.find((opt) => opt.value === answerValue);
  return option?.label || "未知选项";
};

const submitSurvey = () => {
  alert("问卷提交成功！感谢您的参与。");
};

// 评分选择
const ratingItems = [
  { key: "quality", title: "产品质量" },
  { key: "service", title: "客户服务" },
  { key: "delivery", title: "配送体验" },
  { key: "value", title: "性价比" },
];
const ratings = ref<Record<string, string>>({
  quality: "4",
  service: "5",
  delivery: "3",
  value: "4",
});

const averageScore = computed(() => {
  const scores = Object.values(ratings.value)
    .filter((score) => score)
    .map(Number);
  if (scores.length === 0) return "0.0";
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  return average.toFixed(1);
});
</script>

<style scoped>
.radio-demo {
  max-width: 1000px;
}

.demo-header {
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ebeef5;
}

.demo-header h1 {
  font-size: 32px;
  color: #2c3e50;
  margin: 0 0 12px 0;
}

.demo-header p {
  font-size: 16px;
  color: #666;
  margin: 0;
  line-height: 1.6;
}

.demo-section {
  margin-bottom: 40px;
}

.demo-section h2 {
  font-size: 24px;
  color: #2c3e50;
  margin: 0 0 12px 0;
  font-weight: 600;
}

.demo-section h3 {
  font-size: 18px;
  color: #2c3e50;
  margin: 0 0 16px 0;
  font-weight: 600;
}

.demo-section h4 {
  font-size: 16px;
  color: #2c3e50;
  margin: 0 0 12px 0;
  font-weight: 600;
}

.demo-section p {
  color: #666;
  margin: 0 0 20px 0;
  line-height: 1.6;
}

.demo-section code {
  background: #f1f2f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 14px;
  color: #e74c3c;
}

.demo-block {
  padding: 24px;
  background: #fafbfc;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  margin-bottom: 16px;
}

.result {
  margin-top: 16px;
  padding: 12px;
  background: #f0f2f5;
  border-radius: 4px;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 14px;
  color: #2c3e50;
}

.border-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.size-group {
  margin-bottom: 20px;
}

.size-group:last-child {
  margin-bottom: 0;
}

/* 性别选择样式 */
.gender-demo {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

/* 支付方式样式 */
.payment-demo {
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

.payment-option {
  margin-bottom: 12px;
}

.payment-option:last-child {
  margin-bottom: 0;
}

.payment-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 0;
}

.payment-info {
  flex: 1;
}

.payment-name {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
}

.payment-desc {
  font-size: 14px;
  color: #666;
}

/* 配送方式样式 */
.delivery-demo {
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

.delivery-option {
  margin-bottom: 12px;
}

.delivery-option:last-child {
  margin-bottom: 0;
}

.delivery-content {
  padding: 4px 0;
}

.delivery-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.delivery-name {
  font-weight: 600;
  color: #2c3e50;
}

.delivery-price {
  font-weight: 600;
  color: #e6a23c;
}

.delivery-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 2px;
}

.delivery-time {
  font-size: 12px;
  color: #909399;
}

/* 主题选择样式 */
.theme-demo {
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

.theme-preview {
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  transition: all 0.3s ease;
}

.theme-preview.light {
  background: #ffffff;
  color: #2c3e50;
}

.theme-preview.dark {
  background: #2c3e50;
  color: #ffffff;
}

.theme-preview.auto {
  background: linear-gradient(45deg, #ffffff 50%, #2c3e50 50%);
  color: #2c3e50;
}

.theme-preview h4 {
  margin: 0 0 12px 0;
}

.theme-preview p {
  margin: 0 0 16px 0;
}

/* 问卷调查样式 */
.survey-demo {
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

.survey-question {
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f2f5;
}

.survey-question:last-child {
  border-bottom: none;
  margin-bottom: 20px;
}

.survey-result {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.answer-item {
  margin-bottom: 8px;
  font-size: 14px;
}

.question-num {
  font-weight: 600;
  color: #2c3e50;
}

.answer-text {
  color: #666;
}

/* 评分选择样式 */
.rating-demo {
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

.rating-item {
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f2f5;
}

.rating-item:last-child {
  border-bottom: none;
  margin-bottom: 20px;
}

.rating-summary {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.rating-result-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
}

.rating-stars {
  display: flex;
  gap: 2px;
}

.rating-score {
  font-weight: 600;
  color: #2c3e50;
}

.average-score {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e4e7ed;
  font-weight: 600;
  color: #2c3e50;
}

/* API 文档样式 */
.api-container {
  margin-top: 20px;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
  font-size: 14px;
}

.api-table th,
.api-table td {
  text-align: left;
  padding: 12px 16px;
  border-bottom: 1px solid #ebeef5;
}

.api-table th {
  font-weight: 600;
  background-color: #f8f9fa;
  color: #2c3e50;
}

.api-table tr:hover td {
  background-color: #f5f7fa;
}

@media (max-width: 768px) {
  .demo-block {
    padding: 16px;
  }

  .border-group {
    flex-direction: column;
    gap: 12px;
  }

  .payment-content {
    gap: 8px;
  }

  .delivery-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .rating-result-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .demo-header h1 {
    font-size: 28px;
  }

  .demo-section h2 {
    font-size: 20px;
  }

  .api-table {
    font-size: 12px;
  }

  .api-table th,
  .api-table td {
    padding: 8px 10px;
  }
}
</style>
