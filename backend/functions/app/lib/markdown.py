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

# # 使用例
# url = "https://www.hotpepper.jp/strJ000555032/food/"
# output_file = "output.md"
# markdown_content = scrape_and_convert(url, output_file)
# print(markdown_content)

# import requests
# from time import sleep

# def scrape_and_convert(url, output_file):
#     max_retries = 3
#     retry_delay = 5  # 秒

#     for attempt in range(max_retries):
#         try:
#             response = requests.get(url)
#             response.raise_for_status()  # エラーチェック
#             # ここにスクレイピングとMarkdown変換の処理を追加
#             with open(output_file, 'w', encoding='utf-8') as f:
#                 f.write(response.text)  # 例としてレスポンスのテキストをファイルに書き込む
#             return response.text
#         except requests.exceptions.HTTPError as e:
#             if response.status_code == 503 and attempt < max_retries - 1:
#                 print(f"503エラーが発生しました。{retry_delay}秒後に再試行します... ({attempt + 1}/{max_retries})")
#                 sleep(retry_delay)
#             else:
#                 print(f"HTTPエラーが発生しました: {e}")
#                 raise
#         except requests.exceptions.RequestException as e:
#             print(f"リクエストエラーが発生しました: {e}")
#             raise

# 使用例
# try:
#     url = "https://www.hotpepper.jp/strJ000555032/food/"
#     output_file = "output.md"
#     markdown_content = scrape_and_convert(url, output_file)
#     print(markdown_content)
# except requests.exceptions.RequestException as e:
#     print(f"最終的なエラー: {e}")