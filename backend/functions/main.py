from firebase_functions import https_fn
from firebase_admin import initialize_app
from app.lib.bool import *
from app.lib.keyword import *
from app.lib.places import *
# from app.lib.hotpepper import *
from app.lib.getURL import *
from app.lib.markdown import *
from app.lib.answer import *
from app.lib.hotpepper import get_store_info

initialize_app()


@https_fn.on_request()
def chat(req: https_fn.Request) -> https_fn.Response:
    message = "適当に" # ユーザーからのメッセージ
    lat = 33.37311371162849 # 緯度
    lng = 130.2056181065671 # 経度

    # 店舗情報を提供するかどうかを判断
    provide_store_info = should_provide_store_info(message) # True or False
 
    # 店舗情報を提供する場合(True)
    if provide_store_info:
        # 1.キーワードを取得
        keyword = extract_keywords(message)

        # 2.位置情報とキーワードをもとに店舗名を取得
        store_name = find_places(keyword, f"{lat},{lng}")

        # 3.店舗名をもとにAPIからURLを取得
        store_url = get_store_url_by_name(store_name)

        # 4.店舗URLをもとに店舗情報を取得
        store_info = scrape_and_convert(store_url, "output.md")

        # 5.店舗情報をもとに解答を生成
        answer = answer_question_based_on_markdown(store_info, message)

        # 店舗情報を返す
        return https_fn.Response(answer)
    else:
        return answer_question_when_faulse(message)



    # return https_fn.Response("Hello world!")
    return "生成された解答内容をstringで，店舗の位置も含めて返す"

