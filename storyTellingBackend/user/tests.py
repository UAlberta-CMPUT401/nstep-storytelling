from django.test import TestCase
from .serializers import UserSerializer
from rest_framework import status
from .models import User
from rest_framework.test import APIClient
from django.urls import reverse

client = APIClient()
# write all the tests for User models here
class UserTests(TestCase):
    username = "randomTestUser"
    password = "randomTestPassword"
    email = "random@gmail.com"
    
    def setUp(self):
        self.user = User.objects.create(username=self.username, password=self.password, email=self.email)
        
    def test_user_creation(self):
        self.assertEqual(self.user.username, self.username)
        self.assertEqual(self.user.password, self.password)
        self.assertEqual(self.user.email, self.email)
        

    # set test for put request 
    def test_user_put(self):        
        self.user.username  = "newUsername"
        self.user.password = "newPassword"
        self.user.email = "newEmail@gmail.com"
        self.user.save()
        
        self.assertEqual(self.user.username, "newUsername")
        self.assertEqual(self.user.password, "newPassword")
        self.assertEqual(self.user.email, "newEmail@gmail.com")
        
    # test patch request here
    def test_user_patch(self):
        self.user.username  = "newUsername"
        self.user.save()
        
        self.assertEqual(self.user.username, "newUsername")
        self.assertEqual(self.user.password, self.password)
        self.assertEqual(self.user.email, self.email)
        
    # test delete request here
    def test_user_delete(self):
        self.user.delete()
        self.assertEqual(User.objects.count(), 0)
        
    def test_get_invalid_single_user(self):        
        users = User.objects.all()
        for user in users:
            self.assertNotEqual(user.username, "invalidUsername")
        self.assertEqual(len(users), 1)
        
        
# Test multiple users with different email addresses and passwords 
class UserTestsList(TestCase):
    def setUp(self):
        self.user1 = User.objects.create(username="user1", password="user1", email="user1@gmail.com")
        self.user2 = User.objects.create(username="user2", password="user2", email="user2@gmail.com")
        self.user3 = User.objects.create(username="user3", password="user3", email="user3@gmail.com")
        self.user4 = User.objects.create(username="user4", password="user4", email="user4@gmail.com")
        
    def test_user_list(self):
        response = client.get(reverse('UserList'))
        # get data from db
        users = User.objects.all()
        self.assertEqual(len(users), 4)
        serializer = UserSerializer(users, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        