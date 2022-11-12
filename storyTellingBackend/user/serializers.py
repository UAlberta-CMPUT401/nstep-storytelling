from django.db.models import fields
from rest_framework import serializers
from user.models import *

class AddingUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username',"email","password"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"




class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField()
    class Meta:
        model = User
        ref_name = 'LogIn'
        fields = ['username','password']
