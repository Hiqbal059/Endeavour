import json
import random
from rest_framework import status

from rest_framework.response import Response
from rest_framework.views import APIView
from backend.models import Workshop, User, Favorite, Idea
from backend.serializers import WorkshopSerializer, IdeaSerializer

class GetFavoriteIdeas(APIView):
    
    def post(self, request, **kwargs):

        username = request.data["username"]
        user = User.objects.get(username=username)
        ideas = []
        result = Favorite.objects.filter(user=user)
        for i in result:
            ideas.append(i.post.id)
            
        result = Idea.objects.filter(id__in=ideas)
        result = IdeaSerializer(result, many=True)

        return Response({"result": result.data}, status=status.HTTP_200_OK)

    def delete(self, request, **kwargs):

        username = request.data["username"]
        iid = request.data["id"]
        user = User.objects.get(username=username)
        idea = Idea.objects.get(id=iid)

        result = Favorite.objects.get(user=user, post=idea)
        result.delete()
        
        return Response({"result": "Removed Workshop"}, status=status.HTTP_200_OK)    