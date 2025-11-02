from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import User, UserProfile, Land, Farming, Product, Farmer
from .serializers import UserSerializer, UserProfileSerializer, LandSerializer, FarmingSerializer, ProductSerializer, FarmerSerializer
from django.contrib.auth.hashers import check_password
from rest_framework.permissions import AllowAny
from .models import User, UserProfile


from rest_framework.permissions import IsAuthenticated


from .models import Land
from .serializers import LandSerializer

@api_view(["POST"])
@permission_classes([AllowAny])
def register_view(request):
    data = request.data.copy()
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

@api_view(["POST"])
@permission_classes([AllowAny])
def add_land_view(request):
    serializer = LandSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
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
    serializer = FarmingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Farming details saved successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def add_product_view(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Product added successfully"}, status=201)
    else:
        return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_farmers(request):
    farmers = Farmer.objects.all()
    serializer = FarmerSerializer(farmers, many=True)
    return Response(serializer.data)

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
    
    