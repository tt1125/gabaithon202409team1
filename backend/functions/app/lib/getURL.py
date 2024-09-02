import requests

# ホットペッパーAPIのエンドポイントURL
url = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/"

# APIキー (取得したものを使用)
api_key = "700ae201b4d3ba6c"  # ここにあなたのAPIキーを入力

def get_store_url_by_name(store_name):
    # パラメータの設定
    params = {
        "key": api_key,
        "keyword": store_name,  # 店名をキーワードとして使用
        "count": 1,  # 取得する件数（1件のみ）
        "format": "json"  # レスポンス形式 (jsonを推奨)
    }

    # APIリクエストを送信
    response = requests.get(url, params=params)
    data = response.json()

    # リストが空でないことを確認
    if data["results"]["shop"]:
        shop_info = data["results"]["shop"][0]  # 最初の店の情報を取得
        return shop_info["urls"]["pc"]
    else:
        raise ValueError("指定された名前の店が見つかりませんでした。")

# # 使用例
# try:
#     store_name = "人力うどん春日店"  # 例として店名を指定
#     url = get_store_url_by_name(store_name)
#     print(url)
# except ValueError as e:
#     print(e)