from django.urls import path
from .views import register_view, login_view, profile_setup_view,add_land_view

urlpatterns = [
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'),
    path('profile-setup/', profile_setup_view, name='profile-setup'),
    path('land/', add_land_view, name='add-land'),
]
