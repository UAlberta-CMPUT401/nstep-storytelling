# Generated by Django 4.0.6 on 2022-10-27 21:52

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.UUIDField(auto_created=True, default=uuid.uuid4, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField(max_length=1000)),
                ('content_type', models.CharField(choices=[('TEXT', 'Text'), ('VOICE', 'Voice'), ('VIDEO', 'Video')], default='TEXT', max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.UUIDField(auto_created=True, default=uuid.uuid4, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='Questionnaire',
            fields=[
                ('id', models.UUIDField(auto_created=True, default=uuid.uuid4, primary_key=True, serialize=False)),
                ('questions', models.ManyToManyField(to='questionnaire.question')),
            ],
        ),
        migrations.CreateModel(
            name='Program',
            fields=[
                ('id', models.UUIDField(auto_created=True, default=uuid.uuid4, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('date', models.CharField(max_length=200)),
                ('description', models.TextField(max_length=1000)),
                ('questionnaires', models.ManyToManyField(to='questionnaire.questionnaire')),
            ],
        ),
        migrations.CreateModel(
            name='AnswerList',
            fields=[
                ('id', models.UUIDField(auto_created=True, default=uuid.uuid4, primary_key=True, serialize=False)),
                ('Answers', models.ManyToManyField(to='questionnaire.answer')),
            ],
        ),
    ]