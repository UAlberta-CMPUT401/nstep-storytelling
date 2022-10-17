from django.db.models import fields
from rest_framework import serializers
from user.models import *

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username','profileImage']


class UserInListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','profileImage']
