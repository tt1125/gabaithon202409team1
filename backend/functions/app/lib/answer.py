import requests
from markdownify import markdownify as md
from openai import AzureOpenAI
from dotenv import load_dotenv
import os

# 環境変数の読み込み
load_dotenv()

# Azure OpenAIクライアントの設定
client = AzureOpenAI(
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version="2024-02-01",
)

def scrape_and_convert(url):
    # URLからHTMLを取得
    response = requests.get(url)
    response.raise_for_status()  # エラーチェック

    # HTMLコンテンツを取得
    html_content = response.text

    # HTML文字列をMarkdownに変換
    markdown = md(html_content)

    # 結果を返す
    return markdown

def answer_question_based_on_markdown(markdown_content, user_question):
    # OpenAI APIを使用して質問に答える
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "以下のマークダウン情報は、ユーザーの質問文と位置情報をもとに検索をかけた結果です。これを元に、ユーザーの質問に対して詳細に答えてください。"},
            {"role": "system", "content": markdown_content},
            {"role": "user", "content": user_question},
        ],
    )

    # OpenAIの応答を返す
    return response.choices[0].message.content.strip()

# false(店舗情報を提供しない場合)の処理
false_prompt = "ユーザーの入力と位置情報に対してコメントを返してください。"
def answer_question_when_faulse(message,lat , lng):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": false_prompt},
            {"role": "user", "content": f"{message} 位置情報    {lat} , {lng}"},
        ],
    )

    return response.choices[0].message.content.strip()

not_found_prompt = "近くにユーザーの要望に沿ったお店がないか探しましたが、見つかりませんでした。その代わり、ユーザーの質問文と位置情報をもとにコメントを返してください。また、お店は見つかったが具体的な情報が得られなかった場合は、店舗名だけ記載します"
def answer_question_when_not_found(message,store_name,lat , lng):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": not_found_prompt},
            {"role": "user", "content": f"{message} 店舗名 {store_name}  位置情報    {lat} , {lng}"},
        ],
    )

    return response.choices[0].message.content.strip()

# 使用例
# url = "https://www.hotpepper.jp/strJ000555032/food/"
# markdown_content = scrape_and_convert(url)

# user_question = "この店でおすすめのメニューは何ですか？"
# answer = answer_question_based_on_markdown(markdown_content, user_question)
# print(answer)
