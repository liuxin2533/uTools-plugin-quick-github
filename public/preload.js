const GITHUB_URL = 'github.com'

const QUICK_MAP = {
  'KGITHUB_COM': 'kgithub.com'
}

function matchQuickUrl (code, payload) {
  return payload.replace(GITHUB_URL, QUICK_MAP[code])
}

function onEnter ({code, payload}) {
  const url = matchQuickUrl(code, payload)
  window.utools.shellOpenExternal(url)
  window.utools.hideMainWindow()
  window.utools.outPlugin()
}

window.exports = {
  'KGITHUB_COM': {
    mode: 'none',
    args: {
      enter: (action) => {
        onEnter(action)
      }
    }
  }
}
