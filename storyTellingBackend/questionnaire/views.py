from django.shortcuts import render

from questionnaire.models import *
from questionnaire.serializers import *
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
    
class QuestionnaireDetail(APIView):
    """
    Retrieve, update or delete a questionnaire instance.
    """
    def get_object(self, pk):
        try:
            return Questionnaire.objects.get(pk=pk)
        except Questionnaire.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        questionnaire = self.get_object(pk)
        serializer = QuestionnaireSerializer(questionnaire)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = QuestionnaireSerializer(data=request.data)
        if serializer.is_valid():
            result = serializer.save()
            response = {
                        "status": 0,
                        "message": "New questionnaire added",
                        "id": result.id
                        }
            return Response(response, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Feedbacks(APIView):
    """
    List all feedbacks, or create a new feedback.
    """
    def get(self, request, format=None):
        # pk = self.kwargs['pk']
        # question = Question.objects.filter(pk=pk)         
        answers = Answer.objects.all()

        serializer = AnswerInListSerializer(answers, many=True)
        response = serializer.data
        return Response(response)

    def post(self, request):
        pk = self.kwargs['pk']
        question = Question.objects.filter(pk=pk)  
        request.data['question'] = question

        if request.data['content_type'] == "text":
            self.post_text(request.data)
        elif request.data['content_type'] == "voice":
            self.post_voice(request.data)
        elif request.data['content_type'] == "video":
            self.post_video(request.data)

    def post_text(self, data):       
        serializer = AddAnswerSerializer(data=data)
        if serializer.is_valid():
            result = serializer.save()
            response = {
                        "status": 0,
                        "message": "added",
                        "id": result.id
                        }
            return Response(response, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post_voice(self, data):       
        pass

    def post_video(self, data):       
        pass
