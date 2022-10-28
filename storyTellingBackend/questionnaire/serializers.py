from rest_framework import serializers
from questionnaire.models import *

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['name','description',"content_type",'question']


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['name','description']


class QuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = ['questions']

class AnswerInListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['name','description',"content_type"]

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = ['name','date','description']
