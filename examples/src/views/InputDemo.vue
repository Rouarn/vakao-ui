<template>
  <div class="input-demo">
    <div class="demo-header">
      <h1>Input 输入框</h1>
      <p>基础的输入框组件，支持多种输入类型、验证状态和交互功能。</p>
    </div>

    <!-- 基础用法 -->
    <div class="demo-section">
      <h2>基础用法</h2>
      <p>基本的输入框用法。</p>
      <div class="demo-block">
        <VkSpace vertical>
          <VkInput v-model="basicValue" placeholder="请输入内容" />
          <div class="demo-value">输入值：{{ basicValue }}</div>
        </VkSpace>
      </div>
    </div>

    <!-- 禁用状态 -->
    <div class="demo-section">
      <h2>禁用状态</h2>
      <p>使用 <code>disabled</code> 属性禁用输入框。</p>
      <div class="demo-block">
        <VkSpace vertical>
          <VkInput v-model="disabledValue" placeholder="禁用状态" disabled />
          <VkInput v-model="disabledValue2" placeholder="有值的禁用状态" disabled />
        </VkSpace>
      </div>
    </div>

    <!-- 可清空 -->
    <div class="demo-section">
      <h2>可清空</h2>
      <p>使用 <code>clearable</code> 属性可以得到一个可清空的输入框。</p>
      <div class="demo-block">
        <VkSpace vertical>
          <VkInput v-model="clearableValue" placeholder="请输入内容" clearable />
          <div class="demo-value">输入值：{{ clearableValue }}</div>
        </VkSpace>
      </div>
    </div>

    <!-- 密码框 -->
    <div class="demo-section">
      <h2>密码框</h2>
      <p>使用 <code>show-password</code> 属性可以得到一个可切换显示隐藏的密码框。</p>
      <div class="demo-block">
        <VkSpace vertical>
          <VkInput v-model="passwordValue" type="password" placeholder="请输入密码" show-password />
          <div class="demo-value">密码值：{{ passwordValue }}</div>
        </VkSpace>
      </div>
    </div>

    <!-- 带图标的输入框 -->
    <div class="demo-section">
      <h2>带图标的输入框</h2>
      <p>使用 <code>prefix-icon</code> 和 <code>suffix-icon</code> 属性在输入框首部和尾部增加显示图标。</p>
      <div class="demo-block">
        <VkSpace vertical>
          <VkInput v-model="iconValue1" placeholder="请输入内容" prefix-icon="material-symbols:search" />
          <VkInput v-model="iconValue2" placeholder="请输入内容" suffix-icon="material-symbols:calendar-month" />
          <VkInput
            v-model="iconValue3"
            placeholder="请输入内容"
            prefix-icon="material-symbols:person"
            suffix-icon="material-symbols:settings"
          />
        </VkSpace>
      </div>
    </div>

    <!-- 不同尺寸 -->
    <div class="demo-section">
      <h2>不同尺寸</h2>
      <p>使用 <code>size</code> 属性改变输入框大小。</p>
      <div class="demo-block">
        <VkSpace vertical>
          <VkInput v-model="sizeValue" size="large" placeholder="大型输入框" />
          <VkInput v-model="sizeValue" placeholder="默认输入框" />
          <VkInput v-model="sizeValue" size="small" placeholder="小型输入框" />
          <VkInput v-model="sizeValue" size="tiny" placeholder="超小输入框" />
        </VkSpace>
      </div>
    </div>

    <!-- 复合型输入框 -->
    <div class="demo-section">
      <h2>复合型输入框</h2>
      <p>可以在输入框前置或后置一个元素，通常是标签或按钮。</p>
      <div class="demo-block">
        <VkSpace vertical>
          <VkInput v-model="compoundValue1" placeholder="请输入内容">
            <template #prepend>Http://</template>
          </VkInput>
          <VkInput v-model="compoundValue2" placeholder="请输入内容">
            <template #append>.com</template>
          </VkInput>
          <VkInput v-model="compoundValue3" placeholder="请输入内容">
            <template #prepend>Http://</template>
            <template #append>.com</template>
          </VkInput>
        </VkSpace>
      </div>
    </div>

    <!-- 文本域 -->
    <div class="demo-section">
      <h2>文本域</h2>
      <p>使用 <code>type="textarea"</code> 来创建文本域。</p>
      <div class="demo-block">
        <VkSpace vertical>
          <VkInput v-model="textareaValue1" type="textarea" placeholder="请输入内容" />
          <VkInput v-model="textareaValue2" type="textarea" placeholder="请输入内容" :rows="4" resize="none" />
          <div class="demo-value">文本域内容：{{ textareaValue1 }}</div>
        </VkSpace>
      </div>
    </div>

    <!-- 可自适应文本高度的文本域 -->
    <div class="demo-section">
      <h2>可自适应文本高度的文本域</h2>
      <p>使用 <code>autosize</code> 属性可以使文本域自适应内容高度。</p>
      <div class="demo-block">
        <VkInput v-model="autosizeValue1" type="textarea" placeholder="自适应高度" autosize />
        <VkInput v-model="autosizeValue2" type="textarea" placeholder="限制最小和最大行数" :autosize="{ minRows: 2, maxRows: 6 }" />
      </div>
    </div>

    <!-- 输入长度限制 -->
    <div class="demo-section">
      <h2>输入长度限制</h2>
      <p>使用 <code>maxlength</code> 和 <code>show-word-limit</code> 属性来限制输入长度并显示字数统计。</p>
      <div class="demo-block">
        <VkInput v-model="limitValue1" placeholder="请输入内容" :maxlength="20" show-word-limit />
        <VkInput v-model="limitValue2" type="textarea" placeholder="请输入内容" :maxlength="100" show-word-limit :rows="3" />
      </div>
    </div>

    <!-- 事件处理 -->
    <div class="demo-section">
      <h2>事件处理</h2>
      <p>输入框支持多种事件处理。</p>
      <div class="demo-block">
        <VkInput
          v-model="eventValue"
          placeholder="请输入内容"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          @input="handleInput"
          @clear="handleClear"
        />
        <div class="event-log">
          <h4>事件日志：</h4>
          <div class="log-content">
            <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
              {{ log }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 表单验证 -->
    <div class="demo-section">
      <h2>表单验证</h2>
      <p>结合表单验证使用的示例。</p>
      <div class="demo-block">
        <div class="form-item">
          <label>用户名：</label>
          <VkInput
            v-model="formData.username"
            placeholder="请输入用户名"
            :class="{ 'is-error': errors.username }"
            @blur="validateUsername"
          />
          <div v-if="errors.username" class="error-message">{{ errors.username }}</div>
        </div>

        <div class="form-item">
          <label>邮箱：</label>
          <VkInput v-model="formData.email" placeholder="请输入邮箱" :class="{ 'is-error': errors.email }" @blur="validateEmail" />
          <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
        </div>

        <div class="form-item">
          <label>密码：</label>
          <VkInput
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            show-password
            :class="{ 'is-error': errors.password }"
            @blur="validatePassword"
          />
          <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
        </div>

        <VkButton type="primary" @click="submitForm">提交表单</VkButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

// 基础值
const basicValue = ref("");
const disabledValue = ref("");
const disabledValue2 = ref("禁用状态的值");
const clearableValue = ref("可清空的内容");
const passwordValue = ref("");
const iconValue1 = ref("");
const iconValue2 = ref("");
const iconValue3 = ref("");
const sizeValue = ref("不同尺寸的输入框");
const compoundValue1 = ref("");
const compoundValue2 = ref("");
const compoundValue3 = ref("");
const textareaValue1 = ref("");
const textareaValue2 = ref("固定行数的文本域");
const autosizeValue1 = ref("");
const autosizeValue2 = ref("");
const limitValue1 = ref("");
const limitValue2 = ref("");
const eventValue = ref("");

// 事件日志
const eventLogs = ref<string[]>([]);

// 表单数据
const formData = reactive({
  username: "",
  email: "",
  password: "",
});

// 表单错误
const errors = reactive({
  username: "",
  email: "",
  password: "",
});

// 事件处理函数
const handleFocus = () => {
  addLog("输入框获得焦点");
};

const handleBlur = () => {
  addLog("输入框失去焦点");
};

const handleChange = (value: string) => {
  addLog(`输入框值改变: ${value}`);
};

const handleInput = (value: string) => {
  addLog(`输入事件: ${value}`);
};

const handleClear = () => {
  addLog("输入框被清空");
};

// 添加日志
const addLog = (message: string) => {
  const timestamp = new Date().toLocaleTimeString();
  eventLogs.value.unshift(`[${timestamp}] ${message}`);
  if (eventLogs.value.length > 8) {
    eventLogs.value.pop();
  }
};

// 表单验证
const validateUsername = () => {
  if (!formData.username) {
    errors.username = "用户名不能为空";
  } else if (formData.username.length < 3) {
    errors.username = "用户名至少3个字符";
  } else {
    errors.username = "";
  }
};

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email) {
    errors.email = "邮箱不能为空";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "请输入有效的邮箱地址";
  } else {
    errors.email = "";
  }
};

const validatePassword = () => {
  if (!formData.password) {
    errors.password = "密码不能为空";
  } else if (formData.password.length < 6) {
    errors.password = "密码至少6个字符";
  } else {
    errors.password = "";
  }
};

const submitForm = () => {
  validateUsername();
  validateEmail();
  validatePassword();

  if (!errors.username && !errors.email && !errors.password) {
    alert("表单验证通过！");
    addLog("表单提交成功");
  } else {
    addLog("表单验证失败");
  }
};
</script>

<style lang="scss" scoped>
.input-demo {
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

.demo-value {
  margin-top: 12px;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
}

.event-log {
  margin-top: 24px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.event-log h4 {
  margin: 0 0 12px 0;
  color: #2c3e50;
  font-size: 16px;
}

.log-content {
  max-height: 200px;
  overflow-y: auto;
}

.log-item {
  padding: 6px 0;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 13px;
  color: #495057;
  border-bottom: 1px solid #e9ecef;
}

.log-item:last-child {
  border-bottom: none;
}

.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #2c3e50;
}

.form-item .vk-input.is-error {
  border-color: #f56c6c;
}

.error-message {
  margin-top: 6px;
  font-size: 12px;
  color: #f56c6c;
}

@media (max-width: 768px) {
  .demo-block {
    padding: 16px;
  }

  .demo-header h1 {
    font-size: 28px;
  }

  .demo-section h2 {
    font-size: 20px;
  }
}
</style>
