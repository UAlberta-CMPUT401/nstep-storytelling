from django.contrib import admin
from . import models
from simple_history.admin import SimpleHistoryAdmin

# Register your models here.
admin.site.register(models.Answer, SimpleHistoryAdmin)
admin.site.register(models.Question, SimpleHistoryAdmin)
admin.site.register(models.Questionnaire, SimpleHistoryAdmin)
admin.site.register(models.AnswerList, SimpleHistoryAdmin)
