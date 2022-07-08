from django.db import models
from backend.models import User, Idea

class Favorite(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Idea, on_delete=models.CASCADE)
    favorite = models.BooleanField(default=False) 

    def __str__(self):
        return self.post.title + " / " + self.user.username
    
    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)