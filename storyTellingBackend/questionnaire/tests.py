from django.test import TestCase
from .serializers import *
from rest_framework import status
from .models import *
from rest_framework.test import APIClient
from django.urls import reverse
client = APIClient()
