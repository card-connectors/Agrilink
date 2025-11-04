from rest_framework import serializers
from .models import User, UserProfile, Land, Farming, Product, Farmer
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return User.objects.create(**validated_data)

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'phone', 'address', 'city', 'state', 'pin', 'userType', 'user']

class LandSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='user', write_only=True
    )
    user = UserSerializer(read_only=True)

    class Meta:
        model = Land
        fields = '__all__'

class FarmingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farming
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(required=False, allow_blank=True)
    class Meta:
        model = Product
        fields = '__all__'

class FarmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farmer
        fields = '__all__'
        
class LandSerializer(serializers.ModelSerializer):
    # show images nested (read-only) if you want to return them
    images = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Land
        fields = '__all__'
        read_only_fields = ('created_at', 'status', 'user')

    def get_images(self, obj):
        # return image URLs
        return [request.build_absolute_uri(img.image.url) if (request := self.context.get('request')) else img.image.url for img in obj.images.all()]