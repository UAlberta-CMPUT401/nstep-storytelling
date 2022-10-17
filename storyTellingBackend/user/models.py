from django.db import models
from django.contrib.auth.models import AbstractUser

import uuid

# Create your models here.
class User(AbstractUser):
    id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
    username = models.CharField(max_length=30, blank=False,unique=True)
    email = models.EmailField(max_length=254, unique=True)
    profileImage = models.ImageField(blank = True, null = True) #default = 'user.jpg'