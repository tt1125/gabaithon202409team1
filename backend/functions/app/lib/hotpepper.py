import requests

# ホットペッパーAPIのエンドポイントURL
url = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/"

# APIキー (取得したものを使用)
api_key = "700ae201b4d3ba6c"  # ここにあなたのAPIキーを入力

# パラメータの設定
params = {
    "key": api_key,
    "lat": 33.2938928,  # 緯度 (東京の中心座標例)
    "lng": 130.4947643,  # 経度 (東京の中心座標例)
    "range": 3,  # 検索範囲 (1~5で指定、数字が大きいほど範囲が広い)
    "count": 10,  # 取得する件数
    "format": "json"  # レスポンス形式 (jsonを推奨)
}

# APIリクエストを送信
response = requests.get(url, params=params)

# レスポンスをJSON形式で取得
data = response.json()

# 結果を表示
if "results" in data and "shop" in data["results"]:
    for shop in data["results"]["shop"]:
        print(f"店名: {shop['name']}")
        print(f"住所: {shop['address']}")
        print(f"URL: {shop['urls']['pc']}")
        print("-" * 40)
else:
    print("データを取得できませんでした。")

# def get_Turu()