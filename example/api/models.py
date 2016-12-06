from django.db import models

from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    followers = models.ManyToManyField('self', related_name='followees', symmetrical=False)
    
class Entry(models.Model):
    user = models.CharField(max_length=255)
    class_num = models.CharField(max_length=255)
    question = models.CharField(max_length=255)
    created_time = models.DateTimeField(auto_now=True)
    active = models.BooleanField()
