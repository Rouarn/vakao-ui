export interface VkIconProps {
  /**
   * 自定义图标 URL 或路径
   */
  src?: string;
  /**
   * 图标大小
   */
  size?: string | number;
  /**
   * 图标颜色
   */
  color?: string;
  /**
   * 自定义类名
   */
  customClass?: string;
  /**
   * 自定义样式
   */
  customStyle?: string | Record<string, any>;
}

export type VkIconSize = 'small' | 'medium' | 'large';