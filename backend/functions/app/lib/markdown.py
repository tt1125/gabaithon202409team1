import requests
from markdownify import markdownify as md

def scrape_and_convert(url, output_file):
    # URLからHTMLを取得
    response = requests.get(url)
    response.raise_for_status()  # エラーチェック

    # HTMLコンテンツを取得
    html_content = response.text

    # HTML文字列をMarkdownに変換
    markdown = md(html_content)

    # 結果を表示
    return markdown

# 使用例
url = "https://www.hotpepper.jp/strJ000555032/food/"
output_file = "output.md"
markdown_content = scrape_and_convert(url, output_file)
print(markdown_content)