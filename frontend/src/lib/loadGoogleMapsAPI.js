import { initMap } from './initMap'

export const loadGoogleMapsAPI = (setMap) => {
  ((g) => {
    let h = null
    const p = 'The Google Maps JavaScript API'
    const c = 'google'
    const l = 'importLibrary'
    const q = '__ib__'
    const m = document

    let b = window
    b = b[c] || (b[c] = {})
    const d = b.maps || (b.maps = {})
    const e = new URLSearchParams()

    const u = () => {
      if (!h) {
        // GoogleMapsAPIのスクリプトが読み込まれるのを待つ
        h = new Promise((resolve, reject) => {
          const a = m.createElement('script')
          // クエリパラメータの設定キー バリュー
          e.set('libraries', '')
          for (const k in g) {
            if (g[k]) {
              e.set(
                k.replace(/[A-Z]/g, (t) => '_' + t[0].toLowerCase()),
                g[k],
              )
            }
          }
          e.set('callback', c + '.maps.' + q)
          // Google Maps APIのURLとクエリパラメータを設定
          a.src = `https://maps.${c}apis.com/maps/api/js?` + e
          // resolve
          d[q] = resolve
          // rejects
          a.onerror = () => reject(new Error(p + ' could not load.'))
          // ドキュメントの属性を検索
          a.nonce =
            (m.querySelector('script[nonce]'))?.nonce || ''
          // document.head要素に新しいscript要素aを追加
          m.head.append(a)
        })
      }
      // Promiseをリターンする
      return h
    }

    if (!d[l]) {
      d[l] = (f, ...n) => u().then(() => d[l](f, ...n))
      return u().then(() => {
        // マップを表示する
        initMap(setMap)
      })
    }
  })({
    key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY, // 環境変数
    v: 'beta',
  })
}
