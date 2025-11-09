from datetime import timezone
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import User, UserProfile, Land, Farming, Product, Farmer, LandImage
from .serializers import UserSerializer, UserProfileSerializer, LandSerializer, FarmingSerializer, ProductSerializer, FarmerSerializer
from django.contrib.auth.hashers import check_password
from rest_framework.permissions import AllowAny
from .models import User, UserProfile
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from .models import Land, LandRequest, User
from .serializers import LandSerializer, LandRequestSerializer
from .models import Land
from .serializers import LandSerializer,LandRequestSerializer

@api_view(["POST"])
@permission_classes([AllowAny])
def register_view(request):
    data = request.data.copy()
    #print("CONTENT_TYPE:", request.content_type)
    #print("FILES:", request.FILES)
    #print("DATA:", request.data)
    if data.get("password") != data.get("confirmPassword"):
        return Response({"error": "Passwords do not match!"}, status=400)
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({"user": UserSerializer(user).data, "token": "dummy-token"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get('username')
    password = request.data.get('password')
    try:
        user = User.objects.get(email=email)
        if check_password(password, user.password):
            return Response({"user": UserSerializer(user).data, "token": "dummy-token"}, status=200)
        else:
            return Response({"error": "Invalid credentials."}, status=401)
    except User.DoesNotExist:
        return Response({"error": "User does not exist."}, status=401)

@api_view(["POST"])
@permission_classes([AllowAny])
def profile_setup_view(request):
    serializer = UserProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Profile saved successfully"}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_land_view(request):
    data = request.data.copy()
    data['user_id'] = request.user.id  # Use authenticated user, do not trust client user_id

    serializer = LandSerializer(data=data, context={'request': request})
    if serializer.is_valid():
        land = serializer.save()
        return Response(LandSerializer(land, context={'request': request}).data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user_info(request):
    user = request.user
    data = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
    }
    return Response(data)

@api_view(["POST"])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser, FormParser])
def add_farming_view(request):
    data = request.data.copy()
    serializer = FarmingSerializer(data=data, context={'request': request})
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    final_user = None
    if request.user and getattr(request.user, 'is_authenticated', False):
        final_user = request.user
    else:
        final_user = serializer.validated_data.get('user')
    if final_user is None and not Farming._meta.get_field('user').null:
        return Response({"error": "user is required"}, status=status.HTTP_400_BAD_REQUEST)

    instance = serializer.save(user=final_user)
    out = FarmingSerializer(instance, context={'request': request}).data
    return Response(out, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def add_product_view(request):
    data = request.data.copy()
    user_id = data.get('user_id')
    if not user_id:
        return Response({"error": "user_id is required"}, status=400)
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)
    
    data.pop('user_id', None)  # Remove user_id from data before serializer

    serializer = ProductSerializer(data=data)
    if serializer.is_valid():
        serializer.save(user=user)
        return Response({"message": "Product added successfully"}, status=201)
    else:
        return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_farmers(request):
    paginator = PageNumberPagination()
    paginator.page_size = 10
    queryset = Farmer.objects.all().order_by('id')
    result_page = paginator.paginate_queryset(queryset, request)
    serializer = FarmerSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_lands(request):
    lands = Land.objects.all()
    serializer = LandSerializer(lands, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_user_role(request):
    email = request.GET.get('email')
    if not email:
        return Response({"error": "Email parameter is required."}, status=400)
    try:
        user = User.objects.get(email=email)
        profile = UserProfile.objects.get(user=user)
        return Response({"userType": profile.userType}, status=200)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=404)
    except UserProfile.DoesNotExist:
        return Response({"error": "UserProfile not found for this user."}, status=404)
    
@api_view(['GET'])
@permission_classes([AllowAny])
def land_detail_view(request, land_id):
    try:
        land = Land.objects.get(id=land_id)
    except Land.DoesNotExist:
        return Response({"error": "Land not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = LandSerializer(land, context={'request': request})
    return Response(serializer.data)


# Create a land request (user must be authenticated)
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # user must be logged in
def send_land_request_view(request):
    user = request.user
    data = request.data.copy()
    land_id = data.get('land_id')
    message = data.get('message', '')

    # Validate land exists
    try:
        land = Land.objects.get(id=land_id)
    except Land.DoesNotExist:
        return Response({"error": "Land not found"}, status=status.HTTP_404_NOT_FOUND)

    # Create request
    land_request = LandRequest.objects.create(user=user, land=land, message=message)
    serializer = LandRequestSerializer(land_request)
    return Response(serializer.data, status=status.HTTP_201_CREATED) 

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def add_farming_and_farmer_view(request):
    user = request.user
    data = request.data.copy()

    farming_data = {
        'user': user.id,
        'type': data.get('farmingType'),
        'location': data.get('location'),
        'description': data.get('description'),
    }

    farmer_data = {
        'user_id': user.id,
        'name': user.name,
        'farmingType': data.get('farmingType'),
        'location': data.get('location'),
        'landRequirement': data.get('landRequirement', ''),
        'description': data.get('description'),
        'contact': data.get('contact', ''),
    }

    farming_serializer = FarmingSerializer(data=farming_data)
    if not farming_serializer.is_valid():
        return Response({'farming_errors': farming_serializer.errors}, status=400)
    farming = farming_serializer.save(user=user)

    farmer_serializer = FarmerSerializer(data=farmer_data)
    if not farmer_serializer.is_valid():
        return Response({'farmer_errors': farmer_serializer.errors}, status=400)
    farmer = farmer_serializer.save()

    return Response({
        'message': 'Farming and Farmer details saved successfully',
        'farming': FarmingSerializer(farming).data,
        'farmer': FarmerSerializer(farmer).data,
    }, status=201)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_products(request):
    paginator = PageNumberPagination()
    paginator.page_size = 10
    queryset = Product.objects.all().order_by('id')
    result_page = paginator.paginate_queryset(queryset, request)
    serializer = ProductSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)