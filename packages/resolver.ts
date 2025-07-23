import type { ComponentResolver } from 'unplugin-vue-components/types'

export interface VakaoUIResolverOptions {
  /**
   * 组件库前缀，默认为 'vk'
   */
  prefix?: string
}

/**
 * 为 unplugin-vue-components 提供的 Vakao UI 组件解析器
 * 
 * @param options 解析器选项
 * @returns 组件解析器
 */
export function VakaoUIResolver(options: VakaoUIResolverOptions = {}): ComponentResolver {
  const { prefix = 'vk' } = options

  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.startsWith(prefix.toUpperCase()) || name.startsWith(prefix)) {
        // 处理前缀，确保格式一致
        const compName = name.startsWith(prefix) 
          ? name.replace(new RegExp(`^${prefix}`), prefix.toUpperCase())
          : name
        
        return {
          name: compName,
          from: 'vakao-ui'
        }
      }
    }
  }
}