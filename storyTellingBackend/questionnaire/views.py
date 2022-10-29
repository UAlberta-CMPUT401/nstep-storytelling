from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Questionnaire,Answer,Question
from .serializers import *
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import *
from django.http import Http404

from rest_framework import generics
from rest_framework.permissions import *

class Questionnaire_list(generics.ListCreateAPIView):
    queryset = Questionnaire.objects.all()
    serializer_class = AddingQuestionnaireSerializer
    # permission_classes = [IsAdminUser]

    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        serializer = QuestionnaireSerializer(queryset, many=True)
        return Response(serializer.data)


class Questionnaire_detail(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Questionnaire.objects.all()
    lookup_field = 'pk'
    serializer_class = QuestionnaireSerializer

class Questions(APIView):
    '''
    List of all the questions available
    '''
    def get(self, request, pk, format=None):
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        response = {'total': len(serializer.data),
                    'questions': serializer.data,
                    }

        return Response(response)

    def post(self, request, pk, format=None):
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

class QuestionDetail(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Question.objects.all()
    lookup_field = 'id'
    lookup_url_kwarg = "pk2"
    serializer_class = QuestionSerializer

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

# class ProgramList(APIView):
#     '''
#     List of all the programs available
#     '''
#     def get(self, request, format=None):
#         program = Program.objects.all()
#         serializer = ProgramSerializer(program, many=True)
#         response = {'total': len(serializer.data),
#                     'programs': serializer.data,
#                     }

#         return Response(response)

#     def post(self, request, format=None):
#         serializer = ProgramSerializer(data=request.data)
#         if serializer.is_valid():
#             result = serializer.save()
#             response = {
#                         "status": 0,
#                         "message": "program created",
#                         "id": result.id,
#                         }
#             return Response(response)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class ProgramDetail(APIView):
#     def get_object(self, pk):
#         try:
#             return Program.objects.get(pk=pk)
#         except Program.DoesNotExist:
#             raise Http404

#     def get(self, request, pk, format=None):
#         program = self.get_object(pk)
#         serializer = ProgramSerializer(program)
#         return Response(serializer.data)

#     def put(self, request, pk, format=None):
#         program = self.get_object(pk)
#         serializer = ProgramSerializer(program, data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             response = {
#                         "status": 0,
#                         "message": "program updated"
#                         }
#             return Response(response)
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def patch(self, request, pk, format=None):
#         program = self.get_object(pk)

#         serializer = ProgramSerializer(program, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             response = {
#                         "status": 0,
#                         "message": "program modified"
#                         }
#             return Response(response)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#     def delete(self, request, pk, format=None):
#         program = self.get_object(pk)
#         program.delete()
#         response = {
#             "status": 0,
#             "message": "program deleted"
#             }
#         return Response(response)
