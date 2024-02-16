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

def generate_random_code(length=8):
    """Generate a random string of digits."""
    digits = string.digits
    return ''.join(random.choice(digits) for _ in range(length))

class CustomUserManager(BaseUserManager):
    def _create_user(self, username, password, first_name, last_name, pincode, **extra_fields):
        if not username:
            raise ValueError("username number is required")
        if not password:
            raise ValueError("Password is required")

        user = self.model(
            username=username,
            first_name=first_name,
            last_name=last_name,
            pincode=pincode,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self,username ,first_name, last_name, pincode, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, password, first_name, last_name, pincode, **extra_fields)

    def create_superuser(self, username, first_name, last_name, pincode, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(username, password, first_name, last_name, pincode, **extra_fields)

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

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['pincode', 'first_name', 'last_name']

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
    image_link = models.TextField(default="")
    description = models.TextField()
    pincode = models.CharField(max_length=10, validators=[pincode_validator])
    product_type = models.CharField(max_length=200, default="")
    company_name = models.CharField(max_length=200, default="")
    taluka = models.CharField(max_length=200, default="")
    # district =


# @receiver(post_save, sender=Product)
# def delete_expired_product(sender, instance, **kwargs):
#     if instance.available_till < timezone.now().date():
#         instance.delete()


class Booking(models.Model):
    id = models.CharField(max_length=300, primary_key=True, default="")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    asker = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    def save(self, *args, **kwargs):
        self.id = str(generate_random_code(8))
        super().save(*args, **kwargs)

    def __str__(self):
        return self.id




