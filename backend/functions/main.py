from firebase_functions import https_fn
from firebase_admin import initialize_app
from firebase_functions import options
import json
import os

from app.lib.answer import answer_question_based_on_markdown, answer_question_when_faulse, answer_question_when_not_found
from app.lib.bool import should_provide_store_info
from app.lib.keyword import extract_keywords
from app.lib.places import find_places
from app.lib.getURL import get_store_url_by_name
from app.lib.markdown import scrape_and_convert
from app.lib.answer import scrape_and_convert

from app.lib.gpt_test import gpt_test

initialize_app()

options.set_global_options(region=options.SupportedRegion.ASIA_NORTHEAST1)

@https_fn.on_request()
def test(req: https_fn.Request) -> https_fn.Response:
    # CORSヘッダーを追加
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if req.method == 'OPTIONS':
        return https_fn.Response('', status=204, headers=headers)

    # リクエストボディをデコードしてJSONとして読み込む
    try:
        request_data = json.loads(req.data.decode('utf-8'))
    except json.JSONDecodeError:
        return https_fn.Response(json.dumps({'error': 'Invalid JSON'}), status=400, headers=headers)

    # JSONデータから特定のフィールドを取り出す
    try:
        message = request_data['data']['message']
        lat = request_data['data']['lat']
        lng = request_data['data']['lng']
    except KeyError:
        return https_fn.Response(json.dumps({'error': 'Missing data in JSON'}), status=400, headers=headers)
    
    response_data = {
        'result': chat(message, lat, lng),
    }

    # 実際の処理
    return https_fn.Response(json.dumps(response_data), headers=headers)

def chat(message, lat, lng):
    # 店舗情報を提供するかどうかを判断
    provide_store_info = should_provide_store_info(message) # True or False
    print(f"provide_store_info: {provide_store_info}")  # デバッグプリント

    # 店舗情報を提供する場合(True)
    if provide_store_info:
        try:
            store_name = ""

            # 1.キーワードを取得
            keyword = extract_keywords(message)
            print(f"keyword: {keyword}")  # デバッグプリント

            # 2.位置情報とキーワードをもとに店舗名を取得
            store_name = find_places(keyword, f"{lat},{lng}")
            print(f"store_name: {store_name}")  # デバッグプリント

            # 3.店舗名をもとにAPIからURLを取得
            store_url = get_store_url_by_name(store_name)
            print(f"store_url: {store_url}")  # デバッグプリント

            if store_url is None:
                return answer_question_when_faulse(message)
            
            # 4.店舗URLをもとに店舗情報を取得
            store_info = scrape_and_convert(store_url)
            print(f"store_info: {store_info}")  # デバッグプリント

            # 5.店舗情報をもとに解答を生成
            answer = answer_question_based_on_markdown(store_info, message)
            print(f"answer: {answer}")  # デバッグプリント

            # 店舗情報を返す
            return answer
        except Exception as e:
            print(f"Error: {e}")
            return answer_question_when_not_found(message, store_name, lat, lng)
    else:
        return answer_question_when_faulse(message, lat, lng)