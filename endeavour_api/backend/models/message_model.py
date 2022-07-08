from django.db import models
from backend.models import User, Idea

class Message(models.Model):
    
    senders_id = models.IntegerField(default=0, null=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Idea, on_delete=models.CASCADE)
    content = models.CharField(max_length=1000, null=True, blank=True)
    parent = models.ForeignKey('self', default=None, on_delete=models.CASCADE, null=True)
    time = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.post.title
    
