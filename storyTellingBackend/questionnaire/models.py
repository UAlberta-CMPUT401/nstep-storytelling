from django.db import models
import uuid
from django.utils import timezone 

class Question(models.Model):
    id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
    content = models.CharField(max_length=1000,null=True)

class Answer(models.Model):
    class ContentType(models.TextChoices):
        TEXT='TEXT'
        VOICE='VOICE'
        VIDEO='VIDEO'

    id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
    content = models.CharField(max_length=1000)
    content_type = models.CharField(max_length=20,choices=ContentType.choices , default=ContentType.TEXT)
    question = models.ForeignKey(Question, on_delete=models.CASCADE,null=True)

class Questionnaire(models.Model):
    id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
    questions = models.ManyToManyField(Question)
    title = models.CharField(max_length=200,null=True)
    description = models.CharField(max_length=1000,null=True)

class AnswerList(models.Model):
    id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
    answers = models.ManyToManyField(Answer)
    questionnaire = models.ForeignKey(Questionnaire, on_delete=models.CASCADE,null=True)
    time = models.DateTimeField(default=timezone.now)

