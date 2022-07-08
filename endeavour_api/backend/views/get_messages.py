from ast import ExtSlice
from email import message
import json
import random
from re import I
from rest_framework.response import Response
from rest_framework.views import APIView
from backend.models import User, Message
from backend.serializers import MessageSerializer

class GetMessage(APIView):
    
    def post(self, request):
        
        isAuthenticated = request.data.get("isAuthenticated", False)
        username = request.data.get("username", None)
        
        if not isAuthenticated:
            return Response({"error": "User is not authenticated"})
        if not username:
            return Response({"error", "Enter username"})
        try:
            user = User.objects.get(username=username)
            # import pdb
            # pdb.set_trace()
            if request.data["role"] == "entrepreneur":
                messages = Message.objects.filter(post__creator=user, parent=None).order_by('time')
            else:
                messages = Message.objects.filter(sender=user, parent=None).order_by('time')  
            
            all_messages = MessageSerializer(messages, many=True)
           
            return Response({"result": all_messages.data})
        except:
            return Response({"alert": "No result found"})

    def get(self, request, **kwargs):
        id = kwargs.get("id")
        i = Message.objects.first()
        print(i.id)
        data = Message.objects.get(id=id)
        result = MessageSerializer(data)
        return Response({"result": result.data})

