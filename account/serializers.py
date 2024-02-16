from rest_framework import serializers
from .models import UserProfile, Product, Booking
from django.utils.timezone import timezone

class UserProfileSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    class Meta:
        model = UserProfile
        fields = ['id', 'first_name', 'last_name', 'password', 'username', 'pincode']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=15, required=True)
    password = serializers.CharField(max_length=255, required=True)

    def validate_username(self, value):
        # Convert the username to string if it's an integer
        return str(value)





class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

