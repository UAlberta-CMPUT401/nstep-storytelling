from django.shortcuts import render

from user.models import *
from user.serializers import *
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework import permissions
from django.contrib.auth import authenticate, login, logout
from rest_framework.authentication import BaseAuthentication, TokenAuthentication
from rest_framework.permissions import *

# Create your views here.


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = AddingUserSerializer
    permission_classes = [IsAdminUser]

    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    lookup_field = 'pk'
    serializer_class = UserSerializer

class LoginAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer
    def post(self, request):
        username = request.data["username"]
        password = request.data["password"]
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request,user)
            response = {
                'message': 'successfully login!',
                'id': user.id,
                'token': Token.objects.get_or_create(user=user)[0].key
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Incorrect Credentials'},status=status.HTTP_400_BAD_REQUEST)

