from django.db import models
import uuid
from user.models import User

# Create your models here.
class Event(models.Model):
    class type(models.TextChoices):
        LOG='LOG'
        EVENT='EVENT'

    id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
    title = models.CharField(max_length=200)
    content = models.CharField(max_length=1000)
    url = models.CharField(max_length=200,default='',blank=True,null=True)
    type = models.CharField(max_length=20,choices=type.choices , default=type.EVENT)
    author = models.ForeignKey(User, on_delete=models.CASCADE,default='unknown')
