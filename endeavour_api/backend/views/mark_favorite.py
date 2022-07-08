import json
from rest_framework.response import Response
from rest_framework.views import APIView
from django_email_verification import send_email
from backend.models import User, Workshop, Favorite, Idea
from backend.serializers import UserSerializer
from rest_framework import generics, permissions, status, views

class MarkFavorite(APIView):

    def post(self, request):
        username = request.data["username"]
        iid = request.data["id"]

        user = User.objects.get(username=username)
        idea = Idea.objects.get(id=iid)

        try:
            if not Favorite.objects.filter(user=user, post=idea).exists():
                result = Favorite.objects.create(user=user, post=idea)
                result.save()
                return Response({"result": "Idea added to favorite"})
            else:
                return Response({"error": "Already in favorite"}) 

        except:
            return Response({"error": "Already adde"})    


        
