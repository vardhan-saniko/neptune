from django.contrib import admin
from .models import Survey, Profile, Settings

admin.site.register(Profile)
admin.site.register(Survey)
admin.site.register(Settings)
admin.site.site_header = "TechBridge | Data Science and Analytics"
admin.site.site_title = "TechBridge | Data Science and Analytics"
admin.site.index_title = "Welcome to TechBridge Admin Page"

# Register your models here.
