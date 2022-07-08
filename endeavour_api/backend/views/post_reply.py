import json
import random
from rest_framework.response import Response
from rest_framework.views import APIView
from backend.models import Idea, User, Message

class PostReply(APIView):
    
    def post(self, request):
        
        isAuthenticated = request.data.get("isAuthenticated", False)
        
        if not isAuthenticated:
            return Response({"error": "User is not authenticated"})
        
        result, is_valid = self.create(request.data)
        if is_valid:
            return Response({"message": "Message sent"})
        return Response({"error": result})
        
        
    def create(self, data):
        sender = data.get("sender", "")
        post = data.get("post", "")
        content = data.get("content", "")
        message_id = data.get("id", "")

        sender = User.objects.get(username=sender)
        post = Idea.objects.get(id=post)
        parent = Message.objects.get(id=message_id)
        message = Message.objects.create(sender=sender, post=post, content=content, parent=parent, senders_id=sender.id)
        message.save()
                
        return message, True

