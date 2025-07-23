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
      // 支持多种命名格式：VKButton, VkButton, vk-button
      const upperPrefix = prefix.toUpperCase()
      const capitalPrefix = prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase()
      const kebabPrefix = prefix.toLowerCase() + '-'
      
      let compName = ''
      
      if (name.startsWith(upperPrefix)) {
        // VKButton -> VKButton
        compName = name
      } else if (name.startsWith(capitalPrefix)) {
        // VkButton -> VKButton
        compName = upperPrefix + name.slice(capitalPrefix.length)
      } else if (name.startsWith(kebabPrefix)) {
        // vk-button -> VKButton
        const pascalName = name.replace(kebabPrefix, '').replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
        compName = upperPrefix + pascalName.charAt(0).toUpperCase() + pascalName.slice(1)
      }
      
      if (compName) {
        return {
          name: compName,
          from: 'vakao-ui'
        }
      }
    }
  }
}