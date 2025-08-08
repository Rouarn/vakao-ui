<template>
  <div class="checkbox-demo">
    <div class="demo-header">
      <h1>Checkbox 多选框</h1>
      <p>在一组备选项中进行多选。</p>
    </div>

    <!-- 基础用法 -->
    <div class="demo-section">
      <h2>基础用法</h2>
      <p>单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。</p>
      <div class="demo-block">
        <VkCheckbox v-model="checked1">备选项</VkCheckbox>
        <p class="result">当前状态：{{ checked1 ? "选中" : "未选中" }}</p>
      </div>
    </div>

    <!-- 禁用状态 -->
    <div class="demo-section">
      <h2>禁用状态</h2>
      <p>多选框不可用状态。</p>
      <div class="demo-block">
        <VkCheckbox v-model="checked2" disabled>备选项1</VkCheckbox>
        <VkCheckbox v-model="checked3" disabled>备选项2</VkCheckbox>
      </div>
    </div>

    <!-- 多选框组 -->
    <div class="demo-section">
      <h2>多选框组</h2>
      <p>适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。</p>
      <div class="demo-block">
        <VkCheckboxGroup v-model="checkList1">
          <VkSpace>
            <VkCheckbox label="复选框 A">复选框 A</VkCheckbox>
            <VkCheckbox label="复选框 B">复选框 B</VkCheckbox>
            <VkCheckbox label="复选框 C">复选框 C</VkCheckbox>
            <VkCheckbox label="禁用" disabled>禁用</VkCheckbox>
            <VkCheckbox label="选中且禁用" disabled>选中且禁用</VkCheckbox>
          </VkSpace>
        </VkCheckboxGroup>
        <p class="result">当前选中：{{ checkList1 }}</p>
      </div>
    </div>

    <!-- 不确定状态 -->
    <div class="demo-section">
      <h2>不确定状态</h2>
      <p>indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果。</p>
      <div class="demo-block">
        <VkSpace vertical>
          <VkCheckbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange"> 全选 </VkCheckbox>
          <VkCheckboxGroup v-model="checkedCities" @change="handleCheckedCitiesChange">
            <VkSpace>
              <VkCheckbox v-for="city in cities" :key="city" :label="city">
                {{ city }}
              </VkCheckbox>
            </VkSpace>
          </VkCheckboxGroup>
        </VkSpace>
        <p class="result">当前选中城市：{{ checkedCities }}</p>
      </div>
    </div>

    <!-- 可选项目数量的限制 -->
    <div class="demo-section">
      <h2>可选项目数量的限制</h2>
      <p>使用 min 和 max 属性能够限制可以被勾选的项目的数量。</p>
      <div class="demo-block">
        <VkCheckboxGroup v-model="checkedFruits" :min="1" :max="2">
          <VkSpace>
            <VkCheckbox v-for="fruit in fruits" :key="fruit" :label="fruit">
              {{ fruit }}
            </VkCheckbox>
          </VkSpace>
        </VkCheckboxGroup>
        <p class="result">当前选中水果：{{ checkedFruits }}（最少选1个，最多选2个）</p>
      </div>
    </div>

    <!-- 按钮样式 -->
    <div class="demo-section">
      <h2>按钮样式</h2>
      <p>按钮样式的多选组合。</p>
      <div class="demo-block">
        <VkCheckboxGroup v-model="checkedButtons1">
          <VkSpace>
            <VkCheckboxButton v-for="button in buttonOptions1" :key="button" :label="button">
              {{ button }}
            </VkCheckboxButton>
          </VkSpace>
        </VkCheckboxGroup>
        <p class="result">当前选中：{{ checkedButtons1 }}</p>
      </div>
    </div>

    <!-- 带有边框 -->
    <div class="demo-section">
      <h2>带有边框</h2>
      <p>设置 border 属性可以渲染为带有边框的多选框。</p>
      <div class="demo-block">
        <VkSpace>
          <VkCheckbox v-model="checked4" border>备选项1</VkCheckbox>
          <VkCheckbox v-model="checked5" border>备选项2</VkCheckbox>
          <VkCheckbox v-model="checked6" border disabled>备选项3（禁用）</VkCheckbox>
        </VkSpace>
      </div>
    </div>

    <!-- 不同尺寸 -->
    <div class="demo-section">
      <h2>不同尺寸</h2>
      <p>Checkbox 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。</p>
      <div class="demo-block">
        <VkSpace vertical size="large">
          <div>
            <h4>大尺寸</h4>
            <VkCheckboxGroup v-model="checkedSizes1" size="large">
              <VkSpace>
                <VkCheckboxButton label="选项1">选项1</VkCheckboxButton>
                <VkCheckboxButton label="选项2">选项2</VkCheckboxButton>
                <VkCheckboxButton label="选项3">选项3</VkCheckboxButton>
              </VkSpace>
            </VkCheckboxGroup>
          </div>
          <div>
            <h4>默认尺寸</h4>
            <VkCheckboxGroup v-model="checkedSizes2">
              <VkSpace>
                <VkCheckboxButton label="选项1">选项1</VkCheckboxButton>
                <VkCheckboxButton label="选项2">选项2</VkCheckboxButton>
                <VkCheckboxButton label="选项3">选项3</VkCheckboxButton>
              </VkSpace>
            </VkCheckboxGroup>
          </div>
          <div>
            <h4>小尺寸</h4>
            <VkCheckboxGroup v-model="checkedSizes3" size="small">
              <VkSpace>
                <VkCheckboxButton label="选项1">选项1</VkCheckboxButton>
                <VkCheckboxButton label="选项2">选项2</VkCheckboxButton>
                <VkCheckboxButton label="选项3">选项3</VkCheckboxButton>
              </VkSpace>
            </VkCheckboxGroup>
          </div>
          <div>
            <h4>迷你尺寸</h4>
            <VkCheckboxGroup v-model="checkedSizes4" size="mini">
              <VkSpace>
                <VkCheckboxButton label="选项1">选项1</VkCheckboxButton>
                <VkCheckboxButton label="选项2">选项2</VkCheckboxButton>
                <VkCheckboxButton label="选项3">选项3</VkCheckboxButton>
              </VkSpace>
            </VkCheckboxGroup>
          </div>
        </VkSpace>
      </div>
    </div>

    <!-- 实际应用场景 -->
    <div class="demo-section">
      <h2>实际应用场景</h2>
      <p>多选框在实际项目中的常见用法。</p>

      <!-- 权限设置 -->
      <div class="demo-block">
        <h3>权限设置</h3>
        <div class="permission-demo">
          <VkSpace vertical size="large">
            <div v-for="group in permissionGroups" :key="group.name">
              <VkSpace vertical>
                <h4>{{ group.name }}</h4>
                <VkCheckbox v-model="group.checkAll" :indeterminate="group.isIndeterminate" @change="handlePermissionAllChange(group)">
                  全选
                </VkCheckbox>
                <VkCheckboxGroup v-model="group.checkedPermissions" @change="handlePermissionChange(group)">
                  <VkSpace wrap>
                    <VkCheckbox v-for="permission in group.permissions" :key="permission.value" :label="permission.value" border>
                      {{ permission.label }}
                    </VkCheckbox>
                  </VkSpace>
                </VkCheckboxGroup>
              </VkSpace>
            </div>
          </VkSpace>
        </div>
      </div>

      <!-- 兴趣爱好选择 -->
      <div class="demo-block">
        <h3>兴趣爱好选择</h3>
        <div class="hobby-demo">
          <VkSpace vertical>
            <VkCheckboxGroup v-model="selectedHobbies" :max="5">
              <VkSpace vertical size="large">
                <div v-for="category in hobbyCategories" :key="category.name">
                  <VkSpace vertical>
                    <h4>{{ category.name }}</h4>
                    <VkSpace wrap>
                      <VkCheckbox v-for="hobby in category.hobbies" :key="hobby" :label="hobby" border>
                        {{ hobby }}
                      </VkCheckbox>
                    </VkSpace>
                  </VkSpace>
                </div>
              </VkSpace>
            </VkCheckboxGroup>
            <p class="result">已选择 {{ selectedHobbies.length }}/5 个兴趣爱好：{{ selectedHobbies.join(", ") }}</p>
          </VkSpace>
        </div>
      </div>

      <!-- 商品筛选 -->
      <div class="demo-block">
        <h3>商品筛选</h3>
        <div class="filter-demo">
          <VkSpace vertical size="large">
            <div>
              <VkSpace vertical>
                <h4>品牌</h4>
                <VkCheckboxGroup v-model="selectedBrands">
                  <VkSpace wrap>
                    <VkCheckboxButton v-for="brand in brands" :key="brand" :label="brand">
                      {{ brand }}
                    </VkCheckboxButton>
                  </VkSpace>
                </VkCheckboxGroup>
              </VkSpace>
            </div>

            <div>
              <VkSpace vertical>
                <h4>价格区间</h4>
                <VkCheckboxGroup v-model="selectedPriceRanges">
                  <VkSpace vertical>
                    <VkCheckbox v-for="range in priceRanges" :key="range" :label="range">
                      {{ range }}
                    </VkCheckbox>
                  </VkSpace>
                </VkCheckboxGroup>
              </VkSpace>
            </div>

            <div>
              <VkSpace vertical>
                <h4>其他筛选</h4>
                <VkCheckboxGroup v-model="selectedFilters">
                  <VkSpace>
                    <VkCheckbox label="free-shipping">包邮</VkCheckbox>
                    <VkCheckbox label="on-sale">促销</VkCheckbox>
                    <VkCheckbox label="new-arrival">新品</VkCheckbox>
                    <VkCheckbox label="high-rating">高评分</VkCheckbox>
                  </VkSpace>
                </VkCheckboxGroup>
              </VkSpace>
            </div>

            <div>
              <VkSpace vertical>
                <h4>筛选结果</h4>
                <VkSpace vertical size="small">
                  <p>品牌：{{ selectedBrands.join(", ") || "全部" }}</p>
                  <p>价格：{{ selectedPriceRanges.join(", ") || "全部" }}</p>
                  <p>其他：{{ selectedFilters.join(", ") || "无" }}</p>
                  <VkButton size="small" @click="clearFilters">清空筛选</VkButton>
                </VkSpace>
              </VkSpace>
            </div>
          </VkSpace>
        </div>
      </div>

      <!-- 表格行选择 -->
      <div class="demo-block">
        <h3>表格行选择</h3>
        <div class="table-demo">
          <table class="demo-table">
            <thead>
              <tr>
                <th>
                  <VkCheckbox v-model="tableCheckAll" :indeterminate="tableIsIndeterminate" @change="handleTableAllChange" />
                </th>
                <th>姓名</th>
                <th>职位</th>
                <th>部门</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in tableUsers" :key="user.id">
                <td>
                  <VkCheckbox v-model="selectedTableUsers" :label="user.id" @change="handleTableRowChange" />
                </td>
                <td>{{ user.name }}</td>
                <td>{{ user.position }}</td>
                <td>{{ user.department }}</td>
                <td>
                  <span :class="['status', user.status]">
                    {{ user.status === "active" ? "在职" : "离职" }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="result">已选择 {{ selectedTableUsers.length }} 个用户</p>
          <div class="table-actions">
            <VkButton :disabled="selectedTableUsers.length === 0" type="primary" size="small" @click="batchAction('activate')">
              批量激活
            </VkButton>
            <VkButton :disabled="selectedTableUsers.length === 0" type="warning" size="small" @click="batchAction('deactivate')">
              批量停用
            </VkButton>
            <VkButton :disabled="selectedTableUsers.length === 0" type="danger" size="small" @click="batchAction('delete')">
              批量删除
            </VkButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";

// 基础用法
const checked1 = ref(true);
const checked2 = ref(false);
const checked3 = ref(true);
const checked4 = ref(false);
const checked5 = ref(true);
const checked6 = ref(false);

// 多选框组
const checkList1 = ref(["复选框 A", "复选框 C"]);

// 不确定状态
const cities = ["上海", "北京", "广州", "深圳"];
const checkedCities = ref(["上海", "北京"]);
const checkAll = ref(false);
const isIndeterminate = computed(() => {
  const checkedCount = checkedCities.value.length;
  return checkedCount > 0 && checkedCount < cities.length;
});

const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? cities : [];
};

const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === cities.length;
};

// 数量限制
const fruits = ["苹果", "香蕉", "橙子", "葡萄", "草莓"];
const checkedFruits = ref(["苹果"]);

// 按钮样式
const buttonOptions1 = ["选项1", "选项2", "选项3"];
const checkedButtons1 = ref(["选项1"]);

// 不同尺寸
const checkedSizes1 = ref(["选项1"]);
const checkedSizes2 = ref(["选项2"]);
const checkedSizes3 = ref(["选项1"]);
const checkedSizes4 = ref(["选项3"]);

// 权限设置
const permissionGroups = reactive([
  {
    name: "用户管理",
    permissions: [
      { label: "查看用户", value: "user:view" },
      { label: "创建用户", value: "user:create" },
      { label: "编辑用户", value: "user:edit" },
      { label: "删除用户", value: "user:delete" },
    ],
    checkedPermissions: ["user:view"],
    checkAll: false,
    isIndeterminate: true,
  },
  {
    name: "角色管理",
    permissions: [
      { label: "查看角色", value: "role:view" },
      { label: "创建角色", value: "role:create" },
      { label: "编辑角色", value: "role:edit" },
      { label: "删除角色", value: "role:delete" },
    ],
    checkedPermissions: [],
    checkAll: false,
    isIndeterminate: false,
  },
]);

const handlePermissionAllChange = (group: any) => {
  group.checkedPermissions = group.checkAll ? group.permissions.map((p: any) => p.value) : [];
  group.isIndeterminate = false;
};

const handlePermissionChange = (group: any) => {
  const checkedCount = group.checkedPermissions.length;
  group.checkAll = checkedCount === group.permissions.length;
  group.isIndeterminate = checkedCount > 0 && checkedCount < group.permissions.length;
};

// 兴趣爱好
const hobbyCategories = [
  {
    name: "运动健身",
    hobbies: ["跑步", "游泳", "篮球", "足球", "瑜伽", "健身"],
  },
  {
    name: "文艺娱乐",
    hobbies: ["阅读", "电影", "音乐", "绘画", "摄影", "舞蹈"],
  },
  {
    name: "科技数码",
    hobbies: ["编程", "游戏", "数码产品", "人工智能", "区块链"],
  },
];
const selectedHobbies = ref(["跑步", "阅读", "编程"]);

// 商品筛选
const brands = ["Apple", "Samsung", "Huawei", "Xiaomi", "OPPO"];
const selectedBrands = ref(["Apple"]);

const priceRanges = ["0-500元", "500-1000元", "1000-2000元", "2000-5000元", "5000元以上"];
const selectedPriceRanges = ref([]);

const selectedFilters = ref(["free-shipping"]);

const clearFilters = () => {
  selectedBrands.value = [];
  selectedPriceRanges.value = [];
  selectedFilters.value = [];
};

// 表格行选择
const tableUsers = [
  { id: 1, name: "张三", position: "前端工程师", department: "技术部", status: "active" },
  { id: 2, name: "李四", position: "后端工程师", department: "技术部", status: "active" },
  { id: 3, name: "王五", position: "产品经理", department: "产品部", status: "inactive" },
  { id: 4, name: "赵六", position: "设计师", department: "设计部", status: "active" },
  { id: 5, name: "钱七", position: "测试工程师", department: "技术部", status: "active" },
];

const selectedTableUsers = ref([1, 3]);
const tableCheckAll = ref(false);
const tableIsIndeterminate = computed(() => {
  const checkedCount = selectedTableUsers.value.length;
  return checkedCount > 0 && checkedCount < tableUsers.length;
});

const handleTableAllChange = (val: boolean) => {
  selectedTableUsers.value = val ? tableUsers.map((user) => user.id) : [];
};

const handleTableRowChange = () => {
  const checkedCount = selectedTableUsers.value.length;
  tableCheckAll.value = checkedCount === tableUsers.length;
};

const batchAction = (action: string) => {
  const actionNames = {
    activate: "激活",
    deactivate: "停用",
    delete: "删除",
  };
  alert(`执行${actionNames[action as keyof typeof actionNames]}操作，影响 ${selectedTableUsers.value.length} 个用户`);
};
</script>

<style lang="scss" scoped>
.checkbox-demo {
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

/* 权限设置样式 */
.permission-demo {
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

/* 兴趣爱好样式 */
.hobby-demo {
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

/* 商品筛选样式 */
.filter-demo {
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

.filter-result {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 6px;
  margin-top: 20px;
}

.filter-result p {
  margin: 0 0 8px 0;
  font-size: 14px;
}

.filter-result p:last-of-type {
  margin-bottom: 16px;
}

/* 表格样式 */
.table-demo {
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

.demo-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
}

.demo-table th,
.demo-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ebeef5;
}

.demo-table th {
  background: #f5f7fa;
  font-weight: 600;
  color: #2c3e50;
}

.demo-table td {
  color: #606266;
}

.demo-table tr:hover {
  background: #f5f7fa;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status.active {
  background: #f0f9ff;
  color: #67c23a;
}

.status.inactive {
  background: #fef0f0;
  color: #f56c6c;
}

.table-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

@media (max-width: 768px) {
  .demo-block {
    padding: 16px;
  }

  .border-group {
    flex-direction: column;
    gap: 12px;
  }

  .permission-list {
    grid-template-columns: 1fr;
  }

  .hobby-list {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  }

  .table-actions {
    flex-direction: column;
  }

  .demo-table {
    font-size: 14px;
  }

  .demo-table th,
  .demo-table td {
    padding: 8px;
  }

  .demo-header h1 {
    font-size: 28px;
  }

  .demo-section h2 {
    font-size: 20px;
  }
}
</style>
