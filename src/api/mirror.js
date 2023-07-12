import {getAll, getUsing, updateUsing} from '../utools/db/mirror'

export function getMirrorList () {
  const list = getAll().data
  const using = getUsing().data
  list.forEach(x => {
    x.ping = 0
    x.using = x.key === using.key
  })
  return list
}

export function useMirror (key, url) {
  updateUsing({key, url})
}

export function getUsingMirror () {
  return getUsing().data
}
