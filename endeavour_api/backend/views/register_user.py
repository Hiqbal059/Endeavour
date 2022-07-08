import json
import random
from rest_framework.response import Response
from rest_framework.views import APIView
from backend.models import User
from backend.serializers import UserSerializer
from .send_mail import SendMail

class RegisterUser(APIView):
    def post(self, request, *args, **kwargs):
        message, is_valid = self.create(data=request.data)
        if is_valid:
            user = UserSerializer(message)
            code = generate_verification_code(request.data["username"])
            data = {
                "user": request.data.get("first_name", "there"),
                "code": code,
                "email": request.data.get("email", "endeavour.ucp@gmail.com"),
            }
            SendMail.send_mail_to_agent(data)
            return Response({"message": "Account created succesfully, Please Check your Email and verify code"})
        return Response(message)
    
    def create(self, data):
        username = data.get("username", "")
        email = data.get("email", "")
        
        if User.objects.filter(username=username).exists():
              return ({"error": "username already exist"}), False
          
        if User.objects.filter(email=email).exists():
              return ({"error": "Email already registered, please try another"}), False
        
        if not username:
            return ({"error": "Please enter a user name"}), False
        
        if not email:
            return ({"error": "Please enter a email"}), False
        
        user = User.objects.create(
                            username=username,
                            email=email,)
        
        user = user.save()
        return user, True
    
def generate_verification_code(username):
    user = User.objects.get(username=username)
    verification_code = random.randint(111111, 999999)
    user.verification_code = verification_code
    user.save()
    
    return verification_code

    

    