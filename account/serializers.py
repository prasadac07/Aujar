from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = UserProfile
        fields = ['id', 'first_name', 'last_name', 'phone_number', 'pincode', 'password', 'confirm_password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Password and confirm password must match.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password', None)
        return super(UserProfileSerializer, self).create(validated_data)


class LoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15, required=True)
    password = serializers.CharField(max_length=255, required=True)
