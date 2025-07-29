import type { App, Component } from "vue";

// Type for component with install method
export type WithInstall<T> = T & {
  install(_app: App): void;
};

// Helper function to add install method to component
export const withInstall = <T extends Component>(component: T) => {
  (component as WithInstall<T>).install = (app: App) => {
    const { name } = component;
    if (name) {
      // 注册原始组件名
      app.component(name, component);
    }
  };
  return component as WithInstall<T>;
};

// Install all components
export const installAll = (
  app: App,
  components: Record<string, WithInstall<Component>>,
) => {
  Object.keys(components).forEach((key) => {
    const component = components[key];
    if (component && typeof component.install === "function") {
      app.use(component);
    }
  });
  return app;
};
