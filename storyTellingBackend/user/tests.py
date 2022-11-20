from django.test import TestCase
from .serializers import UserSerializer
from rest_framework import status
from .models import User
from rest_framework.test import APIClient
from django.urls import reverse
import json

client = APIClient()
# write all the tests for User models here
class UserTests(TestCase):
    username = "randomTestUser"
    password = "randomTestPassword"
    email = "random@gmail.com"
    
    def setUp(self):
        self.user = User.objects.create(username=self.username, password=self.password, email=self.email)
        self.url = "UserList"
        
    def test_user_creation(self):
        response = self.client.get(reverse(self.url), kwargs={'id': self.user.id})
        
        user = User.objects.get(id=self.user.id)
        serializer = UserSerializer(user)
        
        data = {}
        for d in response.data:
            data = dict(d)
 
        self.assertEquals(data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_user_post(self):
        payload = {"username": "newUser", "password": "newPassword", "email": "a@gmail.com"}
        response = client.post(
            reverse('UserList'),
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        

    # set test for put request 
    def test_user_put(self):   
        payload = {"username": "newPutUser", "password": "newPassword", "email": "newEmail@gmail.com"}  
        
        response = client.put(
            f'/api/user/{self.user.id}/',
            data=json.dumps(payload),
            content_type='application/json'
        )
        
        response = self.client.get(reverse(self.url), kwargs={'id': self.user.id})
        user = User.objects.get(id=self.user.id)
        serializer = UserSerializer(user)
        
        data = {}
        for d in response.data:
            data = dict(d)
 
        self.assertEquals(data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        
        
    # test patch request here
    def test_user_patch(self):
        self.user.username  = "newUsername"
        self.user.save()
        
        response = self.client.get(reverse(self.url), kwargs={'id': self.user.id})
        
        user = User.objects.get(id=self.user.id)
        serializer = UserSerializer(user)
        
        data = {}
        for d in response.data:
            data = dict(d)
 
        self.assertEquals(data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    # test delete request here
    def test_user_delete(self):
        response = client.delete(
            f'/api/user/{self.user.id}/',
        )
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(User.objects.count(), 0)
        
    def test_get_invalid_single_user(self):        
        users = User.objects.all()
        for user in users:
            self.assertNotEqual(user.username, "invalidUsername")
        self.assertEqual(len(users), 1)
        
        
    def test_user_wrong_method(self):
        response = self.client.put(reverse(self.url), kwargs={'id': self.user.id})
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        
    def test_user_wrong_method1(self):
        response = self.client.patch(reverse(self.url), kwargs={'id': self.user.id})
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        
    def test_user_wrong_method2(self):
        response = self.client.delete(reverse(self.url), kwargs={'id': self.user.id})
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        
        
# Test multiple users with different email addresses and passwords 
class UserTestsList(TestCase):
    def setUp(self):
        self.user1 = User.objects.create(username="user1", password="user1", email="user1@gmail.com")
        self.user2 = User.objects.create(username="user2", password="user2", email="user2@gmail.com")
        self.user3 = User.objects.create(username="user3", password="user3", email="user3@gmail.com")
        self.user4 = User.objects.create(username="user4", password="user4", email="user4@gmail.com")
        self.url = "UserList"
    def test_user_list(self):
        response = client.get(reverse(self.url))
        # get data from db
        users = User.objects.all()
        self.assertEqual(len(users), 4)
        serializer = UserSerializer(users, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        
    def test_userlist_wrong_method(self):
        response = self.client.put(reverse(self.url), kwargs={'id': self.user1.id})
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        
    def test_userlist_wrong_method1(self):
        response = self.client.patch(reverse(self.url), kwargs={'id': self.user1.id})
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        
    def test_userlist_wrong_method2(self):
        response = self.client.delete(reverse(self.url), kwargs={'id': self.user1.id})
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)