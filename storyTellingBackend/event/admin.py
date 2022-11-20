from django.contrib import admin
from . import models
from simple_history.admin import SimpleHistoryAdmin

# Register your models here.
admin.site.register(models.Event, SimpleHistoryAdmin)
