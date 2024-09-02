import os
import json
# import openai
from openai import AzureOpenAI
# from openai.error imoprt OpenAIError
from dotenv import load_dotenv

# 環境変数の読み込み
load_dotenv()

# Azure OpenAIクライアントの設定
client = AzureOpenAI(
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version="2024-02-01",
)

def should_provide_store_info(user_text):
    # GPTに渡すメッセージを作成
    messages = [
        {"role": "system", "content": "ユーザーの入力が店舗情報を提供する必要があるかどうかを判断してください。\
                                       店舗情報が必要ならTrueを、不要ならFalseを返してください。形式は以下のJSON形式で返してください {'provide_store_info': bool}"},
        {"role": "user", "content": user_text},
    ]
    
    # OpenAI APIにリクエストを送信
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        # response_format={"type": "json_object"},
        response_format={"type": "json_object"},
    )
    
    # GPTの応答を取得
    result = response.choices[0].message.content

    # print(result)
    
    # print(json.dumps(result))

    return json.loads(result)

# # # テスト例
# print(should_provide_store_info("こんにちは"))  # 期待される結果: {"user_text": "こんにちは", "provide_store_info": False}
# print(should_provide_store_info("駅近くのうどん"))  # 期待される結果: {"user_text": "駅近くのうどん", "provide_store_info": True}
