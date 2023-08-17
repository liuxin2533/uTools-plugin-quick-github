<template>
  <n-message-provider>
    <Tip/>
    <MirrorList/>
  </n-message-provider>
</template>
<script setup>
import {NMessageProvider} from 'naive-ui'
import MirrorList from './components/MirrorList.vue'
import Tip from './components/Tip.vue'
import {useMirrorsStore} from '@/store/mirrors.js'

const GITHUB_URL = 'github.com'

const mirrorStore = useMirrorsStore()

function matchQuickUrl (payload) {
  return payload.replace(GITHUB_URL, mirrorStore.usingMirror.key)
}

window.utools.onPluginEnter(({code, type, payload}) => {
  if (type === 'regex') {
    const url = matchQuickUrl(payload)
    window.utools.shellOpenExternal(url)
    window.utools.hideMainWindow()
    window.utools.outPlugin()
  }
})
</script>
<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
