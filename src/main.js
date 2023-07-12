import {createApp} from 'vue'
import App from './App.vue'
import {init as initMirrors} from './utools/db/mirror.js'
// import {
//   create,
//   NButton,
//   NDataTable
// } from 'naive-ui'
//
// const naive = create({
//   components: [NButton, NDataTable]
// })
initMirrors()
const app = createApp(App)
// app.use(naive)
app.mount('#app')
