from django.db import models
from django.contrib.auth.models import AbstractUser

import uuid

# Create your models here.
class User(AbstractUser):
    id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
    name = models.CharField(max_length=30, default="", blank=False)
    host = models.CharField(max_length=50)
    url = models.TextField(max_length=200,default='',blank=True,null=True)
    profileImage = models.ImageField(blank = True, null = True) #default = 'user.jpg'