from django.db.models import fields
from rest_framework import serializers
from questionnaire.models import *

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id','name','description','url']


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id','name','description','url','answers']


class QuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id','questions','url']