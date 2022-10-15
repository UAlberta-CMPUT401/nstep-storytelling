from django.db import models
import uuid
from user.models import User

# Create your models here.
class Answer(models.Model):
    class ContentType(models.TextChoices):
        TEXT='TEXT'
        VOICE='VOICE'
        VIDEO='VIDEO'
        
    id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
    name = models.CharField(max_length=200)
    description = models.TextField(max_length=1000)
    url = models.CharField(max_length=200,default='',blank=True,null=True)    
    author = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    content_type = models.CharField(max_length=20,choices=ContentType.choices , default=ContentType.TEXT)

class Question(models.Model):
    id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
    name = models.CharField(max_length=200)
    description = models.TextField(max_length=1000)
    url = models.CharField(max_length=200,default='',blank=True,null=True)
    answers = models.ManyToManyField(Answer)


class Questionnaire(models.Model):
    id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
    questions = models.ManyToManyField(Question)
    url = models.CharField(max_length=200,default='',blank=True,null=True)


