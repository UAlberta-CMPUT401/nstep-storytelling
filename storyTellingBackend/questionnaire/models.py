from re import T
from django.db import models
import uuid
from django.utils import timezone 
from simple_history.models import HistoricalRecords

class Question(models.Model):
    id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
    content = models.CharField(max_length=1000,null=True)
    allow_recording = models.BooleanField(default=False)
    history = HistoricalRecords()
    time = models.DateTimeField(default=timezone.now)
    class Meta:
        ordering = ["time"]

class Answer(models.Model):
    class ContentType(models.TextChoices):
        TEXT='TEXT'
        VOICE='VOICE'
        VIDEO='VIDEO'

    id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
    content = models.CharField(max_length=1000,null=True,blank=True)
    content_type = models.CharField(max_length=20,choices=ContentType.choices , default=ContentType.TEXT)
    question = models.ForeignKey(Question, on_delete=models.CASCADE,null=True)
    # set content_video to have a default value of null
    content_video = models.TextField(blank=True, null=True, max_length=999999999999)
    content_audio = models.TextField(blank=True, null=True, max_length=999999999999)
    history = HistoricalRecords()

class Questionnaire(models.Model):
    id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
    questions = models.ManyToManyField(Question)
    title = models.CharField(max_length=200,null=True)
    description = models.CharField(max_length=1000,null=True)
    history = HistoricalRecords()

class AnswerList(models.Model):
    id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
    answers = models.ManyToManyField(Answer)
    questionnaire = models.ForeignKey(Questionnaire, on_delete=models.CASCADE,null=True)
    time = models.DateTimeField(default=timezone.now)
    history = HistoricalRecords()

    class Meta:
        ordering = ["-time"]
