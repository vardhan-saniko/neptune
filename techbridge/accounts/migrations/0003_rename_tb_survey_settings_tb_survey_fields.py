# Generated by Django 4.0.5 on 2023-05-11 03:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_settings'),
    ]

    operations = [
        migrations.RenameField(
            model_name='settings',
            old_name='tb_survey',
            new_name='tb_survey_fields',
        ),
    ]
