# Generated by Django 4.1.1 on 2022-11-07 04:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('questionnaire', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='answerlist',
            old_name='Answers',
            new_name='answers',
        ),
    ]
