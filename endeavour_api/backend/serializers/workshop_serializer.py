from rest_framework import serializers
from backend.models import Workshop, Join

class WorkshopSerializer(serializers.ModelSerializer):
    mentor_name = serializers.CharField(source="mentor.first_name", read_only=True)
    mentor_email = serializers.CharField(source="mentor.email", read_only=True)
    mentor_bio = serializers.CharField(source="mentor.bio", read_only=True)
    mentor_projects = serializers.CharField(source="mentor.projects", read_only=True)
    mentor_date = serializers.CharField(source="mentor.joining_date", read_only=True)
    joiners = serializers.SerializerMethodField('get_joiners')
    mentor_picture = serializers.CharField(source="mentor.photo", read_only=True)
    mentor_username = serializers.CharField(source="mentor.username", read_only=True)

    class Meta:
       model = Workshop
       fields = ("id", "title", "about", "description", "charges", "date", "status", "mentor_name", "mentor_email", "mentor_bio", "mentor_projects", "mentor_date", "joiners", "picture", "mentor_picture", "mentor_username")

    def get_joiners(self, obj):
        value = Join.objects.filter(workshop=obj).count()
        return value