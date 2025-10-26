from django.db import models

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
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    area = models.FloatField()
    soilType = models.CharField(max_length=64)
    waterResources = models.JSONField(default=list)  # Store as a JSON array
    suitableFor = models.CharField(max_length=64)
    description = models.TextField(blank=True)
