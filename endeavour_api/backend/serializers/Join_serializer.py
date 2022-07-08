from rest_framework import serializers
from backend.models import Join

class UserSerializer(serializers.ModelSerializer):
    class Meta:
       model = Join
       fields = "__all__"