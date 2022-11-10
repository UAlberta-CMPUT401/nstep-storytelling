from django.db.models import fields
from rest_framework import serializers
from event.models import *
from auditlog.models import LogEntry

class EventAddingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['title','action','object_id','author']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['log','title','action','object_id','author']
        
        
# write a serializer for the LogEntry model that will all the field
class LogEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = LogEntry
        # set fields to '__all__' to get all fields
        fields = '__all__'