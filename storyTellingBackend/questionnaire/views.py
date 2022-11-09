from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from rest_framework.views import APIView
from .models import *
from django.forms.models import model_to_dict
import json
from django.core import serializers

from rest_framework import generics
from rest_framework.permissions import *
    

class Questionnaire_list(generics.ListCreateAPIView):
    queryset = Questionnaire.objects.all()
    serializer_class = AddingQuestionnaireSerializer
    permission_classes = [AllowAny]

    def list(self, request):

        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        serializer = QuestionnaireSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = serializer.save()
        questionnaireData = QuestionnaireSerializer(result).data

        return Response(questionnaireData, status=status.HTTP_201_CREATED)

class Questionnaire_detail(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Questionnaire.objects.all()
    lookup_field = 'pk'
    serializer_class = QuestionnaireSerializer
    permission_classes = [IsAuthenticated]

class Questions(generics.GenericAPIView):
    '''
    List of all the questions available
    '''

    permission_classes = [AllowAny]

    def get(self, request, pk, format=None):
        questionnaire = Questionnaire.objects.get(id=pk)
        questions = Question.objects.all()
        questionData = QuestionSerializer(questions, many=True).data
        questionnaireData = QuestionnaireSerializer(questionnaire).data
        myQuestions = []
        comparedList = [str(questionnaireData['questions'][i]) for i in range(len(questionnaireData['questions']))]

        for element in questionData:
     
            if element['id'] in comparedList:
                myQuestions.append(element['id'])
                
        response = {'total': len(myQuestions),
                    'questions': myQuestions,
                    }

        return Response(response)

    def post(self, request, pk, format=None):
        serializer = AddingQuestionSerializer(data=request.data)
        if serializer.is_valid():
            result = serializer.save()
            response = {
                        "status": 0,
                        "message": "question created",
                        "id": result.id,
                        }
            questionnaire = Questionnaire.objects.get(id=pk)
            questionnaire.questions.add(result)

            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class QuestionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    lookup_field = 'id'
    lookup_url_kwarg = "pk2"
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]


class Feedbacks(generics.GenericAPIView):
    """
    List all feedbacks, or create a new feedback.
    """
    permission_classes = [AllowAny]

    def get(self, request,pk, format=None):        
        answers = AnswerList.objects.filter(questionnaire = pk)
        serializer = AnswerListSerializer(answers, many=True)
        response = serializer.data
        return Response(response)

    def post(self, request,pk):

        questionnaire = Questionnaire.objects.get(pk=pk)  
        qnData = {"questionnaire": questionnaire.id}

        answerListSerializer = AddingAnswerListSerializer(data = qnData)
        if answerListSerializer.is_valid():
            ansList = answerListSerializer.save()

        requestData = request.data
        for key in requestData.keys():
            temp = requestData[key]
            temp['question'] = key
            ansSerializer = AnswerSerializer(data =temp)
            if ansSerializer.is_valid():
                ans = ansSerializer.save()
            ansList.answers.add(ans)

        anss = AnswerList.objects.get(pk=ansList.id)  
        serializer = AnswerListSerializer(anss)

        response = {
        "status": 0,
        "message": "added",
        "answer_list": serializer.data,
        }
        return Response(response, status=status.HTTP_201_CREATED)
        # return Response({"undifined error":"error"}, status=status.HTTP_400_BAD_REQUEST)

    def post_text(self, data):       

        serializer = AnswerSerializer(data=data)
        if serializer.is_valid():
            result = serializer.save()

            return result,True
        return serializer,False

    def post_voice(self, data):       
        pass

    def post_video(self, data):       
        pass
