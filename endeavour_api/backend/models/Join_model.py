from django.db import models
from backend.models import User, Workshop

class Join(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE)
    payment_status = models.BooleanField(default=False) 

    def __str__(self):
        return self.workshop.title + "   -/-  " + self.user.username
    
    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)