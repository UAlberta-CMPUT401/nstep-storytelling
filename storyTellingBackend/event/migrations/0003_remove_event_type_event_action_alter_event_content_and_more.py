# Generated by Django 4.1.1 on 2022-11-07 04:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0002_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='type',
        ),
        migrations.AddField(
            model_name='event',
            name='action',
            field=models.CharField(choices=[('FEEDBACKS', 'View'), ('QUESTIONNAIRE', 'Modify'), ('USER', 'Delete'), ('OTHER', 'Other')], default='OTHER', max_length=20),
        ),
        migrations.AlterField(
            model_name='event',
            name='content',
            field=models.CharField(max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='title',
            field=models.CharField(choices=[('FEEDBACKS', 'Feedback'), ('QUESTIONNAIRE', 'Questionnaire'), ('USER', 'User'), ('OTHER', 'Other')], default='OTHER', max_length=20),
        ),
    ]
