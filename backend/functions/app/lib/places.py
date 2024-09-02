import requests
import json

GOOGLE_API_KEY = "AIzaSyB_pbAH9btclPdynNTes1lHSQhmy5yugEM"

def find_places(query, location):
    endpoint = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?key={GOOGLE_API_KEY}&location={location}&radius=1500&type=restaurant&keyword={query}"
    response = requests.get(endpoint)
    return response.json()

result = find_places("人力うどん", "33.299939, 130.509972")

print(result['results'][0])

