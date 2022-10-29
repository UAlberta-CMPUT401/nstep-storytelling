from django.db.models import fields
from rest_framework import serializers
from user.models import *

class AddingUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username','profileImage',"email"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
