/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly BASE_URL: string;
  }
}
