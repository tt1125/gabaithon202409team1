import requests
import json

GOOGLE_API_KEY = "AIzaSyB_pbAH9btclPdynNTes1lHSQhmy5yugEM"

def find_places(query, location):
    endpoint = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?key={GOOGLE_API_KEY}&location={location}&radius=50000&type=restaurant&keyword={query}"
    response = requests.get(endpoint)
    result = response.json()
    
    # リストが空でないか確認
    if result['results']:
        name = result['results'][0]['name']
        return name
    else:
        return None  # または適切なデフォルト値やエラーメッセージを返す

result = find_places("レストラン", "3.373084793022144, 130.2055574316023")

if result:
    print(result)
else:
    print("No results found")