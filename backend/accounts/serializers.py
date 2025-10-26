from rest_framework import serializers
from .models import User, UserProfile
from .models import Land, Farming, Product
from django.contrib.auth.hashers import make_password, check_password

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