from django.shortcuts import render

from user.models import *
from user.serializers import *
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class UserList(APIView):
    """
    List all users, 
    """
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserInListSerializer(users, many=True)
        response = {'total': len(serializer.data),
                    'users': serializer.data,
                    }

        return Response(response)
    
    
class UserDetail(APIView):
    """
    Retrieve, update or delete a User instance.
    """
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def post(self, request, pk, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            result = serializer.save()
            response = {
                        "status": 0,
                        "message": "User created",
                        "id": result.id,
                        }
            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user, data=request.data)

        if serializer.is_valid():
            serializer.save()
            response = {
                        "status": 0,
                        "message": "User updated"
                        }
            return Response(response)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        user = self.get_object(pk)

        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response = {
                        "status": 0,
                        "message": "User modified"
                        }
            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        user.delete()
        response = {
            "status": 0,
            "message": "User deleted"
            }
        return Response(response)
