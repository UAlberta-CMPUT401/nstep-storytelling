from django.db.models import fields
from rest_framework import serializers
from event.models import *

class EventAddingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['title','action','object_id','author']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['log','title','action','object_id','author']