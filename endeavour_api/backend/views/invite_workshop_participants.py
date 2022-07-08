import json
import random
from turtle import title
from rest_framework import status

from rest_framework.response import Response
from rest_framework.views import APIView
from backend.models import Workshop, User, Favorite, Idea, Join
from backend.serializers import WorkshopSerializer, IdeaSerializer
from backend.views import SendMail

class InviteParticipants(APIView):
    
    def post(self, request):

        username = request.data["username"]
        workshop = request.data["workshop"]
        link = request.data["link"]

        workshop = Workshop.objects.get(id=workshop)
        participants = []
        result = Join.objects.filter(workshop=workshop)
        for i in result:
            participants.append({"email": i.user.email, "user": i.user.first_name, "title": i.workshop.title, "mentor": i.workshop.mentor.first_name, "link": link})
        
        # import pdb
        # pdb.set_trace()
        for i in participants:
            SendMail.send_invite_to_participants(i)

        return Response({"result": "Invite has been sent to all participants"}, status=status.HTTP_200_OK)