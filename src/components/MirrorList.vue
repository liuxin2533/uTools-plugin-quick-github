<template>
  <n-space vertical>
    <n-data-table
        :columns="columns"
        :data="mirrors"
        :pagination="false"
        :bordered="false"
    />
    <n-alert type="info">
      如果访问上述镜像站依然很慢，尝试切换浏览器DNS服务。具体参考 <b style="color: #2080f0;cursor: pointer;" @click="openDNSHelper">阿里云免费DNS</b>
    </n-alert>
  </n-space>
</template>
<script setup>
import {NButton, NDataTable, NGradientText, NIcon, NSpin, NAlert, NSpace, useMessage} from 'naive-ui'
import ExternalLink from '@vicons/tabler/ExternalLink'
import {h, reactive} from 'vue'
import {testWebSpeed} from '@/utools/index.js'
import {useMirrorsStore} from '@/store/mirrors.js'
import {storeToRefs} from 'pinia'

const message = useMessage()
const mirrorStore = useMirrorsStore()

const {mirrors} = storeToRefs(mirrorStore)

mirrors.value.forEach(x => {
  testWebSpeed(x.url).then(y => x.ping = y)
})

const createColumns = ({use}) => {
  return [
    {
      title: '镜像站', key: 'url', minWidth: '200', render (row) {
        return [
          row.url,
          h(NIcon, {
            style: {
              marginLeft: '5px',
              cursor: 'pointer'
            },
            color: '#08c',
            component: ExternalLink,
            onClick: () => {
              window.utools.shellOpenExternal(row.url)
            }
          })
        ]
      }
    },
    {
      title: '速度', key: 'ping', minWidth: '200', render (row) {
        if (row.ping === 0) {
          return h(NSpin, {
            size: 20
          })
        }
        let type = 'success'
        if (row.ping > 2000) {
          type = 'error'
        } else if (row.ping > 1000) {
          type = 'warning'
        }
        return h(NGradientText, {type: type}, {
          default: () => row.ping + 'ms'
        })
      }
    },
    {
      title: '操作', key: 'actions', minWidth: '100', render (row) {
        return h(NButton, {
          strong: true,
          tertiary: true,
          disabled: row.using,
          type: row.using ? 'primary' : 'default',
          size: 'small',
          onClick: () => use(row)
        }, {
          default: () => row.using ? '启用中' : '启用'
        })
      }
    }
  ]
}
const columns = reactive(createColumns({
  use (row) {
    row.using = true
    message.info(`Use ${row.url}`)
    mirrorStore.setUsingMirror(row.key)
  }
}))

function openDNSHelper () {
  window.utools.shellOpenExternal('https://alidns.com/knowledge?type=SETTING_DOCS#user_chrome')
}
</script>

<style scoped>

</style>
