from django.db import models
import uuid
from user.models import User
from django.utils import timezone 

# Create your models here.
class Event(models.Model):
    class title(models.TextChoices):
        FEEDBACK='feedbacks'
        QUESTIONNAIRE='questionnaire'
        USER = "user"
        UNKNOWN = 'unknown'

    class action(models.TextChoices):
        VIEW='view'
        MODIFY='modify'
        DELETE = "delete"
        UNKNOWN = 'unknown'

    id = models.UUIDField(primary_key = True , auto_created = True , default = uuid.uuid4)
    object_id = models.UUIDField(null=True)
    action = models.CharField(max_length=20,choices=action.choices , default=action.UNKNOWN)
    title = models.CharField(max_length=20,choices=title.choices , default=title.UNKNOWN)
    author = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    time = models.DateTimeField(default=timezone.now)
    class Meta:
        ordering = ["-time"]

    @property
    def log(self):
        "Returns the full log."
        return '%s %s %s at %s. object id is %s' % (str(self.author), self.action, self.title,str(self.time), str(self.object_id))
