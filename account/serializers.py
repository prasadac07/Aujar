from rest_framework import serializers
from .models import UserProfile, Product, Booking
from django.utils.timezone import timezone

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ['id', 'first_name', 'last_name', 'password', 'mobile', 'pincode']
        extra_kwargs = {'password': {'write_only': True}}


class LoginSerializer(serializers.Serializer):
    mobile = serializers.CharField(max_length=15, required=True)
    password = serializers.CharField(max_length=255, required=True)




class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

