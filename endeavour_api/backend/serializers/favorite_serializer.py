from rest_framework import serializers
from backend.models import Favorite

class UserSerializer(serializers.ModelSerializer):
    class Meta:
       model = Favorite
       fields = "__all__"