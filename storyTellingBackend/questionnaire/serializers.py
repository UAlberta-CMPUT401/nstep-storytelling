from rest_framework import serializers
from questionnaire.models import *

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id','name','description']


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['name','description','answers']


class QuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = ['questions']

class AnswerInListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['name','description',"content_type"]


class AddAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['name','description',"content_type",'question']


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = ['name','date','description']
