from datetime import timedelta
from event.models import *
from event.serializers import *
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from user.models import HistoricalUser


# ---------------------------------------------------------------------------------------
# get all the data from SimpleHistoryAdmin
class UserHistoryList(generics.ListCreateAPIView): 
    queryset = HistoricalUser.objects.all()
    serializer_class = HistoricalUserSerializer
    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        serializer = HistoricalUserSerializer(queryset, many=True)
        return Response(serializer.data) 


# get 
# delete any log older than 60 days
# def delete_old_logs():
#     # get all logs
#     logs = LogEntry.objects.all()
#     # get all logs older than 60 days
#     logs = logs.filter(timestamp__lte=timezone.now() - timedelta(days=60))
#     # delete all logs
#     logs.delete()
    
# # Create your views here.
# class LogList(generics.ListCreateAPIView):
#     queryset = LogEntry.objects.all()
#     serializer_class = LogEntrySerializer
#     # permission_classes = [IsAdminUser]
#     delete_old_logs()
#     def list(self, request):
#         # Note the use of `get_queryset()` instead of `self.queryset`
#         queryset = self.get_queryset()
#         serializer = LogEntrySerializer(queryset, many=True)
#         return Response(serializer.data)
    
# class UserLogList(generics.ListCreateAPIView):
#     queryset = LogEntry.objects.all()
#     serializer_class = LogEntrySerializer
#     delete_old_logs()
#     def list(self, request, pk, format=None):
#         # Note the use of `get_queryset()` instead of `self.queryset`
#         queryset = self.get_queryset()
#         # filter queryset by pk
#         queryset = queryset.filter(actor=pk)
#         serializer = LogEntrySerializer(queryset, many=True)
#         return Response(serializer.data)
    
# class ObjectLogList(generics.ListCreateAPIView):
#     queryset = LogEntry.objects.all()
#     serializer_class = LogEntrySerializer
#     delete_old_logs()    
#     def list(self, request, pk, format=None):
#         # Note the use of `get_queryset()` instead of `self.queryset`
#         queryset = self.get_queryset()
#         # filter queryset by pk
#         queryset = queryset.filter(object_pk=pk)
#         serializer = LogEntrySerializer(queryset, many=True)
#         return Response(serializer.data)
    
# # get logs by action type
# class ActionLogList(generics.ListCreateAPIView):
#     queryset = LogEntry.objects.all()
#     serializer_class = LogEntrySerializer
#     def list(self, request, pk, format=None):
#         # Note the use of `get_queryset()` instead of `self.queryset`
#         queryset = self.get_queryset()
#         # filter queryset by pk
#         queryset = queryset.filter(action=pk)
#         serializer = LogEntrySerializer(queryset, many=True)
#         return Response(serializer.data)
    
    
    
# ---------------------------------------------------------------------------------------
# class EventsList(generics.ListCreateAPIView):
#     queryset = Event.objects.all()
#     serializer_class = EventAddingSerializer
#     # permission_classes = [IsAdminUser]

#     def list(self, request):
#         # Note the use of `get_queryset()` instead of `self.queryset`
#         queryset = self.get_queryset()
#         serializer = EventSerializer(queryset, many=True)
#         return Response(serializer.data)

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
