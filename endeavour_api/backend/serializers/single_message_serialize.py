from email import message
from rest_framework import serializers
from backend.models import Message, Idea

class SingleMessageSerializer(serializers.ModelSerializer):
    message = serializers.CharField(source="content", read_only=True)
    senderName = serializers.CharField(source="sender", read_only=True)
    class Meta:
       model = Message
       fields = ("message", "id", "senderName")