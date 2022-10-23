from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import Program, Questionnaire, Question, Answer
from .serializers import ProgramSerializer, QuestionnaireSerializer, AnswerInListSerializer, AddAnswerSerializer
from django.http import Http404

@api_view(['GET', 'POST'])
def questionnaire_list(request, format=None):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        snippets = Questionnaire.objects.all()
        serializer = QuestionnaireSerializer(snippets, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = QuestionnaireSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET', 'PUT', 'DELETE'])
def questionnaire_detail(request, pk, format=None):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        snippet = Questionnaire.objects.get(pk=pk)
    except Questionnaire.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = QuestionnaireSerializer(snippet)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = QuestionnaireSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class Feedbacks(APIView):
    """
    List all feedbacks, or create a new feedback.
    """
    def get(self, request,pk, format=None):
        # pk = self.kwargs['pk']
        # question = Question.objects.filter(pk=pk)         
        answers = Answer.objects.all()

        serializer = AnswerInListSerializer(answers, many=True)
        response = serializer.data
        return Response(response)

    def post(self, request,pk):
        question = Question.objects.filter(pk=pk)  
        request.data['question'] = pk

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
        serializer = AddAnswerSerializer(data=data)
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

    def post(self, request, pk, format=None):
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
