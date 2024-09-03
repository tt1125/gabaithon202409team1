import os
from openai import AzureOpenAI
from dotenv import load_dotenv

load_dotenv()

client = AzureOpenAI(
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version="2024-02-01",
)

systemprompt = "ユーザーから受け取った文章からキーワードを抽出して、それらをスペースで区切って返してください。\
                例えば食べ物を含むキーワードがある場合，「食べたい」といった趣旨のキーワードは抽出しなくていいです．\
                例：「駅から近いうどんを食べたい」と受け取った場合，「駅 近い うどん」とだけ出力する"

def extract_keywords(user_input):
    # OpenAI APIを使用してキーワードを抽出
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            # {"role": "system", "content": "ユーザーから受け取った文章からキーワードを抽出して、それらをスペースで区切って返してください。"},
            {"role": "system", "content": systemprompt},
            {"role": "user", "content": user_input},
        ],
    )
    
    # キーワード抽出の結果を返す
    return response.choices[0].message.content.strip()

# # テスト例
# user_input = "駅から近いうどんを食べたい"
# # user_input = "駅から近い家族で入れるお風呂に入りたい"
# user_input = "駅前不動産スタジアムから車で10分以内で食べられるラーメン屋"
# keywords = extract_keywords(user_input)
# print(keywords)
