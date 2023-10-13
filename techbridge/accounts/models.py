from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    password = models.CharField(max_length=100)
    tb_name = models.CharField(max_length=100)
    tb_display_name = models.CharField(max_length=100)

    def __str__(self):
        return self.user.username


class Survey(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    display_name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=False)
    fields = models.JSONField()
    data = models.JSONField(default=list)
    extras = models.JSONField(default=dict)
    processed_data = models.JSONField(default=dict)

    def __str__(self):
        return self.name


class Settings(models.Model):
    tb_survey_fields = models.JSONField()
    pass
