import type { App, Component, Plugin } from 'vue'

// 提取组件的公共属性类型
export type ExtractPublicPropTypes<T> = Omit<T, keyof Component>

// 组件安装类型
export type SFCWithInstall<T> = T & Plugin

// 组件库类型
export interface VakaoUIInstance {
  version: string
  install: (app: App, ...options: any[]) => void
}

// 组件大小类型
export type ComponentSize = 'small' | 'medium' | 'large'

// 组件类型
export type ComponentType = 'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger'