from django.db import models
import uuid
from user.models import User

class Question(models.Model):
    id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
    name = models.CharField(max_length=200)
    description = models.TextField(max_length=1000)
    url = models.CharField(max_length=200,default='',blank=True,null=True)

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
    question = models.ForeignKey(Question, on_delete=models.CASCADE,null=True)
    content_type = models.CharField(max_length=20,choices=ContentType.choices , default=ContentType.TEXT)

class Questionnaire(models.Model):
    id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
    questions = models.ManyToManyField(Question)
    url = models.CharField(max_length=200,default='',blank=True,null=True)



class Program(models.Model):
    id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
    name = models.CharField(max_length=200)
    date = models.CharField(max_length=200)
    description = models.TextField(max_length=1000)
