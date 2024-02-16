from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from .models import UserProfile, Booking, Product
from .serializers import UserProfileSerializer, LoginSerializer, ProductSerializer, BookingSerializer
from django.middleware import csrf
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import get_user_model

User = get_user_model()

class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone_number = serializer.validated_data['mobile']
        password = serializer.validated_data['password']

        # Authenticate user
        user = authenticate(request, username=phone_number, password=password)
        print(user)
        if user:
            # login(request, user)
            token_obj, _ = Token.objects.get_or_create(user=user)
            token_obj.save()

            response = Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
            response['Authorization'] = "token " + str(token_obj)
            return response
        else:
            return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)




class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get the user associated with the token
        user = request.user

        # Delete the existing token for the user
        Token.objects.filter(user=user).delete()

        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)

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



class InformationProduct(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        data = request.data

        payload = {
                "available_till": data["available_till"],
                "ask_price": data["ask_price"],
                "image_link": data["image_link"],
                "pincode": data["pincode"],
                "description": data["description"],
                "from_user": user.id,
                "available_from": data["available_from"],
                "product_type": data["product_type"],
                "company_name": data["company_name"]
            }


        print(payload)
        print(user.mobile)
        ser = ProductSerializer(data=payload)

        if ser.is_valid():
            ser.save()
            return Response({"messege": "product created"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"messege": "invalid request"}, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request):
        prdt = Product.objects.all().order_by('-id')
        ser = ProductSerializer(prdt, many=True)
        return Response(ser.data, status=status.HTTP_200_OK)


class getall(APIView):
    def get(self, request):
        prdt = Product.objects.all().order_by('-id')
        ser = ProductSerializer(prdt, many=True)
        return Response(ser.data, status=status.HTTP_200_OK)




class BookProduct(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        prdtid = request.data["product_id"]
        user = request.user

        if user.id != Product.objects.get(id = prdtid).from_user:
            payload = {
                "product": prdtid,
                "asker": user.id
            }
            ser = BookingSerializer(data=payload)
            if ser.is_valid():
                ser.save()
                return Response({"messege": "booking successfull"}, status=status.HTTP_200_OK)
            else:
                return Response({"messege": "invalid data"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"messege": "cannot book your own item"}, status=status.HTTP_400_BAD_REQUEST)







