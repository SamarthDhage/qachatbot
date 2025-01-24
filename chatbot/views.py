from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .utils import chat  


@csrf_exempt  
def chatbot(request):
    if request.method == "GET":
        return render(request, "chatbot/chat.html")

    elif request.method == "POST":
        user_message = request.POST.get("message")
        if not user_message:
            return JsonResponse({"error": "No message provided"}, status=400)

        try:
            response = chat.send_message(user_message, stream=False)
            gemini_response = response.text
            prettified_response = gemini_response.replace("\n","\n")

            return JsonResponse({"response": prettified_response})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
