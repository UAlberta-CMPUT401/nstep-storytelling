# Generated by Django 4.0.6 on 2022-10-27 21:52

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.UUIDField(auto_created=True, default=uuid.uuid4, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('content', models.CharField(max_length=1000)),
                ('object_id', models.UUIDField(null=True)),
                ('type', models.CharField(choices=[('LOG', 'Log'), ('EVENT', 'Event')], default='EVENT', max_length=20)),
            ],
        ),
    ]