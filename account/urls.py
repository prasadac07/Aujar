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
]