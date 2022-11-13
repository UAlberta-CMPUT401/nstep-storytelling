"""storyTellingBackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,re_path
from user import views as uv
from questionnaire import views as qv
from django.conf.urls import include
from django.urls import re_path
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from user import views as uv
from questionnaire import views as qv
from event import views as ev

schema_view = get_schema_view(
   openapi.Info(
      title="API Docs",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/user/',uv.UserList.as_view(),name='UserList'),
    path('api/questionnaire/', qv.Questionnaire_list.as_view()),
    path('api/logs/', ev.LogList.as_view()),
    re_path(r'api/logs/user/(?P<pk>[(-z)]{36})/$', ev.UserLogList.as_view(),name='UserLog'),
    re_path(r'api/logs/(?P<pk>[(-z)]{36})/$', ev.ObjectLogList.as_view(),name='ObjectLog'),


    path('api/login/', uv.LoginAPI.as_view()),
    re_path(r'api/user/(?P<pk>[(-z)]{36})/$', uv.UserDetail.as_view(),name='SingleUser'),

    re_path(r'api/questionnaire/(?P<pk>[(-z)]{36})/question/(?P<pk2>[(-z)]{36})/$',qv.QuestionDetail.as_view(),name='SingleQuestion'),

    re_path(r'api/questionnaire/(?P<pk>[(-z)]{36})/question/$',qv.Questions.as_view(),name='Questions'),
    re_path(r'api/questionnaire/(?P<pk>[(-z)]{36})/feedback/$', qv.Feedbacks.as_view()),

    re_path(r'api/questionnaire/(?P<pk>[(-z)]{36})/$', qv.Questionnaire_detail.as_view()),
    # re_path(r'api/question/(?P<pk>[(-z)]{36})/feedback/$',qv.Feedbacks.as_view(),name='Feedbacks'),
    # re_path(r'api/event/(?P<pk>[(-z)]{36})/$', ev.EventDetail.as_view(),name='SingleEvent'),

]
