from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Questionnaire
from .serializers import QuestionnaireSerializer

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
