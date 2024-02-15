from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from .models import UserProfile
from .serializers import UserProfileSerializer, LoginSerializer
from django.middleware import csrf

class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone_number = serializer.validated_data['phone_number']
        password = serializer.validated_data['password']

        # Authenticate user
        user = authenticate(request, phone_number=phone_number, password=password)

        if user:
            login(request, user)
            return Response({"message": "Login successful."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({"message": "Logout successful."}, status=status.HTTP_200_OK)

class RegisterUserView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response({
            "message": "User registered successfully."
        }, status=status.HTTP_201_CREATED)
