from event.models import *
from event.serializers import *
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics

# Create your views here.

class EventList(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventAddingSerializer
    # permission_classes = [IsAdminUser]

    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        serializer = EventSerializer(queryset, many=True)
        return Response(serializer.data)

# class EventDetail(APIView):
#     """
#     Retrieve, update or delete a Event instance.
#     """
#     def get_object(self, pk):
#         try:
#             return Event.objects.get(pk=pk)
#         except Event.DoesNotExist:
#             raise Http404

#     def get(self, request, pk, format=None):
#         Event = self.get_object(pk)
#         serializer = EventAddingSerializer(Event)
#         return Response(serializer.data)


#     def put(self, request, pk, format=None):
#         Event = self.get_object(pk)
#         serializer = EventAddingSerializer(Event, data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             response = {
#                         "status": 0,
#                         "message": "Event updated"
#                         }
#             return Response(response)
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def patch(self, request, pk, format=None):
#         Event = self.get_object(pk)

#         serializer = EventAddingSerializer(Event, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             response = {
#                         "status": 0,
#                         "message": "Event modified"
#                         }
#             return Response(response)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#     def delete(self, request, pk, format=None):
#         Event = self.get_object(pk)
#         Event.delete()
#         response = {
#             "status": 0,
#             "message": "Event deleted"
#             }
#         return Response(response)
