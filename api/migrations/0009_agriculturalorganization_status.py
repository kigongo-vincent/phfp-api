# Generated by Django 4.2.5 on 2024-06-10 00:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_agriculturalorganization_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='agriculturalorganization',
            name='status',
            field=models.CharField(default='pending', max_length=20),
        ),
    ]