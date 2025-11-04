from django.urls import path
from .views import register_view, login_view, profile_setup_view, add_land_view, add_farming_view, add_product_view, get_farmers,get_lands

urlpatterns = [
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'),
    path('profile-setup/', profile_setup_view, name='profile-setup'),
    path('add-land/', add_land_view, name='add-land'),
    path('farming/', add_farming_view, name='add-farming'),
    path('products/', add_product_view, name='add-products'),
    path('farmers/', get_farmers, name='get-farmers'),
    path('lands/', get_lands, name='get-lands'),
]


