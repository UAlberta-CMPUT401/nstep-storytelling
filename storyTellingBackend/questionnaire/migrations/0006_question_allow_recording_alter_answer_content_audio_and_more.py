# Generated by Django 4.1.1 on 2022-11-17 02:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questionnaire', '0005_merge_20221115_1943'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='allow_recording',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='answer',
            name='content_audio',
            field=models.FileField(blank=True, null=True, upload_to='uploads/audioFiles/'),
        ),
        migrations.AlterField(
            model_name='answer',
            name='content_video',
            field=models.FileField(blank=True, null=True, upload_to='uploads/videoFiles/'),
        ),
    ]