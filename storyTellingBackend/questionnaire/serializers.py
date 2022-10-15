from rest_framework import serializers
from questionnaire.models import *

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id','name','description','url']


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id','name','description','url','answers']


class QuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = ['id','questions','url']

class AnswerInListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['name','description','url',"content_type"]


class AddAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['name','description',"content_type",'question']
