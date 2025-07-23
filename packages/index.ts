import type { App } from 'vue'

// 导入所有组件
import components from './components'

// 导入样式
import './styles/index.scss'

// 导入工具函数
export * from './utils'

// 导入钩子函数
export * from './hooks'

// 导出所有组件
export * from './components'

// 导出解析器
export * from './resolver'

// 默认导出插件
export default {
  install(app: App) {
    app.use(components)
  }
}