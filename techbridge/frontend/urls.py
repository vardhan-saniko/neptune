from django.urls import path
from . import views
# urlpatterns = [
#     path('', views.index)
# ]
urlpatterns = [
    path('', views.index),
    path('login', views.index),  # added
    path('register', views.index),  # added
    path('survey/<str:route>', views.survey_page1),
    path('survey_page2', views.survey_page2),
    path('survey_page3', views.survey_page3),
    path('thank_you', views.thank_you),
]