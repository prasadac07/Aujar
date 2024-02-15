from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import RegexValidator
from django.db import models

class UserProfileManager(BaseUserManager):
    def create_user(self, first_name, last_name, phone_number, pincode, password=None, **extra_fields):
        user = self.model(
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
            pincode=pincode,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, first_name, last_name, phone_number, pincode, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(first_name, last_name, phone_number, pincode, password, **extra_fields)

class UserProfile(AbstractBaseUser, PermissionsMixin):
    phone_number_validator = RegexValidator(
        regex=r'^\d{10}$',
        message='Phone number must be 10 digits.'
    )

    pincode_validator = RegexValidator(
        regex=r'^\d{6}$',
        message='Pincode must be 6 digits.'
    )

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=15, unique=True, validators=[phone_number_validator])
    pincode = models.CharField(max_length=10, validators=[pincode_validator])
    password = models.CharField(max_length=255)
    confirm_password = models.CharField(max_length=255, default='')

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'pincode']

    def save(self, *args, **kwargs):
        # Use Django's default hashing mechanism provided by set_password method
        self.set_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.phone_number




