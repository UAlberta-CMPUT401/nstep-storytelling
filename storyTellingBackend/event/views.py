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
                        "message": "Event created",
                        "id": result.id,
                        }
            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class EventDetail(APIView):
    """
    Retrieve, update or delete a Event instance.
    """
    def get_object(self, pk):
        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        Event = self.get_object(pk)
        serializer = EventAddingSerializer(Event)
        return Response(serializer.data)


    def put(self, request, pk, format=None):
        Event = self.get_object(pk)
        serializer = EventAddingSerializer(Event, data=request.data)

        if serializer.is_valid():
            serializer.save()
            response = {
                        "status": 0,
                        "message": "Event updated"
                        }
            return Response(response)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        Event = self.get_object(pk)

        serializer = EventAddingSerializer(Event, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response = {
                        "status": 0,
                        "message": "Event modified"
                        }
            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk, format=None):
        Event = self.get_object(pk)
        Event.delete()
        response = {
            "status": 0,
            "message": "Event deleted"
            }
        return Response(response)
