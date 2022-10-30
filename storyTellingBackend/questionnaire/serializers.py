from rest_framework import serializers
from questionnaire.models import *

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['content',"content_type",'question']


class AddingQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['content']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"

class AnswerInListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['content','description',"content_type"]

# class ProgramSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Program
#         fields = ['name','date','description']



class AddingQuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = ["title","description"]

class QuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = "__all__"