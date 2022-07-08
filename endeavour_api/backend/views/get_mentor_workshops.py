import json
import random
from rest_framework import status

from rest_framework.response import Response
from rest_framework.views import APIView
from backend.models import Workshop, User
from backend.serializers import WorkshopSerializer

class GetMentorWorkshops(APIView):
    
    def post(self, request, **kwargs):

        username = request.data["username"]
        user = User.objects.get(username=username)

        result = Workshop.objects.filter(mentor=user)
        result = WorkshopSerializer(result, many=True)
        return Response({"result": result.data}, status=status.HTTP_200_OK)