import Button from "./src/index.vue";
import {
  ButtonProps,
  ButtonEmits,
  ButtonType,
  ButtonSize,
  ButtonNativeType,
} from "./src/types";
import { withInstall } from "@vakao-ui/utils";

// 导入样式
import "./style";

// 导出类型
export type {
  ButtonProps,
  ButtonEmits,
  ButtonType,
  ButtonSize,
  ButtonNativeType,
};

// 注册组件
const VkButton = withInstall(Button);

// 导出组件
export { VkButton };
