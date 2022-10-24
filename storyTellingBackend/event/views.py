from event.models import *
from event.serializers import *
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class EventList(APIView):
    """
    List all users, 
    """
    def get(self, request, format=None):
        users = Event.objects.all()
        serializer = EventAddingSerializer(users, many=True)
        response = {'total': len(serializer.data),
                    'events': serializer.data,
                    }

        return Response(response)
    
    def post(self, request, format=None):
        serializer = EventAddingSerializer(data=request.data)
        if serializer.is_valid():
            result = serializer.save()
            response = {
                        "status": 0,
                        "message": "User created",
                        "id": result.id,
                        }
            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
