import json
import random
from requests import request
from rest_framework.response import Response
from rest_framework.views import APIView
from backend.models import Idea, User, Workshop

class CreateWorkshop(APIView):
    
    def post(self, request):
        
        username = request.data.get("username", None)
        
        if not username:
            return Response({"error": "Provide a username"})
        
        if not User.objects.filter(username=username).exists():
            return Response({"error": "Provide a valid username"})
        if request.data["title"] is '' or len(request.data["title"])<1:
            return Response({"error": "Provide a valid data"})
        if request.data["description"] is '' or len(request.data["description"])<1:
            return Response({"error": "Provide a valid data"})
        result, is_valid = self.create(request.data)
        return Response({"message": "Workshop has been created"})
        
        
    def create(self, data):
        title = data.get("title", "")
        description = data.get("description", "")
        about = data.get("about", "")
        charges = data.get("charges", 0)
        date = data.get("date", "")
        status = data.get("status", "active")
        mentor = User.objects.get(username=data["username"])
        picture = data.get("image", "")
        
        workshop = Workshop.objects.create(title=title,
                            description=description,
                            about=about,
                            charges=charges,
                            date=date,
                            mentor=mentor,
                            picture=picture,
                            status=status,)
        
        workshop = workshop.save()
        return workshop, True
    
    def delete(self, request):
        
        workshop_id = request.data.get("id", None)
        
        if not workshop_id:
            return Response({"error": "provide an id"})
        try:
            workshop = Workshop.objects.get(id=workshop_id)
            workshop.delete()
        except:
            return Response({"error": "No idea exist with given id"})
        
        return Response({"result": "Idea deleted successfully"})