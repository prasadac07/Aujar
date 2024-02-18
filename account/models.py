from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, AbstractUser
from django.core.validators import RegexValidator
from django.db import models
from django.utils import timezone

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import RegexValidator
from django.db import models
from django.core.exceptions import ValidationError
import uuid
import random
import string

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, AbstractUser
from django.core.validators import RegexValidator
from django.db import models
from django.utils import timezone

import uuid
import random
import string

def generate_random_code(length=8):
    """Generate a random string of digits."""
    digits = string.digits
    return ''.join(random.choice(digits) for _ in range(length))

class CustomUserManager(BaseUserManager):
    def _create_user(self, username, password, first_name, last_name, pincode, driver, license, **extra_fields):
        if not username:
            raise ValueError("username number is required")
        if not password:
            raise ValueError("Password is required")

        user = self.model(
            username=username,
            first_name=first_name,
            last_name=last_name,
            pincode=pincode,
            driver=driver,
            license=license,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, first_name, last_name, pincode, driver, license, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, password, first_name, last_name, pincode, driver, license, **extra_fields)

    def create_superuser(self, username, first_name, last_name, pincode, driver, license, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(username, password, first_name, last_name, pincode, driver, license, **extra_fields)

class UserProfile(AbstractUser, PermissionsMixin):
    phone_number_validator = RegexValidator(
        regex=r'^\d{10}$',
        message='Phone number must be 10 digits.'
    )

    pincode_validator = RegexValidator(
        regex=r'^\d{6}$',
        message='Pincode must be 6 digits.'
    )

    username = models.CharField(max_length=15, unique=True, validators=[phone_number_validator])
    pincode = models.CharField(max_length=15, validators=[pincode_validator])
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    driver = models.BooleanField(default=False, blank = False)
    license = models.CharField(max_length=16, default="-1")

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['pincode', 'first_name', 'last_name','driver','license']

    objects = CustomUserManager()

    def __str__(self):
        return self.username


class Product(models.Model):
    pincode_validator = RegexValidator(
        regex=r'^\d{6}$',
        message='Pincode must be 6 digits.'
    )

    from_user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    available_from = models.DateField(default=timezone.now)  # Updated default value
    available_till = models.DateField()
    ask_price = models.FloatField(default=1000)  # per hour
    image_link = models.TextField(default="https://imgs.search.brave.com/hAms7Mcn0oyMfQqK0Z5RpLqQAAqAspgu5SSYdK8nOSk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTcz/NTgwOTMzL3Bob3Rv/L3RyYWN0b3IuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPXR6/T1J6eHgzX3MzTm1E/ZWJQbThpMGk5TmY1/VkRONUhyVUdMMkNS/NjVZNjA9")
    description = models.TextField()
    pincode = models.CharField(max_length=10, validators=[pincode_validator])
    product_type = models.CharField(max_length=200, default="")
    company_name = models.CharField(max_length=200, default="")
    taluka = models.CharField(max_length=200, default="")



class Booking(models.Model):
    id = models.CharField(max_length=300, primary_key=True, default="")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    asker = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    number_of_hours = models.IntegerField(default=1)
    status = models.CharField(max_length=20, choices=(("pending", "pending"), ("accepted", "accepted"), ("rejected", "rejected")), default="pending")
    booker_sign = models.BooleanField(default=False)
    lender_sign = models.BooleanField(default=False)
    when_date = models.DateField(default="2024-02-02")

    def save(self, *args, **kwargs):
        if not self.id:  # Check if the object already has an ID
            self.id = str(generate_random_code(8))
        super().save(*args, **kwargs)

    def __str__(self):
        return self.id



class Addride(models.Model):
    from_user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    driver_name= models.CharField(max_length=200, default="")
    vehicle_name= models.CharField(max_length=200, default="")
    location_from=models.CharField(max_length=200, default="")
    location_to =models.CharField(max_length=200, default="")
    available_on = models.DateField(default=timezone.now) 
    departure_time = models.TimeField(default=timezone.now)
    price_ton=models.FloatField(default=0)
    capacity=models.FloatField(default=0)
    specifications = models.TextField()


class RideBooking(models.Model):
    id = models.CharField(max_length=200, primary_key=True, default="")
    ride = models.ForeignKey(Addride, on_delete=models.CASCADE)
    asker = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    weight_occu = models.FloatField(default = 0)
    ride_complete = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.id:  # Check if the object already has an ID
            self.id = str(generate_random_code(8))
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.id
