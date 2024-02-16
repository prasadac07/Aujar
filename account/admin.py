# account/admin.py
from django.contrib import admin
from .models import UserProfile, Product, Booking

admin.site.register(UserProfile)
admin.site.register(Product)
admin.site.register(Booking)
