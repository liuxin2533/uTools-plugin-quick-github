<template>
  <n-message-provider>
    <mirror-list/>
  </n-message-provider>
</template>
<script setup>
import {NMessageProvider} from 'naive-ui'
import MirrorList from './components/MirrorList.vue'
import {getUsingMirror} from './api/mirror.js'

const GITHUB_URL = 'github.com'

function matchQuickUrl (payload) {
  const using = getUsingMirror()
  return payload.replace(GITHUB_URL, using.key)
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
