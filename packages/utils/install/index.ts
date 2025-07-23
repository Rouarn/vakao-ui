import type { App, Component } from "vue";

// Type for component with install method
export type WithInstall<T> = T & {
  install(app: App): void;
};

// Helper function to add install method to component
export const withInstall = <T extends Component>(component: T) => {
  (component as WithInstall<T>).install = (app: App) => {
    const { name } = component;
    if (name) {
      // 注册原始组件名
      app.component(name, component);

      // // 同时注册kebab-case版本的组件名
      // const kebabName = name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
      // app.component(kebabName, component);

      // // 注册首字母小写版本的组件名（如VKButton -> VkButton）
      // if (name.startsWith('VK')) {
      //   const lowerFirstName = 'Vk' + name.slice(2);
      //   app.component(lowerFirstName, component);
      // }
    }
  };
  return component as WithInstall<T>;
};

// Install all components
export const installAll = (app: App, components: Record<string, any>) => {
  Object.keys(components).forEach(key => {
    const component = components[key];
    if (component.install) {
      app.use(component);
    }
  });
  return app;
};
