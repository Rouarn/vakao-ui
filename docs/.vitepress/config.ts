import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vakao UI',
  description: 'A Vue 3 component library based on NaiveUI',
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/' },
      { text: 'GitHub', link: 'https://github.com/your-username/vakao-ui' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装', link: '/guide/installation' },
            { text: '使用', link: '/guide/usage' },
            { text: '使用示例', link: '/guide/examples' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' }
            // Add more components here as they are created
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/vakao-ui' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Vakao UI'
    }
  }
})