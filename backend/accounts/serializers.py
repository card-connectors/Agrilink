from rest_framework import serializers
from .models import (User, UserProfile, Land, Farming, Product, Farmer,LandRequest,LandImage,)
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
    # allow frontend to pass a 'user_id' to set the FK (write-only)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='user', write_only=True, required=False)
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Farming
        fields = ['id', 'user', 'user_id', 'type', 'experience', 'description', 'photo']
        read_only_fields = ('user',)

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(required=False, allow_blank=True)
    
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ('user',)

class FarmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farmer
        fields = '__all__'  # This includes 'id' by default
        
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
    
class LandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Land
        fields = '__all__'


class FarmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farmer
        fields = '__all__'

class LandRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LandRequest
        fields = '__all__'
        read_only_fields = ['created_at', 'status']


class FarmerSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='user',
        write_only=True,
        required=False,
        allow_null=True
    )

    class Meta:
        model = Farmer
        fields = ['id', 'user_id', 'name', 'farmingType', 'location', 'landRequirement', 'description', 'contact']


class LandImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = LandImage
        fields = ['id', 'image_url']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url

class LandSerializer(serializers.ModelSerializer):
    images = LandImageSerializer(many=True, read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='user', write_only=True
    )
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Land
        fields = '__all__'
        read_only_fields = ('created_at', 'status', 'user')

    def create(self, validated_data):
        user = validated_data.pop('user')
        land = Land.objects.create(user=user, **validated_data)
        photos_data = self.context['request'].FILES.getlist('photos')
        for photo_file in photos_data:
            LandImage.objects.create(land=land, image=photo_file)
        return land

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(required=False, allow_blank=True)
    
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ('user',)