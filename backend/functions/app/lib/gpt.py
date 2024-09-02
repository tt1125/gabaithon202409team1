import os
from openai import AzureOpenAI

from dotenv import load_dotenv

load_dotenv()

client = AzureOpenAI(
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version="2024-02-01",
)

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "メッセージに対して返答して"},
        {"role": "system", "content": "知らないことは「知らない」と回答して"},
        {"role": "user", "content": "鶴盛士という人物について簡潔に解説して"},
    ],
)

print(response.choices[0].message.content)
    