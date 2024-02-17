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
    def create(self, validated_data):
        image = validated_data["image_link"]
        if str(image) == "":
            validated_data["image_link"] = "https://imgs.search.brave.com/hAms7Mcn0oyMfQqK0Z5RpLqQAAqAspgu5SSYdK8nOSk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTcz/NTgwOTMzL3Bob3Rv/L3RyYWN0b3IuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPXR6/T1J6eHgzX3MzTm1E/ZWJQbThpMGk5TmY1/VkRONUhyVUdMMkNS/NjVZNjA9"
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance


from rest_framework.exceptions import ValidationError


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

    def create(self, validated_data):
        # Remove logic related to lender_sign and booker_sign
        instance = super().create(validated_data)
        return instance

    def update(self, instance, validated_data):
        # Check if the status is accepted
        is_accepted = instance.status == "accepted"

        # Check if lender_sign or booker_sign is True
        lender_sign = validated_data.get("lender_sign", instance.lender_sign)
        booker_sign = validated_data.get("booker_sign", instance.booker_sign)

        # If the status is not accepted and either lender_sign or booker_sign is True, raise a ValidationError
        if not is_accepted and (lender_sign or booker_sign):
            raise ValidationError({"message": "Cannot accept request because status is not accepted."})

        # Update instance attributes
        instance.lender_sign = lender_sign
        instance.booker_sign = booker_sign

        # Save instance
        instance.save()

        return instance




