from django.contrib import admin
from backend.models import User, Idea, Workshop, Message, Join, Favorite

admin.site.register(User)
admin.site.register(Idea)
admin.site.register(Workshop)
admin.site.register(Message)
admin.site.register(Join)
admin.site.register(Favorite)
# Register your models here.
