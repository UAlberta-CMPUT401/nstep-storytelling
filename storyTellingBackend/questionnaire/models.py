from django.db import models
import uuid

# Create your models here.
class Answer(models.Model):
    id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
    name = models.CharField(max_length=200)
    description = models.TextField(max_length=1000)
    url = models.CharField(max_length=200,default='',blank=True,null=True)
    
    # author = models.ForeignKey(User, on_delete=models.CASCADE)

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


