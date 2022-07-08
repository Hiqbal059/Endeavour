import json
import random
from rest_framework import status

from rest_framework.response import Response
from rest_framework.views import APIView
from backend.models import Workshop
from backend.serializers import WorkshopSerializer

class GetAllWorkshops(APIView):
    
    def get(self, request):        
        
        all_workshops = Workshop.objects.filter(status='active')
 
        result = WorkshopSerializer(all_workshops, many=True)
        return Response({"result": result.data}, status=status.HTTP_200_OK)
    
    def post(self, request, **kwargs):
        id = kwargs.get("id")

        result = Workshop.objects.get(id=id)
        result = WorkshopSerializer(result)
        return Response({"result": result.data}, status=status.HTTP_200_OK)