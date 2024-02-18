# account/admin.py
from django.contrib import admin
from .models import UserProfile, Product, Booking, Addride, RideBooking

admin.site.register(UserProfile)
admin.site.register(Product)
admin.site.register(Booking)
admin.site.register(Addride)
admin.site.register(RideBooking)
