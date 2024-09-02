from firebase_functions import https_fn
from firebase_admin import initialize_app
from firebase_functions import options

from app.lib.gpt_test import gpt_test

initialize_app()

options.set_global_options(region=options.SupportedRegion.ASIA_NORTHEAST1)

@https_fn.on_request()
def test(req: https_fn.Request) -> https_fn.Response:
    print(req)
    message = req.data["message"]
    sendMessages = req.data["sendMessages"]
    lat = req.data["lat"]
    lng = req.data["lng"]
    response = gpt_test(message)
    return response
