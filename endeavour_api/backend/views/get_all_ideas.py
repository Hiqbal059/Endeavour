import json
import random
from rest_framework import status

from rest_framework.response import Response
from rest_framework.views import APIView
from backend.models import Idea
from backend.serializers import IdeaSerializer

class GetAllIdeas(APIView):
    
    def post(self, request):
        
        authenticated = request.data.get("isAuthenticated", False)
        idea_type = request.data.get("status", None)
        username = request.data.get("username", 'sample')
        mentor = request.data.get("mentor", False)
        if not authenticated:
            return Response({"alert": "youre not allowed to open this page"})
        
        if mentor:
            all_ideas = Idea.objects.filter(status='pending')
        else:
            if idea_type == 'active':
                all_ideas = Idea.objects.filter(status='active')
            elif idea_type == 'pending':
                all_ideas = Idea.objects.filter(status='pending', creator__username=username)
            elif idea_type == 'rejected':
                all_ideas = Idea.objects.filter(status='rejected', creator__username=username)
            else:
                all_ideas = Idea.objects.filter(creator__username=username)
        
        result = IdeaSerializer(all_ideas, many=True)
        return Response({"result": result.data}, status=status.HTTP_200_OK)
    
    def get(self, request, **kwargs):
        id = kwargs.get("id")
       
        result = Idea.objects.get(id=id)
        result = IdeaSerializer(result)
        return Response({"result": result.data}, status=status.HTTP_200_OK)


        
