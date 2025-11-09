from django.urls import path
from .views import get_products, add_product_view
from .views import register_view, login_view, profile_setup_view, add_land_view, add_farming_view, get_farmers, get_lands
from .views import land_detail_view, send_land_request_view, add_farming_and_farmer_view

urlpatterns = [
    path('auth/register/', register_view, name='register'),
    path('auth/login/', login_view, name='login'),
    path('auth/profile-setup/', profile_setup_view, name='profile-setup'),
    path('add-land/', add_land_view, name='add-land'),
    path('farming/', add_farming_view, name='add-farming'),
    path('products/', get_products, name='get-products'),  # GET products with pagination
    path('products/add/', add_product_view, name='add-products'),  # POST add product
    path('farmers/', get_farmers, name='get-farmers'),
    path('lands/', get_lands, name='get-lands'),
    path('lands/<int:land_id>/', land_detail_view, name='land-detail'),
    path('lands/request/', send_land_request_view, name='send-land-request'),
    path('add-farming-farmer/', add_farming_and_farmer_view, name='add-farming-farmer')
]
