# Generated by Django 4.1.1 on 2022-10-17 16:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_remove_user_name_alter_user_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='host',
        ),
        migrations.RemoveField(
            model_name='user',
            name='url',
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(db_index=True, max_length=254, unique=True),
        ),
    ]
