# Generated by Django 4.1.1 on 2022-11-07 04:37

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0003_remove_event_type_event_action_alter_event_content_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='event',
            options={'ordering': ['-time']},
        ),
        migrations.AddField(
            model_name='event',
            name='time',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
