from django.test import TestCase
from .serializers import *
from rest_framework import status
from .models import *
from rest_framework.test import APIClient
from django.urls import reverse
import json
from user.models import User


client = APIClient()
username = "randomTestUser"
password = "randomTestPassword"
email = "random@gmail.com"
user = User.objects.create(username=username, password=password, email=email, is_superuser=True)
client.force_authenticate(user=user)
# write all the tests for Questionnaire models here
class QuestionnaireTests(TestCase):
    title = "randomTestTitle"
    description = "randomTestDescription"
    
    def setUp(self):
        self.questionnaire = Questionnaire.objects.create(title=self.title, description=self.description)
        self.url = "Questionnaire_list"

    def test_questionnaire_creation(self):
        response = self.client.get(reverse(self.url), kwargs={'id': self.questionnaire.id})
        questionnaire = Questionnaire.objects.get(id=self.questionnaire.id)
        serializer = QuestionnaireSerializer(questionnaire)
        
        data = {}
        for d in response.data:
            data = dict(d)
 
        self.assertEquals(data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_questionnaire_put(self):

        payload = {"title": "newPutTitle", "description": "newPutDescription"}
        response = client.put(
            f'/api/questionnaire/{self.questionnaire.id}/',
            data=json.dumps(payload),
            content_type='application/json'
        )
        
        response = self.client.get(reverse(self.url), kwargs={'id': self.questionnaire.id})
        questionnaire = Questionnaire.objects.get(id=self.questionnaire.id)
        serializer = QuestionnaireSerializer(questionnaire)
        
        data = {}
        for d in response.data:
            data = dict(d)
 
        self.assertEquals(data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        
    def test_questionnaire_patch(self):
        self.questionnaire.title = "newTitle"
        self.questionnaire.save()
        
        response = self.client.get(reverse(self.url), kwargs={'id': self.questionnaire.id})
        questionnaire = Questionnaire.objects.get(id=self.questionnaire.id)
        serializer = QuestionnaireSerializer(questionnaire)
        
        data = {}
        for d in response.data:
            data = dict(d)
 
        self.assertEquals(data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        
    def test_questionnaire_delete(self):
        response = client.delete(
            f'/api/questionnaire/{self.questionnaire.id}/',
        )
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Questionnaire.objects.count(), 0)
        
    def test_questionnaire_wrong_method(self):
        response = self.client.put(reverse(self.url), kwargs={'id': self.questionnaire.id})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_questionnaire_wrong_method1(self):
        response = self.client.patch(reverse(self.url), kwargs={'id': self.questionnaire.id})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_questionnaire_wrong_auth(self):          
        response = self.client.delete(reverse(self.url), kwargs={'id': self.questionnaire.id})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)    
        
        
# test question model here
class QuestionTests(TestCase):
    content = "random"
    allow_recording = True
    titleQuestionnaire = "randomTestTitle"
    descriptionQuestionnaire = "randomTestDescription"
    dissallow_recording = False
    
    def setUp(self):
        self.questionnaire = Questionnaire.objects.create(title=self.titleQuestionnaire, description=self.descriptionQuestionnaire)
        self.url = f'/api/questionnaire/{self.questionnaire.id}/question/'

    def test_question_creation(self):
        
        payload = {"content": self.content, "allow_recording": self.allow_recording, "questionnaire": str(self.questionnaire.id)}
        
        response = client.post(
            self.url,
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        response1 = self.client.get(f'/api/questionnaire/{self.questionnaire.id}/')
        questionnaire = Questionnaire.objects.get(id=self.questionnaire.id)
        serializer = QuestionnaireSerializer(questionnaire)
        self.assertEquals(response1.data, serializer.data)
        self.assertEqual(response1.status_code, status.HTTP_200_OK)
        
        
    def test_question_put(self):    
        payload = {"content": self.content, "allow_recording": self.allow_recording, "questionnaire": str(self.questionnaire.id)}
        response = client.post(
            self.url,
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        payload = {"content": "newContent", "allow_recording": self.dissallow_recording}
        response = client.put(
            f'/api/questionnaire/{self.questionnaire.id}/question/{response.data["id"]}/',
            data=json.dumps(payload),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        questionnaire = Questionnaire.objects.get(id=self.questionnaire.id)
        serializer = QuestionnaireSerializer(questionnaire)
        
        response1 = self.client.get(f'/api/questionnaire/{self.questionnaire.id}/')
        self.assertEquals(response1.data, serializer.data)
        self.assertEqual(response1.status_code, status.HTTP_200_OK)
        
        
    def test_question_patch(self):
        payload = {"content": self.content, "allow_recording": self.allow_recording, "questionnaire": str(self.questionnaire.id)}
        response = client.post(
            self.url,
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        
        payload = {"content": "newContent"}
        response = client.patch(
            f'/api/questionnaire/{self.questionnaire.id}/question/{response.data["id"]}/',
            data=json.dumps(payload),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        questionnaire = Questionnaire.objects.get(id=self.questionnaire.id)
        serializer = QuestionnaireSerializer(questionnaire)
        
        response1 = self.client.get(f'/api/questionnaire/{self.questionnaire.id}/')
        self.assertEquals(response1.data, serializer.data)
        self.assertEqual(response1.status_code, status.HTTP_200_OK)


    def test_question_delete(self):
        payload = {"content": self.content, "allow_recording": self.allow_recording, "questionnaire": str(self.questionnaire.id)}
        response = client.post(
            self.url,
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        response = client.delete(
            f'/api/questionnaire/{self.questionnaire.id}/question/{response.data["id"]}/',
        )
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Questionnaire.objects.count(), 1)
        self.assertEqual(Question.objects.count(), 0)
        
        response1 = self.client.get(f'/api/questionnaire/{self.questionnaire.id}/')
        questionnaire = Questionnaire.objects.get(id=self.questionnaire.id)
        serializer = QuestionnaireSerializer(questionnaire)
        self.assertEquals(response1.data, serializer.data)
        self.assertEqual(response1.status_code, status.HTTP_200_OK)
        

        
    def test_question_wrong_method(self):  
        response = self.client.put(self.url, kwargs={'id': self.questionnaire.id}) 
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_question_wrong_method2(self):
        response = self.client.patch(self.url, kwargs={'id': self.questionnaire.id}) 
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_question_wrong_auth(self):
        response = self.client.delete(self.url, kwargs={'id': self.questionnaire.id}) 
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
        
# test answer model here
class TestAnswers(TestCase):
    content = "random"
    allow_recording = True
    titleQuestionnaire = "randomTestTitle"
    descriptionQuestionnaire = "randomTestDescription"
    dissallow_recording = False    
    
    
    def setUp(self):
        self.questionnaire = Questionnaire.objects.create(title=self.titleQuestionnaire, description=self.descriptionQuestionnaire)
        self.url = f'/api/questionnaire/{self.questionnaire.id}/question/'
        self.question = Question.objects.create(content=self.content, allow_recording=self.allow_recording, questionnaire=self.questionnaire)
        self.url2 = f'/api/questionnaire/{self.questionnaire.id}/feedback/'

    def test_post_answer(self):
        answerPayload = {"content": self.content,  "questionnaire": str(self.questionnaire.id)}
        response = client.post(
            self.url,
            data=json.dumps(answerPayload),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        response1 = self.client.get(f'/api/questionnaire/{self.questionnaire.id}/')
        questionnaire = Questionnaire.objects.get(id=self.questionnaire.id)
        serializer = QuestionnaireSerializer(questionnaire)
        self.assertEquals(response1.data, serializer.data)
        self.assertEqual(response1.status_code, status.HTTP_200_OK)
        
      
      
    def test_answer_put(self):    
        payload = {"content": self.content, "questionnaire": str(self.questionnaire.id)}
        response = client.post(
            self.url,
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        payload = {"content": "newContent", "allow_recording": self.dissallow_recording}
        response = client.put(
            f'/api/questionnaire/{self.questionnaire.id}/question/{response.data["id"]}/',
            data=json.dumps(payload),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        questionnaire = Questionnaire.objects.get(id=self.questionnaire.id)
        serializer = QuestionnaireSerializer(questionnaire)
        
        response1 = self.client.get(f'/api/questionnaire/{self.questionnaire.id}/')
        self.assertEquals(response1.data, serializer.data)
        self.assertEqual(response1.status_code, status.HTTP_200_OK)
        
        
    def test_answer_patch(self):
        payload = {"content": self.content, "allow_recording": self.dissallow_recording, "questionnaire": str(self.questionnaire.id)}
        response = client.post(
            self.url,
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        
        payload = {"content": "newContent"}
        response = client.patch(
            f'/api/questionnaire/{self.questionnaire.id}/question/{response.data["id"]}/',
            data=json.dumps(payload),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        questionnaire = Questionnaire.objects.get(id=self.questionnaire.id)
        serializer = QuestionnaireSerializer(questionnaire)
        
        response1 = self.client.get(f'/api/questionnaire/{self.questionnaire.id}/')
        self.assertEquals(response1.data, serializer.data)
        self.assertEqual(response1.status_code, status.HTTP_200_OK)


    def test_answer_delete(self):
        payload = {"content": self.content, "allow_recording": self.dissallow_recording, "questionnaire": str(self.questionnaire.id)}
        response = client.post(
            self.url,
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        response = client.delete(
            f'/api/questionnaire/{self.questionnaire.id}/question/{response.data["id"]}/',
        )
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Questionnaire.objects.count(), 1)
        self.assertEqual(Question.objects.count(), 1)
        
        response1 = self.client.get(f'/api/questionnaire/{self.questionnaire.id}/')
        questionnaire = Questionnaire.objects.get(id=self.questionnaire.id)
        serializer = QuestionnaireSerializer(questionnaire)
        self.assertEquals(response1.data, serializer.data)
        self.assertEqual(response1.status_code, status.HTTP_200_OK)
        
        
    def test_answer_wrong_method(self):
        response = self.client.put(self.url2, kwargs={'id': self.questionnaire.id}) 
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_answer_wrong_method2(self):
        response = self.client.patch(self.url2, kwargs={'id': self.questionnaire.id}) 
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_answer_wrong_auth(self):
        response = self.client.delete(self.url2, kwargs={'id': self.questionnaire.id}) 
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        
        
        
response = client.delete(
    f'/api/user/{user.id}/',
)