from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Questionnaire,Answer,Question
from .serializers import *
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Program, Questionnaire, Question, Answer
from django.http import Http404


@api_view(['GET', 'POST'])
def questionnaire_list(request, format=None):
    """
    List all code questionnaires, or create a new questionnaire.
    """
    if request.method == 'GET':
        questionnaires = Questionnaire.objects.all()
        serializer = QuestionnaireSerializer(questionnaires, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = QuestionnaireSerializer(data=request.data)
        if serializer.is_valid():
            result = serializer.save()
            return Response(result, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET', 'PUT', 'DELETE'])
def questionnaire_detail(request, pk, format=None):
    """
    Retrieve, update or delete a code questionnaire.
    """
    try:
        questionnaire = Questionnaire.objects.get(pk=pk)
        print(questionnaire)

    except Questionnaire.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = QuestionnaireSerializer(questionnaire)
        return Response(serializer.data)
    elif request.method == 'PUT':
        question_id_list = request.data['question']
        try:
            for one_id in question_id_list:
                question = Question.objects.get(pk=one_id)
        except Question.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            for one_id in question_id_list:
                questionnaire.questions.add(one_id)
        except Exception as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)

        
        questionnaire = Questionnaire.objects.get(pk=pk)
        response = {
            "status": 0,
            "message": "questionnaire updated"
            }
        return Response(response,status=status.HTTP_201_CREATED)

    elif request.method == 'DELETE':
        questionnaire.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class Questions(APIView):
    '''
    List of all the questions available
    '''
    def get(self, request, format=None):
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        response = {'total': len(serializer.data),
                    'questions': serializer.data,
                    }

        return Response(response)

    def post(self, request, format=None):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            result = serializer.save()
            response = {
                        "status": 0,
                        "message": "question created",
                        "id": result.id,
                        }
            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class QuestionDetail(APIView):
    def get_object(self, pk):
        try:
            return Question.objects.get(pk=pk)
        except Question.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        question = self.get_object(pk)
        serializer = QuestionSerializer(question)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        question = self.get_object(pk)
        serializer = QuestionSerializer(question, data=request.data)

        if serializer.is_valid():
            serializer.save()
            response = {
                        "status": 0,
                        "message": "question updated"
                        }
            return Response(response)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        question = self.get_object(pk)

        serializer = QuestionSerializer(question, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response = {
                        "status": 0,
                        "message": "question modified"
                        }
            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk, format=None):
        question = self.get_object(pk)
        question.delete()
        response = {
            "status": 0,
            "message": "question deleted"
            }
        return Response(response)

class Feedbacks(APIView):
    """
    List all feedbacks, or create a new feedback.
    """
    def get(self, request,pk, format=None):
        # pk = self.kwargs['pk']
        # question = Question.objects.filter(pk=pk)         
        answers = Answer.objects.filter(question = pk)

        serializer = AnswerInListSerializer(answers, many=True)
        response = serializer.data
        return Response(response)

    def post(self, request,pk):
        question = Question.objects.filter(pk=pk)  
        request.data['question'] = question
        if request.data['content_type'].lower() == "text":
            result,condition = self.post_text(request.data)
        elif request.data['content_type'].lower() == "voice":
            self.post_voice(request.data)
        elif request.data['content_type'].lower() == "video":
            self.post_video(request.data)

        if condition:
            response = {
            "status": 0,
            "message": "added",
            "id": result.id
            }
            return Response(response, status=status.HTTP_201_CREATED)
        return Response(result.errors, status=status.HTTP_400_BAD_REQUEST)

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

class ProgramList(APIView):
    '''
    List of all the programs available
    '''
    def get(self, request, format=None):
        program = Program.objects.all()
        serializer = ProgramSerializer(program, many=True)
        response = {'total': len(serializer.data),
                    'programs': serializer.data,
                    }

        return Response(response)

    def post(self, request, format=None):
        serializer = ProgramSerializer(data=request.data)
        if serializer.is_valid():
            result = serializer.save()
            response = {
                        "status": 0,
                        "message": "program created",
                        "id": result.id,
                        }
            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProgramDetail(APIView):
    def get_object(self, pk):
        try:
            return Program.objects.get(pk=pk)
        except Program.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        program = self.get_object(pk)
        serializer = ProgramSerializer(program)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        program = self.get_object(pk)
        serializer = ProgramSerializer(program, data=request.data)

        if serializer.is_valid():
            serializer.save()
            response = {
                        "status": 0,
                        "message": "program updated"
                        }
            return Response(response)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        program = self.get_object(pk)

        serializer = ProgramSerializer(program, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response = {
                        "status": 0,
                        "message": "program modified"
                        }
            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk, format=None):
        program = self.get_object(pk)
        program.delete()
        response = {
            "status": 0,
            "message": "program deleted"
            }
        return Response(response)
