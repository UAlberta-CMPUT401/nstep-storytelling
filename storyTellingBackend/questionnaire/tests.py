from django.test import TestCase
from .serializers import *
from rest_framework import status
from .models import *
from rest_framework.test import APIClient
from django.urls import reverse
import json



client = APIClient()

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
        

