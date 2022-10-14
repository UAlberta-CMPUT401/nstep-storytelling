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