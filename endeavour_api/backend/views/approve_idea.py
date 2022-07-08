import json
import os

from rest_framework.response import Response
from backend.models import Idea, User
from rest_framework.views import APIView
from rest_framework import status
class ApprovePost(APIView):
    
    def post(self, request):
        
        post = request.data.get("post", None)
        username = request.data.get("username", None)
        approve = request.data.get("approve", False)
        try:
            idea = Idea.objects.get(id=post)
            approver = User.objects.get(username=username)
        except:
            return Response({"error": "data not found"})
        
        idea.approved_by = f"{approver.first_name} {approver.last_name}"
        if approve:
            idea.status = "active"
            idea.save()
            return Response({"message": "Idea has been Approved"})
        else:
            idea.status = "rejected"
            idea.save()
            return Response({"message": "Idea has been Rejected"})
        
        