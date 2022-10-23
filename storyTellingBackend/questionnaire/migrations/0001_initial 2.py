# Generated by Django 4.0.6 on 2022-10-12 16:32

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
                ('url', models.CharField(blank=True, default='', max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.UUIDField(auto_created=True, default=uuid.uuid4, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField(max_length=1000)),
                ('url', models.CharField(blank=True, default='', max_length=200, null=True)),
                ('answers', models.ManyToManyField(to='questionnaire.answer')),
            ],
        ),
        migrations.CreateModel(
            name='Questionnaire',
            fields=[
                ('id', models.UUIDField(auto_created=True, default=uuid.uuid4, primary_key=True, serialize=False)),
                ('url', models.CharField(blank=True, default='', max_length=200, null=True)),
                ('questions', models.ManyToManyField(to='questionnaire.question')),
            ],
        ),
    ]
