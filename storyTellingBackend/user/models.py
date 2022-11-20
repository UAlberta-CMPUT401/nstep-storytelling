from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.conf import settings
from rest_framework.authtoken.models import Token

import uuid

# Create your models here.
class User(AbstractUser):
    id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
    username = models.CharField(max_length=30, blank=False,unique=True)
    email = models.EmailField(max_length=254, blank=True, null = True)



@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def created_auth_token(sender, instance=None, created=False, **kwargs):
    # Create Token whenever a user is created
    if created:
        Token.objects.create(user=instance)
        
        
