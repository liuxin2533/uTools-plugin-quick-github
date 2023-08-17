<template>
  <div class="tip-wrapper" :class="{hide:!show}">
    <div style="flex: 1;">
      <n-alert type="warning" size="small" :bordered="false">
        镜像网站来自互联网，请谨慎在镜像站进行敏感信息操作。
      </n-alert>
    </div>
    <n-alert type="warning" :bordered="false" :show-icon="false">
      <span style="color: #2080f0;margin-right: 14px;cursor: pointer;" @click="close(false)">我已知晓</span>
      <span style="color: #2080f0;cursor: pointer;" @click="close(true)">不再提示</span>
    </n-alert>
  </div>
</template>
<script setup>
import {NAlert} from 'naive-ui'
import {ref} from 'vue'

const tipShow = window.localStorage.getItem('tip:show')
const show = ref(tipShow === null)

function close (never) {
  show.value = false
  if (never) {
    window.localStorage.setItem('tip:show', 'never')
  }
}
</script>
<style scoped>
.tip-wrapper {
  display: flex;
  align-items: center;
  height: 48px;
  transition: height 0.4s;
}

.tip-wrapper.hide {
  height: 0;
}
</style>
