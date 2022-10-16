from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import Questionnaire, Question, Answer
from .serializers import QuestionnaireSerializer, AnswerInListSerializer, AddAnswerSerializer

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