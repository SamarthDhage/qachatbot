import google.generativeai as genai
from django.conf import settings


genai.configure(api_key=settings.GOOGLE_API_KEY)


chat = genai.GenerativeModel("gemini-pro").start_chat(history=[])

def get_gemini_response(question):
    response = chat.send_message(question, stream=True)
    return [chunk.text for chunk in response]
