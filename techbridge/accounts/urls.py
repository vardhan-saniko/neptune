from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI, DataAPI
# from .views import get_data
from knox.views import LogoutView
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/logout', LogoutView.as_view(), name='knox_logout'),
    path('data', DataAPI.as_view())
]