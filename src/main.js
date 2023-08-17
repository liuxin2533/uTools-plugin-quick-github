import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// import {
//   create,
//   NButton,
//   NDataTable
// } from 'naive-ui'
//
// const naive = create({
//   components: [NButton, NDataTable]
// })
const app = createApp(App)
app.use(pinia)
// app.use(naive)
app.mount('#app')
