# Generated by Django 4.1.1 on 2022-10-29 22:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questionnaire', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='questionnaire',
            name='description',
            field=models.CharField(max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='questionnaire',
            name='title',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
