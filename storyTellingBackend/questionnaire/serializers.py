from rest_framework import serializers
from questionnaire.models import *
import simple_history.models 

class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer
        fields = ['content',"content_type",'question', 'content_video', 'content_audio']


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

class AddingQuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = ["title","description"]

class QuestionnaireSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)
    class Meta:
        model = Questionnaire
        fields = "__all__"

class AddingAnswerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerList
        fields = ["questionnaire"]


class AnswerSerializerAllFields(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = "__all__"
        
class AnswerListSerializer(serializers.ModelSerializer):
    answers = AnswerSerializerAllFields(many=True)
    questionnaire = QuestionnaireSerializer()
    class Meta:
        model = AnswerList
        fields = "__all__"
        
        
