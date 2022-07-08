from rest_framework import serializers
from backend.models import Message, Idea
from .single_message_serialize import SingleMessageSerializer

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.CharField(source='sender.username', read_only=True)
    post = serializers.CharField(source='post.id', read_only=True)
    replies = serializers.SerializerMethodField('get_replies')
    post_name = serializers.CharField(source='post.title', read_only=True)

    class Meta:
       model = Message
       fields = ('sender',"content", "post", "replies", "time", "senders_id", "post_name", "id")

    def get_replies(self, obj):
        value = Message.objects.filter(parent=obj).order_by('time')
        result = SingleMessageSerializer(value, many=True)
        return result.data