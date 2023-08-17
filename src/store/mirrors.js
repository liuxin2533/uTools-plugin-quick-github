import {defineStore} from 'pinia'
import * as storage from '@/storage'
import {computed, ref} from 'vue'

const DEFAULT_MIRRORS = [
  {key: 'kgithub.com', url: 'https://kgithub.com', ping: 0, using: true},
  {key: 'hub.njuu.cf', url: 'https://hub.njuu.cf', ping: 0},
  {key: 'hub.nuaa.cf', url: 'https://hub.nuaa.cf', ping: 0},
  {key: 'hub.yzuu.cf', url: 'https://hub.yzuu.cf', ping: 0}
]
export const useMirrorsStore = defineStore('mirrors', () => {

  const mirrors = ref(DEFAULT_MIRRORS)

  const usingMirror = computed(() => {
    return mirrors.value.find(x => x.using)
  })

  function setUsingMirror (key) {
    mirrors.value.forEach(x => {
      x.using = x.key === key
    })
  }

  return {mirrors, usingMirror, setUsingMirror}
}, {
  persist: {
    storage: storage
  }
})
