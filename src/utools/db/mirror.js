
const MIRRORS_DB_ID = 'mirrors_db_id'
const USING_MIRROR_DB_ID = 'using_mirror_db_id'

const DEFAULT_MIRRORS = [
  {key: 'kgithub.com', url: 'https://kgithub.com'},
  {key: 'hub.njuu.cf', url: 'https://hub.njuu.cf'},
  {key: 'hub.nuaa.cf', url: 'https://hub.nuaa.cf'},
  {key: 'hub.yzuu.cf', url: 'https://hub.yzuu.cf'}
]

export function init () {
  const mirrors = getAll()
  if (!mirrors) {
    window.utools.db.put({
      _id: MIRRORS_DB_ID,
      data: DEFAULT_MIRRORS
    })
  }
  updateUsing(DEFAULT_MIRRORS[0], false)
}

export function getAll () {
  return window.utools.db.get(MIRRORS_DB_ID)
}

export function updateUsing (mirror, force = true) {
  const doc = {
    _id: USING_MIRROR_DB_ID,
    data: mirror
  }
  const using = getUsing()
  if (using) {
    doc._rev = using._rev
    if (!force) {
      return
    }
  }
  window.utools.db.put(doc)
}

export function getUsing () {
  return window.utools.db.get(USING_MIRROR_DB_ID)
}
