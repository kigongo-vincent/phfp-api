# Generated by Django 4.2.5 on 2024-05-31 09:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_user_is_approved'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='isApproved',
        ),
    ]