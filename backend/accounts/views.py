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


from rest_framework.permissions import IsAuthenticated




from .models import Land
from .serializers import LandSerializer

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

@api_view(["POST"])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser, FormParser])
def add_land_view(request):
    # request.data contains text fields; request.FILES contains uploaded files
    data = request.data.copy()
    photos = request.FILES.getlist('photos')  # actual File objects

    # debug print to see incoming data in server console
    print("DATA:", data)
    print("FILES:", photos)

    # Accept either 'user_id' or 'user' key from frontend
    user_id = data.get("user_id") or data.get("user")
    if not user_id:
        return Response({"error": "user_id is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    # validate photo count
    if len(photos) == 0:
        return Response({"error": "At least one photo is required."}, status=status.HTTP_400_BAD_REQUEST)
    if len(photos) > 4:
        return Response({"error": "You can upload up to 4 photos only."}, status=status.HTTP_400_BAD_REQUEST)

    # Remove user_id if serializer does not expect it
    data.pop('user_id', None)
    data.pop('user', None)

    # If frontend sends arrays as 'field[]' you may need to normalize them:
    # Example: waterResources[] -> waterResources
    # DRF QueryDict will combine repeated keys into lists, so serializer should accept lists (JSONField accepts lists).

    serializer = LandSerializer(data=data, context={'request': request})
    if serializer.is_valid():
        # pass user instance when saving; created_at handled by model
        land = serializer.save(user=user)
        # save uploaded images to LandImage model
        for f in photos:
            LandImage.objects.create(land=land, image=f)
        # return serialized land (include newly saved images if serializer handles them)
        out_serializer = LandSerializer(land, context={'request': request})
        return Response(out_serializer.data, status=status.HTTP_201_CREATED)
    else:
        # IMPORTANT: show serializer errors in response (helps debug)
        print("SERIALIZER ERRORS:", serializer.errors)
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)



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
    
    