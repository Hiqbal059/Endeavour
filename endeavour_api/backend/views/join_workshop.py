import json
from rest_framework.response import Response
from rest_framework.views import APIView
from django_email_verification import send_email
from backend.models import User, Workshop, Join
from backend.serializers import UserSerializer
from rest_framework import generics, permissions, status, views

class JoinWorkshop(APIView):

    def post(self, request):
        username = request.data["username"]
        workshop = request.data["id"]

        user = User.objects.get(username=username)
        workshop = Workshop.objects.get(id=workshop)

        try: 
            if not Join.objects.filter(user=user, workshop=workshop).exists():
                result = Join.objects.create(user=user, workshop=workshop)
                result.save()
                return Response({"result": "You have joined Workshop"})
            else:
                return Response({"error": "You have already joined this Workshop"}) 

        except:
            return Response({"error": "Already joined"})    


        
