/**
 * 共享类型定义文件
 * 
 * 定义在多个 hooks 中重复使用的通用函数类型，
 * 避免重复定义，保持类型一致性。
 * 
 * @since 0.0.2
 * @author Vakao UI Team
 */

/**
 * 设置状态为 true 的函数类型
 * @description 将状态设置为 true
 */
export type SetTrueFunction = () => void;

/**
 * 设置状态为 false 的函数类型
 * @description 将状态设置为 false
 */
export type SetFalseFunction = () => void;

/**
 * 启用/禁用功能的函数类型
 * @description 控制功能的开关状态
 */
export type SetEnabledFunction = (enabled: boolean) => void;

/**
 * 重置状态的函数类型
 * @description 重置状态到初始值
 */
export type ResetFunction = () => void;

/**
 * 更新状态的函数类型
 * @description 手动更新状态
 */
export type UpdateFunction = () => void;