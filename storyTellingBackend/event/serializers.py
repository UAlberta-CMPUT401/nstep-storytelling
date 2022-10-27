from django.db.models import fields
from rest_framework import serializers
from event.models import *

class EventAddingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['title','content','type','object_id','author']