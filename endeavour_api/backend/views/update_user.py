import json
from rest_framework.response import Response
from rest_framework.views import APIView
from django_email_verification import send_email
from backend.models import User
from backend.serializers import UserSerializer
from rest_framework import generics, permissions, status, views

class UpdateUser(APIView):
    def post(self, request, *args, **kwargs):
        message, is_valid = self.update(data=request.data)
        if is_valid:
            return Response(message)
        return Response(message)
    
    def update(self, data):
        
        username = data.get("username", None)
       
        
        if not username:
            return ({"error": "Please enter a user name"}), False
        
        
        if User.objects.filter(username=username).exists():
            user = User.objects.get(username=username)
            password = data.get("password", user.password)

            user.first_name=data["first_name"]
            user.last_name=data["last_name"]
            user.phone=data["phone"]
            user.linkedin_link=data["linkedin_link"]
            user.bio=data["bio"]
            user.designation=data["designation"]
            user.city=data["city"]
            user.projects=data["projects"]
            user.photo = data.get("photo", "")
            user.password = password

            
            user = user.save()
            return ({"message": "profile updated"}), True
        
        return ({"error": "user does not exist"}), False