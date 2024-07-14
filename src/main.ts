import './assets/main.css'

import { createApp as createClientApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


// cms: Cart management system
const plugins = import.meta.glob<{ default: CmsPlugin }>('./plugins/*.ts')

export type CmsContext = Awaited<ReturnType<typeof createApp>>
export type CmsPlugin = (cms: CmsContext) => void | Promise<void>

// this is a helper function to define plugins with autocompletion
export function definePlugin(plugin: CmsPlugin) {
  return plugin
}

export async function createApp() {
  const app = createClientApp(App)
  const pinia = createPinia()
  app.use(pinia)
  app.use(router)

  const cms = {
    app,
    router,
    pinia,
  }

  app.provide('cms', cms)

  for (const path in plugins) {
    try {
      const { default: plugin } = await plugins[path]()
      await plugin(cms)
    } catch (error) {
      console.error(`Error while loading plugin "${path}".`)
      console.error(error)
    }
  }
  return cms
}

createApp().then(async (cms) => {
  // finally mount the app to the DOM
  cms.app.use(cms.router)
  cms.app.mount('#app')
})

