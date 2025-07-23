import type { App, Component } from 'vue'

// Type for component with install method
export type WithInstall<T> = T & {
  install(app: App): void
}

// Helper function to add install method to component
export const withInstall = <T extends Component>(component: T) => {
  ;(component as WithInstall<T>).install = (app: App) => {
    const { name } = component
    if (name) {
      app.component(name, component)
    }
  }
  return component as WithInstall<T>
}

// Install all components
export const installAll = (app: App, components: Record<string, any>) => {
  Object.keys(components).forEach(key => {
    const component = components[key]
    if (component.install) {
      app.use(component)
    }
  })
  return app
}