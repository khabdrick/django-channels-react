# Generated by Django 3.2.15 on 2022-08-16 14:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='text',
            old_name='author',
            new_name='sender',
        ),
        migrations.AlterField(
            model_name='text',
            name='content',
            field=models.CharField(max_length=500),
        ),
    ]
