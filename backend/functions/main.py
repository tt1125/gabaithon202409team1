from firebase_functions import https_fn
from firebase_admin import initialize_app
from firebase_functions import options
import json

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
        return https_fn.Response({'error': 'Invalid JSON'}, status=400, headers=headers)

    # JSONデータから特定のフィールドを取り出す
    try:
        message = request_data['data']['message']
        sendMessages = request_data['data']['sendMessages']
        lat = request_data['data']['lat']
        lng = request_data['data']['lng']

        print(message,"⭐️", sendMessages,"⭐️", lat, "⭐️",lng)
    except KeyError:
        return https_fn.Response({'error': 'Missing data in JSON'}, status=400, headers=headers)
    

    result = gpt_test(message)

    response_data = {
        'result': result,
    }

    # 実際の処理
    return https_fn.Response(json.dumps(response_data), headers=headers)