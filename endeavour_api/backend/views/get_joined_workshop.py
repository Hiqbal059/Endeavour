import json
import random
from rest_framework import status

from rest_framework.response import Response
from rest_framework.views import APIView
from backend.models import Workshop, User, Join
from backend.serializers import WorkshopSerializer

class GetJoinedWorkshops(APIView):
    
    def post(self, request, **kwargs):

        username = request.data["username"]
        user = User.objects.get(username=username)
        workshops = []
        result = Join.objects.filter(user=user)
        for i in result:
            workshops.append(i.workshop.id)
            
        result = Workshop.objects.filter(id__in=workshops)
        result = WorkshopSerializer(result, many=True)

        return Response({"result": result.data}, status=status.HTTP_200_OK)

    def delete(self, request, **kwargs):

        username = request.data["username"]
        wid = request.data["id"]
        user = User.objects.get(username=username)
        workshop = Workshop.objects.get(id=wid)


        result = Join.objects.get(user=user, workshop=workshop)
        result.delete()
        
        return Response({"result": "Removed Workshop"}, status=status.HTTP_200_OK)    