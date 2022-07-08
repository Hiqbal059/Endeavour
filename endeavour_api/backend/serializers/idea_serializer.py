from rest_framework import serializers
from backend.models import Idea, Favorite

class IdeaSerializer(serializers.ModelSerializer):
    creator_name = serializers.CharField(source="creator.first_name", read_only=True)
    creator_email = serializers.CharField(source="creator.email", read_only=True)
    creator_linkedin = serializers.CharField(source="creator.linkedin_link", read_only=True)
    creator_bio = serializers.CharField(source="creator.bio", read_only=True)
    likes = serializers.SerializerMethodField('get_likes')
    creator_photo = serializers.CharField(source="creator.photo", read_only=True)
    
    class Meta:
       model = Idea
       fields = ("id", "title", "description", "category", "funds", "video", "documents", "start_date", "status", "likes", "approved_by", "creator_name", "creator_email", "creator_linkedin", "creator_bio", "photo", "creator_photo")

    def get_likes(self, obj):
        value = Favorite.objects.filter(post=obj).count()
        return value 