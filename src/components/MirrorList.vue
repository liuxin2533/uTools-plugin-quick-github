<template>
  <n-data-table
      :columns="columns"
      :data="data"
      :pagination="false"
      :bordered="false"
  />
  <div>{{ using }}</div>
</template>
<script setup>
import {NButton, NDataTable, NGradientText, NIcon, NSpin, useMessage} from 'naive-ui'
import ExternalLink from '@vicons/tabler/ExternalLink'
import {h, reactive} from 'vue'
import {getMirrorList, useMirror} from '../api/mirror.js'
import {testWebSpeed} from '../utools/index.js'

const message = useMessage()
const createColumns = ({use}) => {
  return [
    {
      title: 'Mirror', key: 'url', minWidth: '200', render (row) {
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
      title: 'Ping', key: 'ping', minWidth: '200', render (row) {
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
        return h(NGradientText, {type: type}, row.ping + 'ms')
      }
    },
    {
      title: 'Action', key: 'actions', minWidth: '100', render (row) {
        return h(NButton, {
          strong: true,
          tertiary: true,
          disabled: row.using,
          type: row.using ? 'primary' : 'default',
          size: 'small',
          onClick: () => use(row)
        }, {
          default: () => row.using ? 'In Use' : 'Use'
        })
      }
    }
  ]
}

const data = reactive(getMirrorList())
data.forEach(x => {
  testWebSpeed(x.url).then(y => x.ping = y)
})
const columns = reactive(createColumns({
  use (row) {
    data.forEach(x => x.using = false)
    row.using = true
    message.info(`Use ${row.url}`)
    useMirror(row.key, row.url)
  }
}))
</script>

<style scoped>

</style>
