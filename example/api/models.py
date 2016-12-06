from django.db import models
import logging
from django.db.models.signals import post_save



logger = logging.getLogger(__name__)

from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    followers = models.ManyToManyField('self', related_name='followees', symmetrical=False)
    
class Entry(models.Model):
    user = models.CharField(max_length=255)
    class_num = models.CharField(max_length=255)
    question = models.CharField(max_length=255)
    created_time = models.DateTimeField(auto_now=True)
    active = models.BooleanField()

def save_handler(sender, instance, created, **kwargs):
	if created:
		logger.debug('USER:' + str(instance.user) +', CLASS:'+str(instance.class_num)+', TIME:' + str(instance.created_time))


post_save.connect(save_handler, sender=Entry)


