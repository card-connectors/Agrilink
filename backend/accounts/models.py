from django.db import models
from django.conf import settings

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pin = models.CharField(max_length=20)
    userType = models.CharField(max_length=20)

class Land(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lands', null=True, blank=True)
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    area = models.FloatField()
    pricePerAcre = models.DecimalField(max_digits=12, decimal_places=2)
    soilType = models.CharField(max_length=20)
    waterResources = models.JSONField(default=list, blank=True)
    suitableFor = models.JSONField(default=list, blank=True)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.location}"

class LandImage(models.Model):
    land = models.ForeignKey(Land, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='land_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        # return a simple, valid string
        return f"Image for {self.land.title}"

class Farming(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='farmings', null=True, blank=True)
    type = models.CharField(max_length=50)
    experience = models.IntegerField()
    description = models.TextField()
    photo = models.ImageField(upload_to='farming_photos/', blank=True, null=True)


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products', null=True, blank=True)
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100, blank=True, null=True)
    minQuantity = models.PositiveIntegerField()
    price = models.FloatField()
    otherName = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)


class Farmer(models.Model):
    user = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name='farmers',
    null=True,
    blank=True)
    name = models.CharField(max_length=100)
    farmingType = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    landRequirement = models.CharField(max_length=50)
    description = models.TextField()
    contact = models.EmailField()

    def __str__(self):
        return self.name


class LandRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requests')
    land = models.ForeignKey(Land, on_delete=models.CASCADE, related_name='requests')
    message = models.TextField(blank=True)
    status = models.CharField(max_length=20, default='pending')  # New status field added
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Request by {self.user.name} for {self.land.title}"

