from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import User, UserProfile
from .serializers import UserSerializer, UserProfileSerializer
from django.contrib.auth.hashers import check_password
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
        return Response({"message": "Land details saved successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)