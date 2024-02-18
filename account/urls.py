from django.urls import path
from .views import RegisterUserView,LoginView, LogoutView
from .views import *

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('postproduct/', InformationProduct.as_view()),
    path('bookproduct/', BookProduct.as_view()),
    path('all/', getall.as_view()),
    path('update-status/', UpdateBookingStatus.as_view()),
    path('check-my-bookings/', CheckBooking.as_view()),
    path('check-requests/', CheckRequests.as_view()),
    path('postdrive/', InformationAddride.as_view()),
    path('bookride/', BookRide.as_view()),
    path('show-my-rides/', ShowRideBookings.as_view()),
    path("show-my-requests/", ShowPeopleBooking.as_view()),
    path('ride-update-status/<str:pk>/', UpdateRideBookingStatus.as_view()),

]