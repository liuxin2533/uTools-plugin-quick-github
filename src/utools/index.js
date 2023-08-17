export async function testWebSpeed (url) {
  if (!window.utools || !window.utools.ubrowser) {
    return -1
  }
  const res = await window.utools.ubrowser.goto(url)
      .evaluate(() => {
        return JSON.stringify(window.performance.getEntriesByType('navigation'))
      })
      .run({show: false})
  const t = JSON.parse(res)[0]
  return Math.round(t.loadEventEnd - t.startTime)
}
