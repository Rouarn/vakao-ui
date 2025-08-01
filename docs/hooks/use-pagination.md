# usePagination

一个分页状态管理 Hook，提供完整的分页功能，包括页码跳转、每页大小调整、分页信息计算等。支持响应式数据源和丰富的回调机制。

## 基础用法

<Demo>
    <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
      <h3 style="margin-top: 0;">📄 基础分页功能</h3>
      <!-- 基础分页 -->
      <div style="margin-bottom: 24px;">
        <h4 style="margin: 0 0 12px 0; font-size: 14px;">基础分页</h4>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
          <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
            <button 
              @click="basicActions.first()" 
              :disabled="!basicPagination.hasPrev"
              style="padding: 6px 12px; border: 1px solid #d9d9d9; border-radius: 4px; background: white; cursor: pointer;"
              :style="{ opacity: basicPagination.hasPrev ? 1 : 0.5, cursor: basicPagination.hasPrev ? 'pointer' : 'not-allowed' }"
            >
              首页
            </button>
            <button 
              @click="basicActions.prev()" 
              :disabled="!basicPagination.hasPrev"
              style="padding: 6px 12px; border: 1px solid #d9d9d9; border-radius: 4px; background: white; cursor: pointer;"
              :style="{ opacity: basicPagination.hasPrev ? 1 : 0.5, cursor: basicPagination.hasPrev ? 'pointer' : 'not-allowed' }"
            >
              上一页
            </button>
            <span style="padding: 6px 12px; background: #1890ff; color: white; border-radius: 4px; font-weight: bold;">
              {{ basicPagination.current }} / {{ basicPagination.totalPages }}
            </span>
            <button 
              @click="basicActions.next()" 
              :disabled="!basicPagination.hasNext"
              style="padding: 6px 12px; border: 1px solid #d9d9d9; border-radius: 4px; background: white; cursor: pointer;"
              :style="{ opacity: basicPagination.hasNext ? 1 : 0.5, cursor: basicPagination.hasNext ? 'pointer' : 'not-allowed' }"
            >
              下一页
            </button>
            <button 
              @click="basicActions.last()" 
              :disabled="!basicPagination.hasNext"
              style="padding: 6px 12px; border: 1px solid #d9d9d9; border-radius: 4px; background: white; cursor: pointer;"
              :style="{ opacity: basicPagination.hasNext ? 1 : 0.5, cursor: basicPagination.hasNext ? 'pointer' : 'not-allowed' }"
            >
              末页
            </button>
          </div>
          <div style="display: flex; gap: 12px; align-items: center;">
            <span style="font-size: 12px; color: #666;">跳转到:</span>
            <input 
              v-model.number="jumpPage" 
              @keyup.enter="basicActions.goToPage(jumpPage)"
              type="number" 
              :min="1" 
              :max="basicPagination.totalPages"
              style="width: 60px; padding: 4px 8px; border: 1px solid #d9d9d9; border-radius: 4px;"
            >
            <button 
              @click="basicActions.goToPage(jumpPage)"
              style="padding: 4px 8px; border: 1px solid #1890ff; border-radius: 4px; background: #1890ff; color: white; cursor: pointer; font-size: 12px;"
            >
              跳转
            </button>
          </div>
        </div>
        <div style="padding: 12px; background: #f0f0f0; border-radius: 4px; font-family: monospace; font-size: 12px;">
          <div>当前页: {{ basicPagination.current }}</div>
          <div>每页大小: {{ basicPagination.pageSize }}</div>
          <div>总数据量: {{ basicPagination.total }}</div>
          <div>总页数: {{ basicPagination.totalPages }}</div>
          <div>数据范围: {{ basicPagination.startIndex + 1 }} - {{ basicPagination.endIndex + 1 }}</div>
        </div>
      </div>
      <!-- 每页大小调整 -->
      <div style="margin-bottom: 24px;">
        <h4 style="margin: 0 0 12px 0; font-size: 14px;">每页大小调整</h4>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
          <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 12px; color: #666;">每页显示:</span>
            <select 
              :value="sizePagination.pageSize" 
              @change="sizeActions.setPageSize(Number($event.target.value))"
              style="padding: 4px 8px; border: 1px solid #d9d9d9; border-radius: 4px;"
            >
              <option value="5">5 条/页</option>
              <option value="10">10 条/页</option>
              <option value="20">20 条/页</option>
              <option value="50">50 条/页</option>
            </select>
            <span style="font-size: 12px; color: #666;">总共 {{ sizePagination.total }} 条数据</span>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <button 
              @click="sizeActions.prev()" 
              :disabled="!sizePagination.hasPrev"
              style="padding: 4px 8px; border: 1px solid #d9d9d9; border-radius: 4px; background: white; cursor: pointer; font-size: 12px;"
              :style="{ opacity: sizePagination.hasPrev ? 1 : 0.5, cursor: sizePagination.hasPrev ? 'pointer' : 'not-allowed' }"
            >
              ‹
            </button>
            <template v-for="page in getPageNumbers(sizePagination)" :key="page">
              <button 
                v-if="page !== '...'"
                @click="sizeActions.goToPage(page)"
                :class="{ active: page === sizePagination.current }"
                style="padding: 4px 8px; border: 1px solid #d9d9d9; border-radius: 4px; background: white; cursor: pointer; font-size: 12px; min-width: 32px;"
                :style="{ 
                  background: page === sizePagination.current ? '#1890ff' : 'white',
                  color: page === sizePagination.current ? 'white' : '#333',
                  borderColor: page === sizePagination.current ? '#1890ff' : '#d9d9d9'
                }"
              >
                {{ page }}
              </button>
              <span v-else style="padding: 4px 8px; color: #999; font-size: 12px;">...</span>
            </template>
            <button 
              @click="sizeActions.next()" 
              :disabled="!sizePagination.hasNext"
              style="padding: 4px 8px; border: 1px solid #d9d9d9; border-radius: 4px; background: white; cursor: pointer; font-size: 12px;"
              :style="{ opacity: sizePagination.hasNext ? 1 : 0.5, cursor: sizePagination.hasNext ? 'pointer' : 'not-allowed' }"
            >
              ›
            </button>
          </div>
        </div>
        <div style="padding: 12px; background: #f0f0f0; border-radius: 4px; font-family: monospace; font-size: 12px;">
          <div>当前显示: 第 {{ sizePagination.startIndex + 1 }} - {{ Math.min(sizePagination.endIndex + 1, sizePagination.total) }} 条，共 {{ sizePagination.total }} 条</div>
        </div>
      </div>
      <!-- 数据表格示例 -->
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px;">数据表格示例</h4>
        <div style="border: 1px solid #e8e8e8; border-radius: 6px; overflow: hidden;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead style="background: #fafafa;">
              <tr>
                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e8e8e8; font-size: 12px; font-weight: bold;">ID</th>
                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e8e8e8; font-size: 12px; font-weight: bold;">姓名</th>
                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e8e8e8; font-size: 12px; font-weight: bold;">邮箱</th>
                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e8e8e8; font-size: 12px; font-weight: bold;">状态</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in currentPageData" :key="item.id" style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px; font-size: 12px;">{{ item.id }}</td>
                <td style="padding: 12px; font-size: 12px;">{{ item.name }}</td>
                <td style="padding: 12px; font-size: 12px; color: #666;">{{ item.email }}</td>
                <td style="padding: 12px; font-size: 12px;">
                  <span 
                    style="padding: 2px 8px; border-radius: 12px; font-size: 11px;"
                    :style="{
                      background: item.status === 'active' ? '#f6ffed' : '#fff2e8',
                      color: item.status === 'active' ? '#52c41a' : '#fa8c16',
                      border: `1px solid ${item.status === 'active' ? '#b7eb8f' : '#ffd591'}`
                    }"
                  >
                    {{ item.status === 'active' ? '活跃' : '待激活' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div style="padding: 12px; background: #fafafa; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-size: 12px; color: #666;">
              显示第 {{ tablePagination.startIndex + 1 }} - {{ Math.min(tablePagination.endIndex + 1, tablePagination.total) }} 条，共 {{ tablePagination.total }} 条
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
              <select 
                :value="tablePagination.pageSize" 
                @change="tableActions.setPageSize(Number($event.target.value))"
                style="padding: 4px 8px; border: 1px solid #d9d9d9; border-radius: 4px; font-size: 12px;"
              >
                <option value="3">3 条/页</option>
                <option value="5">5 条/页</option>
                <option value="10">10 条/页</option>
              </select>
              <button 
                @click="tableActions.prev()" 
                :disabled="!tablePagination.hasPrev"
                style="padding: 4px 8px; border: 1px solid #d9d9d9; border-radius: 4px; background: white; cursor: pointer; font-size: 12px;"
                :style="{ opacity: tablePagination.hasPrev ? 1 : 0.5, cursor: tablePagination.hasPrev ? 'pointer' : 'not-allowed' }"
              >
                上一页
              </button>
              <span style="padding: 4px 8px; font-size: 12px; color: #666;">
                {{ tablePagination.current }} / {{ tablePagination.totalPages }}
              </span>
              <button 
                @click="tableActions.next()" 
                :disabled="!tablePagination.hasNext"
                style="padding: 4px 8px; border: 1px solid #d9d9d9; border-radius: 4px; background: white; cursor: pointer; font-size: 12px;"
                :style="{ opacity: tablePagination.hasNext ? 1 : 0.5, cursor: tablePagination.hasNext ? 'pointer' : 'not-allowed' }"
              >
                下一页
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  <template #code>

```vue
<template>
  <div>
    <h3>📄 基础分页功能</h3>
    <!-- 基础分页 -->
    <div>
      <h4>基础分页</h4>
      <div class="pagination-controls">
        <div class="pagination-buttons">
          <button @click="basicActions.first()" :disabled="!basicPagination.hasPrev" class="btn">首页</button>
          <button @click="basicActions.prev()" :disabled="!basicPagination.hasPrev" class="btn">上一页</button>
          <span class="current-page"> {{ basicPagination.current }} / {{ basicPagination.totalPages }} </span>
          <button @click="basicActions.next()" :disabled="!basicPagination.hasNext" class="btn">下一页</button>
          <button @click="basicActions.last()" :disabled="!basicPagination.hasNext" class="btn">末页</button>
        </div>
        <div class="jump-controls">
          <span>跳转到:</span>
          <input
            v-model.number="jumpPage"
            @keyup.enter="basicActions.goToPage(jumpPage)"
            type="number"
            :min="1"
            :max="basicPagination.totalPages"
            class="jump-input"
          />
          <button @click="basicActions.goToPage(jumpPage)" class="btn btn-primary">跳转</button>
        </div>
      </div>
      <div class="pagination-info">
        <div>当前页: {{ basicPagination.current }}</div>
        <div>每页大小: {{ basicPagination.pageSize }}</div>
        <div>总数据量: {{ basicPagination.total }}</div>
        <div>总页数: {{ basicPagination.totalPages }}</div>
        <div>
          数据范围: {{ basicPagination.startIndex + 1 }} -
          {{ basicPagination.endIndex + 1 }}
        </div>
      </div>
    </div>

    <!-- 每页大小调整 -->
    <div>
      <h4>每页大小调整</h4>
      <div class="size-controls">
        <div class="size-selector">
          <span>每页显示:</span>
          <select :value="sizePagination.pageSize" @change="sizeActions.setPageSize(Number($event.target.value))" class="size-select">
            <option value="5">5 条/页</option>
            <option value="10">10 条/页</option>
            <option value="20">20 条/页</option>
            <option value="50">50 条/页</option>
          </select>
          <span>总共 {{ sizePagination.total }} 条数据</span>
        </div>
        <div class="page-navigation">
          <button @click="sizeActions.prev()" :disabled="!sizePagination.hasPrev" class="btn btn-sm">‹</button>
          <template v-for="page in getPageNumbers(sizePagination)" :key="page">
            <button
              v-if="page !== '...'"
              @click="sizeActions.goToPage(page)"
              :class="{ active: page === sizePagination.current }"
              class="btn btn-sm page-btn"
            >
              {{ page }}
            </button>
            <span v-else class="ellipsis">...</span>
          </template>
          <button @click="sizeActions.next()" :disabled="!sizePagination.hasNext" class="btn btn-sm">›</button>
        </div>
      </div>
      <div class="pagination-info">
        <div>
          当前显示: 第 {{ sizePagination.startIndex + 1 }} -
          {{ Math.min(sizePagination.endIndex + 1, sizePagination.total) }}
          条，共 {{ sizePagination.total }} 条
        </div>
      </div>
    </div>

    <!-- 数据表格示例 -->
    <div>
      <h4>数据表格示例</h4>
      <div class="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>姓名</th>
              <th>邮箱</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in currentPageData" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>
                <span class="status-badge" :class="item.status">
                  {{ item.status === "active" ? "活跃" : "待激活" }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="table-footer">
          <div class="table-info">
            显示第 {{ tablePagination.startIndex + 1 }} -
            {{ Math.min(tablePagination.endIndex + 1, tablePagination.total) }}
            条，共 {{ tablePagination.total }} 条
          </div>
          <div class="table-controls">
            <select :value="tablePagination.pageSize" @change="tableActions.setPageSize(Number($event.target.value))" class="size-select">
              <option value="3">3 条/页</option>
              <option value="5">5 条/页</option>
              <option value="10">10 条/页</option>
            </select>
            <button @click="tableActions.prev()" :disabled="!tablePagination.hasPrev" class="btn btn-sm">上一页</button>
            <span class="page-info"> {{ tablePagination.current }} / {{ tablePagination.totalPages }} </span>
            <button @click="tableActions.next()" :disabled="!tablePagination.hasNext" class="btn btn-sm">下一页</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { usePagination } from "@vakao-ui/hooks";

// 基础用法
const jumpPage = ref(1);
const [basicPagination, basicActions] = usePagination({
  initialPage: 1,
  initialPageSize: 10,
  total: 95,
});

const [sizePagination, sizeActions] = usePagination({
  initialPage: 1,
  initialPageSize: 10,
  total: 127,
});

// 生成页码数组
const getPageNumbers = (pagination) => {
  const { current, totalPages } = pagination;
  const pages = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    } else if (current >= totalPages - 3) {
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    }
  }

  return pages;
};

// 表格数据
const tableData = ref([
  { id: 1, name: "张三", email: "zhangsan@example.com", status: "active" },
  { id: 2, name: "李四", email: "lisi@example.com", status: "inactive" },
  { id: 3, name: "王五", email: "wangwu@example.com", status: "active" },
  { id: 4, name: "赵六", email: "zhaoliu@example.com", status: "active" },
  { id: 5, name: "钱七", email: "qianqi@example.com", status: "inactive" },
  { id: 6, name: "孙八", email: "sunba@example.com", status: "active" },
  { id: 7, name: "周九", email: "zhoujiu@example.com", status: "inactive" },
  { id: 8, name: "吴十", email: "wushi@example.com", status: "active" },
  { id: 9, name: "郑十一", email: "zhengshiyi@example.com", status: "active" },
  {
    id: 10,
    name: "王十二",
    email: "wangshier@example.com",
    status: "inactive",
  },
  { id: 11, name: "李十三", email: "lishisan@example.com", status: "active" },
  { id: 12, name: "张十四", email: "zhangshisi@example.com", status: "active" },
]);

const [tablePagination, tableActions] = usePagination({
  initialPageSize: 5,
  total: computed(() => tableData.value.length),
});

const currentPageData = computed(() => {
  const { startIndex, endIndex } = tablePagination.value;
  return tableData.value.slice(startIndex, Math.min(endIndex + 1, tableData.value.length));
});
</script>

<style scoped>
.pagination-controls {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 12px;
}

.pagination-buttons {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.jump-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.btn {
  padding: 6px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  border-color: #1890ff;
  background: #1890ff;
  color: white;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
}

.current-page {
  padding: 6px 12px;
  background: #1890ff;
  color: white;
  border-radius: 4px;
  font-weight: bold;
}

.jump-input {
  width: 60px;
  padding: 4px 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.pagination-info {
  padding: 12px;
  background: #f0f0f0;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
}

.size-controls {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 12px;
}

.size-selector {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.size-select {
  padding: 4px 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.page-navigation {
  display: flex;
  gap: 8px;
  align-items: center;
}

.page-btn.active {
  background: #1890ff;
  color: white;
  border-color: #1890ff;
}

.ellipsis {
  padding: 4px 8px;
  color: #999;
  font-size: 12px;
}

.data-table {
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  overflow: hidden;
}

.data-table table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e8e8e8;
  background: #fafafa;
  font-size: 12px;
  font-weight: bold;
}

.data-table td {
  padding: 12px;
  font-size: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.status-badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
}

.status-badge.active {
  background: #f6ffed;
  color: #52c41a;
  border: 1px solid #b7eb8f;
}

.status-badge.inactive {
  background: #fff2e8;
  color: #fa8c16;
  border: 1px solid #ffd591;
}

.table-footer {
  padding: 12px;
  background: #fafafa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-info {
  font-size: 12px;
  color: #666;
}

.table-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

.page-info {
  padding: 4px 8px;
  font-size: 12px;
  color: #666;
}
</style>
```

  </template>
</Demo>

## 高级用法

<Demo>
    <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
      <h3 style="margin-top: 0;">🚀 高级分页功能</h3>
      <!-- 响应式数据源 -->
      <div style="margin-bottom: 24px;">
        <h4 style="margin: 0 0 12px 0; font-size: 14px;">响应式数据源</h4>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
          <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 12px; color: #666;">模拟数据量:</span>
            <button 
              @click="setReactiveTotal(50)"
              style="padding: 4px 8px; border: 1px solid #1890ff; border-radius: 4px; background: white; color: #1890ff; cursor: pointer; font-size: 12px;"
            >
              50 条
            </button>
            <button 
              @click="setReactiveTotal(100)"
              style="padding: 4px 8px; border: 1px solid #1890ff; border-radius: 4px; background: white; color: #1890ff; cursor: pointer; font-size: 12px;"
            >
              100 条
            </button>
            <button 
              @click="setReactiveTotal(200)"
              style="padding: 4px 8px; border: 1px solid #1890ff; border-radius: 4px; background: white; color: #1890ff; cursor: pointer; font-size: 12px;"
            >
              200 条
            </button>
            <button 
              @click="setReactiveTotal(500)"
              style="padding: 4px 8px; border: 1px solid #1890ff; border-radius: 4px; background: white; color: #1890ff; cursor: pointer; font-size: 12px;"
            >
              500 条
            </button>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <span style="padding: 4px 8px; background: #1890ff; color: white; border-radius: 4px; font-size: 12px; font-weight: bold;">
              {{ reactivePagination.current }} / {{ reactivePagination.totalPages }}
            </span>
            <button 
              @click="reactiveActions.prev()" 
              :disabled="!reactivePagination.hasPrev"
              style="padding: 4px 8px; border: 1px solid #d9d9d9; border-radius: 4px; background: white; cursor: pointer; font-size: 12px;"
              :style="{ opacity: reactivePagination.hasPrev ? 1 : 0.5, cursor: reactivePagination.hasPrev ? 'pointer' : 'not-allowed' }"
            >
              ‹
            </button>
            <button 
              @click="reactiveActions.next()" 
              :disabled="!reactivePagination.hasNext"
              style="padding: 4px 8px; border: 1px solid #d9d9d9; border-radius: 4px; background: white; cursor: pointer; font-size: 12px;"
              :style="{ opacity: reactivePagination.hasNext ? 1 : 0.5, cursor: reactivePagination.hasNext ? 'pointer' : 'not-allowed' }"
            >
              ›
            </button>
          </div>
        </div>
        <div style="padding: 12px; background: #f0f0f0; border-radius: 4px; font-family: monospace; font-size: 12px;">
          <div>响应式总数: {{ reactiveTotal }} 条</div>
          <div>当前页码: {{ reactivePagination.current }}</div>
          <div>总页数: {{ reactivePagination.totalPages }}</div>
        </div>
      </div>
      <!-- 带回调的分页 -->
      <div style="margin-bottom: 24px;">
        <h4 style="margin: 0 0 12px 0; font-size: 14px;">带回调的分页</h4>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 12px;">
            <button
              @click="callbackActions.prev()"
              :disabled="!callbackPagination.hasPrev"
              style="padding: 6px 12px; border: 1px solid #d9d9d9; border-radius: 4px; background: white; cursor: pointer; font-size: 12px;"
              :style="{ opacity: callbackPagination.hasPrev ? 1 : 0.5, cursor: callbackPagination.hasPrev ? 'pointer' : 'not-allowed' }"
            >
              上一页
            </button>
            <span style="padding: 6px 12px; background: #52c41a; color: white; border-radius: 4px; font-size: 12px; font-weight: bold;">
              {{ callbackPagination.current }} / {{ callbackPagination.totalPages }}
            </span>
            <button
              @click="callbackActions.next()"
              :disabled="!callbackPagination.hasNext"
              style="padding: 6px 12px; border: 1px solid #d9d9d9; border-radius: 4px; background: white; cursor: pointer; font-size: 12px;"
              :style="{ opacity: callbackPagination.hasNext ? 1 : 0.5, cursor: callbackPagination.hasNext ? 'pointer' : 'not-allowed' }"
            >
              下一页
            </button>
            <select
              :value="callbackPagination.pageSize"
              @change="callbackActions.setPageSize(Number($event.target.value))"
              style="padding: 4px 8px; border: 1px solid #d9d9d9; border-radius: 4px; font-size: 12px;"
            >
              <option value="5">5 条/页</option>
              <option value="10">10 条/页</option>
              <option value="15">15 条/页</option>
            </select>
            <button
              @click="callbackActions.reset()"
              style="padding: 4px 8px; border: 1px solid #ff4d4f; border-radius: 4px; background: white; color: #ff4d4f; cursor: pointer; font-size: 12px;"
            >
              重置
            </button>
          </div>
        </div>
        <div style="padding: 12px; background: #f0f0f0; border-radius: 4px; font-family: monospace; font-size: 12px;">
          <div>回调日志:</div>
          <div style="max-height: 100px; overflow-y: auto; margin-top: 8px; padding: 8px; background: white; border-radius: 4px; border: 1px solid #e8e8e8;">
            <div v-for="(log, index) in callbackLogs" :key="index" style="font-size: 11px; color: #666; margin-bottom: 2px;">
              {{ log }}
            </div>
          </div>
        </div>
      </div>
      <!-- 无限滚动模拟 -->
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px;">无限滚动模拟</h4>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
          <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 12px; color: #666;">已加载:</span>
            <span style="padding: 4px 8px; background: #722ed1; color: white; border-radius: 4px; font-size: 12px; font-weight: bold;">
              {{ infinitePagination.current }} 页 / {{ infinitePagination.pageSize * infinitePagination.current }} 条
            </span>
            <button
              @click="loadMore"
              :disabled="!infinitePagination.hasNext || isLoading"
              style="padding: 4px 8px; border: 1px solid #722ed1; border-radius: 4px; background: white; color: #722ed1; cursor: pointer; font-size: 12px;"
              :style="{ opacity: infinitePagination.hasNext && !isLoading ? 1 : 0.5, cursor: infinitePagination.hasNext && !isLoading ? 'pointer' : 'not-allowed' }"
            >
              {{ isLoading ? '加载中...' : infinitePagination.hasNext ? '加载更多' : '已全部加载' }}
            </button>
            <button
              @click="resetInfinite"
              style="padding: 4px 8px; border: 1px solid #ff4d4f; border-radius: 4px; background: white; color: #ff4d4f; cursor: pointer; font-size: 12px;"
            >
              重置
            </button>
          </div>
          <div style="height: 120px; overflow-y: auto; border: 1px solid #e8e8e8; border-radius: 4px; background: white;">
            <div v-for="item in loadedItems" :key="item" style="padding: 8px 12px; border-bottom: 1px solid #f0f0f0; font-size: 12px;">
              📄 数据项 #{{ item }}
            </div>
          </div>
        </div>
        <div style="padding: 12px; background: #f0f0f0; border-radius: 4px; font-family: monospace; font-size: 12px;">
          <div>总数据: {{ infinitePagination.total }} 条</div>
          <div>已加载: {{ loadedItems.length }} 条</div>
          <div>加载进度: {{ Math.round((loadedItems.length / infinitePagination.total) * 100) }}%</div>
        </div>
      </div>
    </div>
  
  <template #code>

```vue
<template>
  <div>
    <h3>🚀 高级分页功能</h3>
    <!-- 响应式数据源 -->
    <div>
      <h4>响应式数据源</h4>
      <div class="advanced-controls">
        <div class="data-controls">
          <span>模拟数据量:</span>
          <button @click="setReactiveTotal(50)" class="btn btn-outline">50 条</button>
          <button @click="setReactiveTotal(100)" class="btn btn-outline">100 条</button>
          <button @click="setReactiveTotal(200)" class="btn btn-outline">200 条</button>
          <button @click="setReactiveTotal(500)" class="btn btn-outline">500 条</button>
        </div>
        <div class="navigation-controls">
          <span class="current-page blue">
            {{ reactivePagination.current }} /
            {{ reactivePagination.totalPages }}
          </span>
          <button @click="reactiveActions.prev()" :disabled="!reactivePagination.hasPrev" class="btn btn-sm">‹</button>
          <button @click="reactiveActions.next()" :disabled="!reactivePagination.hasNext" class="btn btn-sm">›</button>
        </div>
      </div>
      <div class="pagination-info">
        <div>响应式总数: {{ reactiveTotal }} 条</div>
        <div>当前页码: {{ reactivePagination.current }}</div>
        <div>总页数: {{ reactivePagination.totalPages }}</div>
      </div>
    </div>

    <!-- 带回调的分页 -->
    <div>
      <h4>带回调的分页</h4>
      <div class="callback-controls">
        <div class="callback-navigation">
          <button @click="callbackActions.prev()" :disabled="!callbackPagination.hasPrev" class="btn">上一页</button>
          <span class="current-page green">
            {{ callbackPagination.current }} /
            {{ callbackPagination.totalPages }}
          </span>
          <button @click="callbackActions.next()" :disabled="!callbackPagination.hasNext" class="btn">下一页</button>
          <select
            :value="callbackPagination.pageSize"
            @change="callbackActions.setPageSize(Number($event.target.value))"
            class="size-select"
          >
            <option value="5">5 条/页</option>
            <option value="10">10 条/页</option>
            <option value="15">15 条/页</option>
          </select>
          <button @click="callbackActions.reset()" class="btn btn-danger">重置</button>
        </div>
      </div>
      <div class="callback-logs">
        <div class="logs-header">回调日志:</div>
        <div class="logs-content">
          <div v-for="(log, index) in callbackLogs" :key="index" class="log-item">
            {{ log }}
          </div>
        </div>
      </div>
    </div>

    <!-- 无限滚动模拟 -->
    <div>
      <h4>无限滚动模拟</h4>
      <div class="infinite-controls">
        <div class="infinite-info">
          <span>已加载:</span>
          <span class="current-page purple">
            {{ infinitePagination.current }} 页 / {{ infinitePagination.pageSize * infinitePagination.current }} 条
          </span>
          <button @click="loadMore" :disabled="!infinitePagination.hasNext || isLoading" class="btn btn-outline purple">
            {{ isLoading ? "加载中..." : infinitePagination.hasNext ? "加载更多" : "已全部加载" }}
          </button>
          <button @click="resetInfinite" class="btn btn-danger">重置</button>
        </div>
        <div class="infinite-list">
          <div v-for="item in loadedItems" :key="item" class="list-item">📄 数据项 #{{ item }}</div>
        </div>
      </div>
      <div class="pagination-info">
        <div>总数据: {{ infinitePagination.total }} 条</div>
        <div>已加载: {{ loadedItems.length }} 条</div>
        <div>
          加载进度:
          {{ Math.round((loadedItems.length / infinitePagination.total) * 100) }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { usePagination } from "@vakao-ui/hooks";

// 响应式数据源
const reactiveTotal = ref(150);
const [reactivePagination, reactiveActions] = usePagination({
  initialPageSize: 15,
  total: reactiveTotal,
});

const setReactiveTotal = (total) => {
  reactiveTotal.value = total;
};

// 带回调的分页
const callbackLogs = ref([]);
const addLog = (message) => {
  const timestamp = new Date().toLocaleTimeString();
  callbackLogs.value.unshift(`[${timestamp}] ${message}`);
  if (callbackLogs.value.length > 10) {
    callbackLogs.value = callbackLogs.value.slice(0, 10);
  }
};

const [callbackPagination, callbackActions] = usePagination({
  initialPage: 1,
  initialPageSize: 10,
  total: 88,
  onPageChange: (page) => {
    addLog(`页码变化: ${page}`);
  },
  onPageSizeChange: (pageSize) => {
    addLog(`每页大小变化: ${pageSize}`);
  },
  onChange: (page, pageSize) => {
    addLog(`分页信息变化: 第${page}页，${pageSize}条/页`);
  },
});

// 无限滚动模拟
const loadedItems = ref([]);
const isLoading = ref(false);
const [infinitePagination, infiniteActions] = usePagination({
  initialPageSize: 10,
  total: 100,
});

// 初始化加载第一页
for (let i = 1; i <= 10; i++) {
  loadedItems.value.push(i);
}

const loadMore = async () => {
  if (isLoading.value || !infinitePagination.value.hasNext) return;

  isLoading.value = true;

  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 500));

  infiniteActions.next();
  const startIndex = (infinitePagination.value.current - 1) * infinitePagination.value.pageSize + 1;
  const endIndex = Math.min(infinitePagination.value.current * infinitePagination.value.pageSize, infinitePagination.value.total);

  for (let i = startIndex; i <= endIndex; i++) {
    loadedItems.value.push(i);
  }

  isLoading.value = false;
};

const resetInfinite = () => {
  infiniteActions.reset();
  loadedItems.value = [];
  for (let i = 1; i <= 10; i++) {
    loadedItems.value.push(i);
  }
};
</script>

<style scoped>
.advanced-controls {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 12px;
}

.data-controls {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.navigation-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

.btn {
  padding: 6px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 12px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-outline {
  border-color: #1890ff;
  color: #1890ff;
}

.btn-outline.purple {
  border-color: #722ed1;
  color: #722ed1;
}

.btn-sm {
  padding: 4px 8px;
}

.btn-danger {
  border-color: #ff4d4f;
  color: #ff4d4f;
}

.current-page {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  color: white;
}

.current-page.blue {
  background: #1890ff;
}

.current-page.green {
  background: #52c41a;
}

.current-page.purple {
  background: #722ed1;
}

.pagination-info {
  padding: 12px;
  background: #f0f0f0;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
}

.callback-controls {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 12px;
}

.callback-navigation {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 12px;
}

.size-select {
  padding: 4px 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 12px;
}

.callback-logs {
  padding: 12px;
  background: #f0f0f0;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
}

.logs-header {
  margin-bottom: 8px;
}

.logs-content {
  max-height: 100px;
  overflow-y: auto;
  padding: 8px;
  background: white;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
}

.log-item {
  font-size: 11px;
  color: #666;
  margin-bottom: 2px;
}

.infinite-controls {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 12px;
}

.infinite-info {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.infinite-list {
  height: 120px;
  overflow-y: auto;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  background: white;
}

.list-item {
  padding: 8px 12px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 12px;
}
</style>
```

  </template>
</Demo>

## API 参考

### 参数

| 参数    | 类型                   | 默认值 | 说明     |
| ------- | ---------------------- | ------ | -------- |
| options | `UsePaginationOptions` | `{}`   | 配置选项 |

### UsePaginationOptions

| 属性             | 类型                                       | 默认值              | 说明               |
| ---------------- | ------------------------------------------ | ------------------- | ------------------ |
| initialPage      | `number`                                   | `1`                 | 初始页码           |
| initialPageSize  | `number`                                   | `10`                | 初始每页大小       |
| total            | `number \| Ref<number>`                    | `0`                 | 总数据量           |
| pageSizeOptions  | `number[]`                                 | `[10, 20, 50, 100]` | 可选的每页大小选项 |
| onPageChange     | `(page: number) => void`                   | -                   | 页码变化回调       |
| onPageSizeChange | `(pageSize: number) => void`               | -                   | 每页大小变化回调   |
| onChange         | `(page: number, pageSize: number) => void` | -                   | 分页信息变化回调   |

### 返回值

`usePagination` 返回一个包含分页信息和操作方法的数组：

```typescript
const [paginationInfo, actions] = usePagination(options);
```

| 索引 | 名称           | 类型                          | 说明         |
| ---- | -------------- | ----------------------------- | ------------ |
| 0    | paginationInfo | `ComputedRef<PaginationInfo>` | 分页信息     |
| 1    | actions        | `PaginationActions`           | 分页操作方法 |

### PaginationInfo

| 属性       | 类型      | 说明                        |
| ---------- | --------- | --------------------------- |
| current    | `number`  | 当前页码                    |
| pageSize   | `number`  | 每页大小                    |
| total      | `number`  | 总数据量                    |
| totalPages | `number`  | 总页数                      |
| hasPrev    | `boolean` | 是否有上一页                |
| hasNext    | `boolean` | 是否有下一页                |
| startIndex | `number`  | 当前页开始索引（从 0 开始） |
| endIndex   | `number`  | 当前页结束索引（从 0 开始） |

### PaginationActions

| 方法        | 类型                         | 说明         |
| ----------- | ---------------------------- | ------------ |
| goToPage    | `(page: number) => void`     | 跳转到指定页 |
| prev        | `() => void`                 | 上一页       |
| next        | `() => void`                 | 下一页       |
| first       | `() => void`                 | 第一页       |
| last        | `() => void`                 | 最后一页     |
| setPageSize | `(pageSize: number) => void` | 设置每页大小 |
| setTotal    | `(total: number) => void`    | 设置总数据量 |
| reset       | `() => void`                 | 重置分页     |

### 类型定义

```typescript
export interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
  total?: number | Ref<number>;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onChange?: (page: number, pageSize: number) => void;
}

export interface PaginationInfo {
  current: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
  startIndex: number;
  endIndex: number;
}

export interface PaginationActions {
  goToPage: (page: number) => void;
  prev: () => void;
  next: () => void;
  first: () => void;
  last: () => void;
  setPageSize: (pageSize: number) => void;
  setTotal: (total: number) => void;
  reset: () => void;
}

export type UsePaginationReturn = [ComputedRef<PaginationInfo>, PaginationActions];

export function usePagination(options?: UsePaginationOptions): UsePaginationReturn;
```

## 使用场景

1. **数据表格** - 大量数据的分页显示
2. **列表组件** - 长列表的分页浏览
3. **搜索结果** - 搜索结果的分页展示
4. **无限滚动** - 配合无限滚动实现数据加载
5. **API 分页** - 配合后端 API 实现服务端分页
6. **前端分页** - 前端数据的客户端分页

## 高级用法

### 服务端分页

```typescript
const total = ref(0);
const loading = ref(false);
const data = ref([]);

const [pagination, actions] = usePagination({
  initialPageSize: 20,
  total,
  onPageChange: async (page) => {
    await loadData(page, pagination.value.pageSize);
  },
  onPageSizeChange: async (pageSize) => {
    await loadData(1, pageSize);
  },
});

const loadData = async (page: number, pageSize: number) => {
  loading.value = true;
  try {
    const response = await api.getData({ page, pageSize });
    data.value = response.data;
    total.value = response.total;
  } finally {
    loading.value = false;
  }
};
```

### 前端分页

```typescript
const allData = ref([
  /* 所有数据 */
]);
const [pagination, actions] = usePagination({
  initialPageSize: 10,
  total: computed(() => allData.value.length),
});

// 当前页数据
const currentPageData = computed(() => {
  const { startIndex, endIndex } = pagination.value;
  return allData.value.slice(startIndex, endIndex + 1);
});
```

### 搜索结果分页

```typescript
const searchKeyword = ref("");
const filteredData = computed(() => {
  return allData.value.filter((item) => item.name.includes(searchKeyword.value));
});

const [pagination, actions] = usePagination({
  total: computed(() => filteredData.value.length),
});

// 搜索时重置到第一页
watch(searchKeyword, () => {
  actions.goToPage(1);
});
```

### 无限滚动

```typescript
const loadedData = ref([]);
const [pagination, actions] = usePagination({
  initialPageSize: 20,
  total: 1000,
});

const loadMore = async () => {
  if (pagination.value.hasNext) {
    const newData = await fetchData(pagination.value.current + 1);
    loadedData.value.push(...newData);
    actions.next();
  }
};

// 滚动到底部时自动加载
const { arrivedState } = useScroll(scrollContainer);
watch(
  () => arrivedState.bottom,
  (isBottom) => {
    if (isBottom) {
      loadMore();
    }
  },
);
```

### URL 同步

```typescript
const route = useRoute();
const router = useRouter();

const [pagination, actions] = usePagination({
  initialPage: Number(route.query.page) || 1,
  initialPageSize: Number(route.query.pageSize) || 10,
  onChange: (page, pageSize) => {
    router.push({
      query: { ...route.query, page, pageSize },
    });
  },
});
```

## 注意事项

1. 页码从 1 开始计算，索引从 0 开始计算
2. 当总数据量变化时，会自动调整当前页码
3. 设置每页大小时会智能计算新的页码位置
4. 响应式 total 参数支持动态数据源
5. 所有操作都会触发相应的回调函数
6. 重置操作会恢复到初始状态
7. 跳转页码会自动限制在有效范围内

<script setup>
import { ref, computed, reactive, watch } from 'vue';
import { usePagination } from '@vakao-ui/hooks';

// 基础用法
const jumpPage = ref(1);
const [basicPagination, basicActions] = usePagination({
  initialPage: 1,
  initialPageSize: 10,
  total: 95
});

const [sizePagination, sizeActions] = usePagination({
  initialPage: 1,
  initialPageSize: 10,
  total: 127
});

// 生成页码数组（简化版）
const getPageNumbers = (pagination) => {
  const { current, totalPages } = pagination;
  const pages = [];
  
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (current >= totalPages - 3) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }
  }
  
  return pages;
};

// 表格数据
const tableData = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com', status: 'active' },
  { id: 2, name: '李四', email: 'lisi@example.com', status: 'inactive' },
  { id: 3, name: '王五', email: 'wangwu@example.com', status: 'active' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', status: 'active' },
  { id: 5, name: '钱七', email: 'qianqi@example.com', status: 'inactive' },
  { id: 6, name: '孙八', email: 'sunba@example.com', status: 'active' },
  { id: 7, name: '周九', email: 'zhoujiu@example.com', status: 'inactive' },
  { id: 8, name: '吴十', email: 'wushi@example.com', status: 'active' },
  { id: 9, name: '郑十一', email: 'zhengshiyi@example.com', status: 'active' },
  { id: 10, name: '王十二', email: 'wangshier@example.com', status: 'inactive' },
  { id: 11, name: '李十三', email: 'lishisan@example.com', status: 'active' },
  { id: 12, name: '张十四', email: 'zhangshisi@example.com', status: 'active' }
]);

const [tablePagination, tableActions] = usePagination({
  initialPageSize: 5,
  total: computed(() => tableData.value.length)
});

const currentPageData = computed(() => {
  const { startIndex, endIndex } = tablePagination.value;
  return tableData.value.slice(startIndex, Math.min(endIndex + 1, tableData.value.length));
});

// 高级用法
const reactiveTotal = ref(150);
const [reactivePagination, reactiveActions] = usePagination({
  initialPageSize: 15,
  total: reactiveTotal
});

const setReactiveTotal = (total) => {
  reactiveTotal.value = total;
};

// 带回调的分页
const callbackLogs = ref([]);
const addLog = (message) => {
  const timestamp = new Date().toLocaleTimeString();
  callbackLogs.value.unshift(`[${timestamp}] ${message}`);
  if (callbackLogs.value.length > 10) {
    callbackLogs.value = callbackLogs.value.slice(0, 10);
  }
};

const [callbackPagination, callbackActions] = usePagination({
  initialPage: 1,
  initialPageSize: 10,
  total: 88,
  onPageChange: (page) => {
    addLog(`页码变化: ${page}`);
  },
  onPageSizeChange: (pageSize) => {
    addLog(`每页大小变化: ${pageSize}`);
  },
  onChange: (page, pageSize) => {
    addLog(`分页信息变化: 第${page}页，${pageSize}条/页`);
  }
});

// 无限滚动模拟
const loadedItems = ref([]);
const isLoading = ref(false);
const [infinitePagination, infiniteActions] = usePagination({
  initialPageSize: 10,
  total: 100
});

// 初始化加载第一页
for (let i = 1; i <= 10; i++) {
  loadedItems.value.push(i);
}

const loadMore = async () => {
  if (isLoading.value || !infinitePagination.value.hasNext) return;
  
  isLoading.value = true;
  
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  infiniteActions.next();
  const startIndex = (infinitePagination.value.current - 1) * infinitePagination.value.pageSize + 1;
  const endIndex = Math.min(infinitePagination.value.current * infinitePagination.value.pageSize, infinitePagination.value.total);
  
  for (let i = startIndex; i <= endIndex; i++) {
    loadedItems.value.push(i);
  }
  
  isLoading.value = false;
};

const resetInfinite = () => {
  infiniteActions.reset();
  loadedItems.value = [];
  for (let i = 1; i <= 10; i++) {
    loadedItems.value.push(i);
  }
};
</script>
