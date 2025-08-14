<template>
  <div class="message-box-demo">
    <h1>MessageBox 弹框</h1>
    <p>模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。</p>

    <!-- 消息提示 -->
    <section class="demo-section">
      <h2>消息提示</h2>
      <p>当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭。</p>
      <div class="demo-block">
        <VkButton @click="showAlert">点击打开 Message Box</VkButton>
      </div>
      <div class="demo-code">
        <pre><code>import { VkMessageBox } from '@vakao-ui/components'

VkMessageBox.alert('这是一段内容', '标题名称', {
  confirmText: '确定',
  callback: action => {
    this.$message({
      type: 'info',
      message: `action: ${ action }`
    })
  }
})</code></pre>
      </div>
    </section>

    <!-- 确认消息 -->
    <section class="demo-section">
      <h2>确认消息</h2>
      <p>提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框。</p>
      <div class="demo-block">
        <VkButton @click="showConfirm">点击打开 Message Box</VkButton>
      </div>
      <div class="demo-code">
        <pre><code>VkMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
  confirmText: '确定',
  cancelText: '取消',
  type: 'warning'
}).then(() => {
  this.$message({
    type: 'success',
    message: '删除成功!'
  })
}).catch(() => {
  this.$message({
    type: 'info',
    message: '已取消删除'
  })
})</code></pre>
      </div>
    </section>

    <!-- 提交内容 -->
    <section class="demo-section">
      <h2>提交内容</h2>
      <p>当用户进行操作时会被触发，中断用户操作，提示用户进行输入的对话框。</p>
      <div class="demo-block">
        <VkButton @click="showPrompt">点击打开 Message Box</VkButton>
      </div>
      <div class="demo-code">
        <pre><code>VkMessageBox.prompt('请输入邮箱', '提示', {
  confirmText: '确定',
  cancelText: '取消',
  inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+(\w{2,})/,
  inputErrorMessage: '邮箱格式不正确'
}).then(({ value }) => {
  this.$message({
    type: 'success',
    message: '你的邮箱是: ' + value
  })
}).catch(() => {
  this.$message({
    type: 'info',
    message: '取消输入'
  })
})</code></pre>
      </div>
    </section>

    <!-- 自定义 -->
    <section class="demo-section">
      <h2>自定义</h2>
      <p>可自定义配置不同内容。</p>
      <div class="demo-block">
        <VkButton @click="showCustom">自定义图标和颜色</VkButton>
        <VkButton @click="showHTML">使用 HTML 片段</VkButton>
        <VkButton @click="showCenter">居中布局</VkButton>
      </div>
      <div class="demo-code">
        <pre><code>VkMessageBox({
  title: '消息',
  message: h('p', null, [
    h('span', null, '内容可以是 '),
    h('i', { style: 'color: teal' }, 'VNode')
  ]),
  showCancelButton: true,
  confirmText: '确定',
  cancelText: '取消',
  beforeClose: (action, instance, done) => {
    if (action === 'confirm') {
      instance.confirmButtonLoading = true
      instance.confirmText = '执行中...'
      setTimeout(() => {
        done()
        setTimeout(() => {
          instance.confirmButtonLoading = false
        }, 300)
      }, 3000)
    } else {
      done()
    }
  }
})</code></pre>
      </div>
    </section>

    <!-- 不同类型 -->
    <section class="demo-section">
      <h2>不同类型</h2>
      <p>用于显示「成功、警告、消息、错误」类的操作反馈。</p>
      <div class="demo-block">
        <VkButton type="success" @click="showSuccess">成功</VkButton>
        <VkButton type="info" @click="showInfo">消息</VkButton>
        <VkButton type="warning" @click="showWarning">警告</VkButton>
        <VkButton type="danger" @click="showError">错误</VkButton>
      </div>
      <div class="demo-code">
        <pre><code>VkMessageBox.alert('操作成功!', '消息', {
  type: 'success'
})

VkMessageBox.alert('这是一条消息提示', '消息', {
  type: 'info'
})

VkMessageBox.alert('这是一条警告消息', '警告', {
  type: 'warning'
})

VkMessageBox.alert('这是一条错误消息', '错误', {
  type: 'error'
})</code></pre>
      </div>
    </section>

    <!-- 实际应用场景 -->
    <section class="demo-section">
      <h2>实际应用场景</h2>
      <p>在实际项目中的常见使用场景。</p>

      <!-- 数据操作确认 -->
      <div class="demo-subsection">
        <h3>数据操作确认</h3>
        <div class="demo-block">
          <div class="data-operations">
            <div class="operation-item">
              <span>用户数据</span>
              <div class="operation-buttons">
                <VkButton size="small" @click="editData">编辑</VkButton>
                <VkButton type="danger" size="small" @click="deleteData">删除</VkButton>
                <VkButton type="warning" size="small" @click="resetData">重置</VkButton>
              </div>
            </div>
            <div class="operation-item">
              <span>系统配置</span>
              <div class="operation-buttons">
                <VkButton size="small" @click="backupConfig">备份</VkButton>
                <VkButton type="warning" size="small" @click="restoreConfig">恢复</VkButton>
                <VkButton type="danger" size="small" @click="clearConfig">清空</VkButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 表单提交 -->
      <div class="demo-subsection">
        <h3>表单提交确认</h3>
        <div class="demo-block">
          <div class="form-demo">
            <div class="form-item">
              <label>用户名：</label>
              <VkInput v-model="formData.username" placeholder="请输入用户名"></VkInput>
            </div>
            <div class="form-item">
              <label>邮箱：</label>
              <VkInput v-model="formData.email" placeholder="请输入邮箱"></VkInput>
            </div>
            <div class="form-item">
              <label>备注：</label>
              <VkInput v-model="formData.remark" type="textarea" placeholder="请输入备注"></VkInput>
            </div>
            <div class="form-buttons">
              <VkButton type="primary" @click="submitForm">提交</VkButton>
              <VkButton @click="draftForm">保存草稿</VkButton>
              <VkButton type="danger" @click="clearForm">清空表单</VkButton>
            </div>
          </div>
        </div>
      </div>

      <!-- 批量操作 -->
      <div class="demo-subsection">
        <h3>批量操作</h3>
        <div class="demo-block">
          <div class="batch-demo">
            <div class="item-list">
              <div v-for="item in items" :key="item.id" class="list-item">
                <VkCheckbox v-model="item.selected">{{ item.name }}</VkCheckbox>
                <VkTag :type="item.status === 'active' ? 'success' : 'info'">{{ item.status }}</VkTag>
              </div>
            </div>
            <div class="batch-buttons">
              <VkButton @click="selectAll">全选</VkButton>
              <VkButton @click="selectNone">取消全选</VkButton>
              <VkButton type="primary" :disabled="selectedCount === 0" @click="batchActivate"> 批量激活 ({{ selectedCount }}) </VkButton>
              <VkButton type="warning" :disabled="selectedCount === 0" @click="batchDeactivate"> 批量停用 ({{ selectedCount }}) </VkButton>
              <VkButton type="danger" :disabled="selectedCount === 0" @click="batchDelete"> 批量删除 ({{ selectedCount }}) </VkButton>
            </div>
          </div>
        </div>
      </div>

      <!-- 权限验证 -->
      <div class="demo-subsection">
        <h3>权限验证</h3>
        <div class="demo-block">
          <div class="permission-demo">
            <VkButton type="danger" @click="adminOperation">管理员操作</VkButton>
            <VkButton type="warning" @click="sensitiveOperation">敏感操作</VkButton>
            <VkButton @click="changePassword">修改密码</VkButton>
            <VkButton @click="exportData">导出数据</VkButton>
          </div>
        </div>
      </div>
    </section>

    <!-- 事件日志 -->
    <section class="demo-section">
      <h2>操作日志</h2>
      <div class="event-log">
        <h4>最近操作：</h4>
        <div class="log-content">
          <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
            {{ log }}
          </div>
          <div v-if="eventLogs.length === 0" class="no-logs">暂无操作记录</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from "vue";
import { VkMessageBox } from "vakao-ui";

// 类型定义
interface FormData {
  username: string;
  email: string;
  remark: string;
}

interface ListItem {
  id: number;
  name: string;
  status: "active" | "inactive";
  selected: boolean;
}

// 表单数据
const formData = ref<FormData>({
  username: "",
  email: "",
  remark: "",
});

// 列表数据
const items = ref<ListItem[]>([
  { id: 1, name: "项目 A", status: "active", selected: false },
  { id: 2, name: "项目 B", status: "inactive", selected: false },
  { id: 3, name: "项目 C", status: "active", selected: false },
  { id: 4, name: "项目 D", status: "inactive", selected: false },
  { id: 5, name: "项目 E", status: "active", selected: false },
]);

// 事件日志
const eventLogs = ref<string[]>([]);

// 计算属性
const selectedCount = computed(() => {
  return items.value.filter((item) => item.selected).length;
});

// 基础 MessageBox 方法
const showAlert = (): void => {
  VkMessageBox.alert("这是一段内容", "标题名称", {
    confirmText: "确定",
  })
    .then(() => {
      addLog("Alert 对话框确认");
    })
    .catch(() => {
      addLog("Alert 对话框取消");
    });
};

const showConfirm = (): void => {
  VkMessageBox.confirm("此操作将永久删除该文件, 是否继续?", "提示", {
    confirmText: "确定",
    cancelText: "取消",
    type: "warning",
  })
    .then(() => {
      addLog("确认删除文件");
    })
    .catch(() => {
      addLog("取消删除操作");
    });
};

const showPrompt = (): void => {
  VkMessageBox.prompt("请输入邮箱", "提示", {
    confirmText: "确定",
    cancelText: "取消",
    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+([a-zA-Z]{2,})/,
    inputErrorMessage: "邮箱格式不正确",
  })
    .then(({ value }) => {
      addLog(`输入的邮箱: ${value}`);
    })
    .catch(() => {
      addLog("取消邮箱输入");
    });
};

// 自定义 MessageBox
const showCustom = (): void => {
  VkMessageBox({
    title: "自定义消息",
    message: "这是一个自定义样式的消息框",
    customClass: "custom-message-box",
    showCancelButton: true,
    confirmText: "确定",
    cancelText: "取消",
    beforeClose: (action: string, instance: any, done?: () => void) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        instance.confirmText = "处理中...";
        setTimeout(() => {
          done?.();
          addLog("自定义对话框确认");
          setTimeout(() => {
            instance.confirmButtonLoading = false;
            instance.confirmText = "完成";
          }, 300);
        }, 2000);
      } else {
        done?.();
        addLog("自定义对话框取消");
      }
    },
  });
};

const showHTML = (): void => {
  VkMessageBox({
    title: "HTML 内容",
    message: h("div", null, [
      h("p", null, "内容可以是 "),
      h("strong", { style: "color: #409eff" }, "VNode"),
      h("p", null, "或者包含 "),
      h("em", { style: "color: #67c23a" }, "HTML 元素"),
    ]),
    showCancelButton: true,
    confirmText: "确定",
    cancelText: "取消",
  })
    .then(() => {
      addLog("HTML 内容对话框确认");
    })
    .catch(() => {
      addLog("HTML 内容对话框取消");
    });
};

const showCenter = (): void => {
  VkMessageBox.alert("居中显示的消息内容", "居中布局", {
    confirmText: "确定",
  }).then(() => {
    addLog("居中对话框操作");
  });
};

// 不同类型的 MessageBox
const showSuccess = (): void => {
  VkMessageBox.alert("操作成功!", "成功", {
    type: "success",
  }).then(() => {
    addLog("成功消息确认");
  });
};

const showInfo = (): void => {
  VkMessageBox.alert("这是一条消息提示", "消息", {
    type: "info",
  }).then(() => {
    addLog("居中对话框操作");
  });
};

const showWarning = (): void => {
  VkMessageBox.alert("这是一条警告消息", "警告", {
    type: "warning",
  }).then(() => {
    addLog("警告消息确认");
  });
};

const showError = (): void => {
  VkMessageBox.alert("这是一条错误消息", "错误", {
    type: "error",
  }).then(() => {
    addLog("错误消息确认");
  });
};

// 数据操作方法
const editData = (): void => {
  VkMessageBox.prompt("请输入新的数据值", "编辑数据", {
    confirmText: "保存",
    cancelText: "取消",
    inputValue: "原始数据",
  })
    .then(({ value }) => {
      addLog(`数据已更新为: ${value}`);
    })
    .catch(() => {
      addLog("取消编辑数据");
    });
};

const deleteData = (): void => {
  VkMessageBox.confirm("确定要删除这条数据吗？此操作不可恢复。", "删除确认", {
    confirmText: "删除",
    cancelText: "取消",
    type: "warning",
  })
    .then(() => {
      addLog("用户数据已删除");
    })
    .catch(() => {
      addLog("取消删除数据");
    });
};

const resetData = (): void => {
  VkMessageBox.confirm("重置数据将清空所有自定义设置，是否继续？", "重置确认", {
    confirmText: "重置",
    cancelText: "取消",
    type: "warning",
  })
    .then(() => {
      addLog("数据已重置");
    })
    .catch(() => {
      addLog("取消重置数据");
    });
};

const backupConfig = (): void => {
  VkMessageBox.confirm("是否创建当前配置的备份？", "备份确认", {
    confirmText: "备份",
    cancelText: "取消",
    type: "info",
  })
    .then(() => {
      addLog("配置备份已创建");
    })
    .catch(() => {
      addLog("取消配置备份");
    });
};

const restoreConfig = (): void => {
  VkMessageBox.confirm("恢复配置将覆盖当前设置，是否继续？", "恢复确认", {
    confirmText: "恢复",
    cancelText: "取消",
    type: "warning",
  })
    .then(() => {
      addLog("配置已恢复");
    })
    .catch(() => {
      addLog("取消恢复配置");
    });
};

const clearConfig = (): void => {
  VkMessageBox.confirm("清空配置将删除所有设置，此操作不可恢复！", "危险操作", {
    confirmText: "确认清空",
    cancelText: "取消",
    type: "error",
  })
    .then(() => {
      addLog("配置已清空");
    })
    .catch(() => {
      addLog("取消清空配置");
    });
};

// 表单操作方法
const submitForm = (): void => {
  if (!formData.value.username || !formData.value.email) {
    VkMessageBox.alert("请填写完整的用户信息", "提示", {
      type: "warning",
    });
    return;
  }

  VkMessageBox.confirm("确认提交表单数据？", "提交确认", {
    confirmText: "提交",
    cancelText: "取消",
    type: "info",
  })
    .then(() => {
      addLog(`表单已提交: ${formData.value.username} - ${formData.value.email}`);
      // 清空表单
      formData.value = { username: "", email: "", remark: "" };
    })
    .catch(() => {
      addLog("取消提交表单");
    });
};

const draftForm = (): void => {
  VkMessageBox.confirm("保存当前表单为草稿？", "保存草稿", {
    confirmText: "保存",
    cancelText: "取消",
    type: "info",
  })
    .then(() => {
      addLog("表单已保存为草稿");
    })
    .catch(() => {
      addLog("取消保存草稿");
    });
};

const clearForm = (): void => {
  VkMessageBox.confirm("确定要清空表单内容吗？", "清空确认", {
    confirmText: "清空",
    cancelText: "取消",
    type: "warning",
  })
    .then(() => {
      formData.value = { username: "", email: "", remark: "" };
      addLog("表单已清空");
    })
    .catch(() => {
      addLog("取消清空表单");
    });
};

// 批量操作方法
const selectAll = (): void => {
  items.value.forEach((item) => {
    item.selected = true;
  });
  addLog("已全选所有项目");
};

const selectNone = (): void => {
  items.value.forEach((item) => {
    item.selected = false;
  });
  addLog("已取消全选");
};

const batchActivate = (): void => {
  const count = selectedCount.value;
  VkMessageBox.confirm(`确定要激活选中的 ${count} 个项目吗？`, "批量激活", {
    confirmText: "激活",
    cancelText: "取消",
    type: "success",
  })
    .then(() => {
      items.value.forEach((item) => {
        if (item.selected) {
          item.status = "active";
          item.selected = false;
        }
      });
      addLog(`已激活 ${count} 个项目`);
    })
    .catch(() => {
      addLog("取消批量激活");
    });
};

const batchDeactivate = (): void => {
  const count = selectedCount.value;
  VkMessageBox.confirm(`确定要停用选中的 ${count} 个项目吗？`, "批量停用", {
    confirmText: "停用",
    cancelText: "取消",
    type: "warning",
  })
    .then(() => {
      items.value.forEach((item) => {
        if (item.selected) {
          item.status = "inactive";
          item.selected = false;
        }
      });
      addLog(`已停用 ${count} 个项目`);
    })
    .catch(() => {
      addLog("取消批量停用");
    });
};

const batchDelete = (): void => {
  const count = selectedCount.value;
  VkMessageBox.confirm(`确定要删除选中的 ${count} 个项目吗？此操作不可恢复！`, "批量删除", {
    confirmText: "删除",
    cancelText: "取消",
    type: "error",
  })
    .then(() => {
      items.value = items.value.filter((item) => !item.selected);
      addLog(`已删除 ${count} 个项目`);
    })
    .catch(() => {
      addLog("取消批量删除");
    });
};

// 权限验证方法
const adminOperation = (): void => {
  VkMessageBox.prompt("请输入管理员密码", "权限验证", {
    confirmText: "验证",
    cancelText: "取消",
    inputPlaceholder: "请输入密码",
  })
    .then(({ value }) => {
      if (value === "admin123") {
        addLog("管理员权限验证成功");
        VkMessageBox.alert("权限验证成功，可以执行管理员操作", "验证成功", {
          type: "success",
        });
      } else {
        VkMessageBox.alert("密码错误，权限验证失败", "验证失败", {
          type: "error",
        });
        addLog("管理员权限验证失败");
      }
    })
    .catch(() => {
      addLog("取消管理员权限验证");
    });
};

const sensitiveOperation = (): void => {
  VkMessageBox.confirm("此操作涉及敏感数据，确定要继续吗？", "敏感操作警告", {
    confirmText: "继续",
    cancelText: "取消",
    type: "warning",
    message: "<strong>警告：</strong>此操作可能影响系统安全，请谨慎操作！",
  })
    .then(() => {
      addLog("执行敏感操作");
    })
    .catch(() => {
      addLog("取消敏感操作");
    });
};

const changePassword = (): void => {
  VkMessageBox.prompt("请输入新密码", "修改密码", {
    confirmText: "修改",
    cancelText: "取消",
    inputPlaceholder: "请输入新密码",
    inputPattern: /^.{6,}$/,
    inputErrorMessage: "密码长度至少6位",
  })
    .then(({ value }) => {
      addLog("密码修改成功");
      VkMessageBox.alert("密码修改成功，请重新登录", "修改成功", {
        type: "success",
      });
    })
    .catch(() => {
      addLog("取消修改密码");
    });
};

const exportData = (): void => {
  VkMessageBox.confirm("导出数据可能需要一些时间，是否继续？", "导出确认", {
    confirmText: "导出",
    cancelText: "取消",
    type: "info",
  })
    .then(() => {
      // 模拟导出过程
      VkMessageBox({
        title: "导出进度",
        message: "正在导出数据，请稍候...",
        showCancelButton: false,
        showConfirmButton: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
      });

      setTimeout(() => {
        VkMessageBox.close();
        VkMessageBox.alert("数据导出完成", "导出成功", {
          type: "success",
        });
        addLog("数据导出完成");
      }, 3000);
    })
    .catch(() => {
      addLog("取消导出数据");
    });
};

// 工具方法
const addLog = (message: string): void => {
  const timestamp = new Date().toLocaleTimeString();
  eventLogs.value.unshift(`[${timestamp}] ${message}`);
  if (eventLogs.value.length > 15) {
    eventLogs.value.pop();
  }
};
</script>

<style lang="scss" scoped>
.message-box-demo {
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

.demo-block .vk-button {
  margin-right: 15px;
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

.data-operations {
  max-width: 600px;
}

.operation-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.operation-buttons .vk-button {
  margin-left: 8px;
}

.form-demo {
  max-width: 500px;
}

.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.form-item label {
  width: 80px;
  text-align: right;
  margin-right: 15px;
  font-size: 14px;
  color: #303133;
}

.form-item .vk-input {
  flex: 1;
}

.form-buttons {
  margin-top: 20px;
  text-align: center;
}

.form-buttons .vk-button {
  margin: 0 8px;
}

.batch-demo {
  max-width: 600px;
}

.item-list {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e9ecef;
}

.list-item:last-child {
  border-bottom: none;
}

.batch-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.permission-demo .vk-button {
  margin-right: 15px;
  margin-bottom: 10px;
}

.event-log {
  margin-top: 20px;
}

.event-log h4 {
  margin: 0 0 15px 0;
  font-size: 16px;
  color: #303133;
}

.log-content {
  max-height: 300px;
  overflow-y: auto;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 15px;
}

.log-item {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.log-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.no-logs {
  text-align: center;
  color: #909399;
  font-size: 14px;
  padding: 20px;
}

/* 自定义 MessageBox 样式 */
:deep(.custom-message-box) {
  border-radius: 10px;
}

:deep(.custom-message-box .el-message-box__header) {
  background-color: #f0f9ff;
  border-bottom: 1px solid #409eff;
}
</style>
