from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserProfile, Product, Booking
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from .models import UserProfile, Booking, Product
from .serializers import UserProfileSerializer, LoginSerializer, ProductSerializer, BookingSerializer
from django.middleware import csrf
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import get_user_model
import logging

logger = logging.getLogger(__name__)
User = get_user_model()
#
# class LoginView(APIView):
#     def post(self, request, *args, **kwargs):
#         serializer = LoginSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#
#         username = serializer.validated_data['username']
#         password = serializer.validated_data['password']
#         # print(serializer.validated_data, username, password)
#         # Authenticate user
#         user = authenticate(request, username=username, password=password)
#
#         logger.debug(f"Attempting login for user: {username}")
#
#         if user:
#             user.save()
#
#             # expiration_time = datetime.now() + timedelta(seconds=20)
#
#             token_obj, _ = Token.objects.get_or_create(user=user)
#             # token_obj.expires_at = expiration_time
#             token_obj.save()
#
#             response = Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
#
#             response['Authorization'] = "token " + str(token_obj)
#
#             return response
#         else:
#             return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
#
#
# class LogoutView(APIView):
#
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]
#
#     def get(self, request):
#         # Get the user associated with the token
#         user = request.user
#
#         # Delete the existing token for the user
#         Token.objects.filter(user=user).delete()
#
#         return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
#
# class RegisterUserView(generics.CreateAPIView):
#     queryset = UserProfile.objects.all()
#     serializer_class = UserProfileSerializer
#
#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#
#         serializer.save()
#
#         return Response({
#             "message": "User registered successfully."
#         }, status=status.HTTP_201_CREATED)

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from .models import UserProfile
from .serializers import UserProfileSerializer, LoginSerializer
from django.middleware import csrf
#asa
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        # Authenticate user
        user = authenticate(request, username=username, password=password)

        if user:
            login(request, user)
            return Response({"message": "Login successful."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Logout the user
        logout(request)

        # Clear session data
        request.session.flush()

        # Delete all cookies
        response = Response({"message": "Logout successful."}, status=status.HTTP_200_OK)
        response.delete_cookie('sessionid')
        response.delete_cookie('csrftoken')  # If CSRF protection is enabled
        # Add more cookie names if needed

        return response


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
    # authentication_classes = [BasicAuthentication]
    # permission_classes = [IsAuthenticated]

    def post(self, request):

        data = request.data
        user = UserProfile.objects.get(id = 3)
        # if request.META.get('HTTP_CONTENT_TYPE'):
        #     print(request.META.get('HTTP_CONTENT_TYPE'))
        # print(request.META)
        for key, value in request.META.items():
            if key.startswith('HTTP'):
                print(f"{key}: {value}")


        image = "https://imgs.search.brave.com/hAms7Mcn0oyMfQqK0Z5RpLqQAAqAspgu5SSYdK8nOSk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTcz/NTgwOTMzL3Bob3Rv/L3RyYWN0b3IuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPXR6/T1J6eHgzX3MzTm1E/ZWJQbThpMGk5TmY1/VkRONUhyVUdMMkNS/NjVZNjA9"

        payload = {
                "available_till": data["available_till"],
                "ask_price": data["ask_price"],
            "image_link": image,
            "pincode": data["pincode"],
                "description": data["description"],
                "from_user": user.id,
                "available_from": data["available_from"],
                "product_type": data["product_type"],
                "company_name": data["company_name"],
                "taluka": data["taluka"]
            }


        # print(payload)
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
        print(UserProfile.objects.get(username=8888899999).id)
        return Response(ser.data, status=status.HTTP_200_OK)




class BookProduct(APIView):
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        prdtid = request.data["id"]
        num_hrs = int(request.data["hours"])
        user = UserProfile.objects.get(id = 4)

        product = Product.objects.get(id = int(prdtid))
        # user_id = request.data["user_id"]

        # userr = UserProfile.objects.get(username = product.from_user)
        # print(user.id, userr.id)

        if 'status' in request.data and request.data["status"]:
            stattus = request.data["status"]
        else:
            stattus = "pending"

        # if user.id != userr.id:
        payload = {
                "product": prdtid,
                "asker": user.id,
                "status": stattus,
                "number_of_hours": num_hrs,
                "lender_sign": False,
                "booker_sign": False
            }
        ser = BookingSerializer(data=payload)
        if ser.is_valid():
                ser.save()
                return Response({"messege": "booking successfull"}, ser.data, status=status.HTTP_200_OK)
        else:
                return Response({"messege": "invalid data"}, status=status.HTTP_400_BAD_REQUEST)
        # else:
        #     return Response({"messege": "cannot book your own item"}, status=status.HTTP_400_BAD_REQUEST)


class UpdateBookingStatus(APIView):
    def put(self, request, pk):
        booking = Booking.objects.get(id=pk)
        if 'status' in request.data:
            if request.data["status"] == "pending":
                return Response({"messege": "no change in booking"}, status=status.HTTP_304_NOT_MODIFIED)
            elif request.data["status"] == "rejected":
                booking.status = "rejected"
                booking.save()
                ser = BookingSerializer(instance=booking)
                return Response({"messge": "request rejected"}, ser.data, status.HTTP_200_OK)
            elif request.data["status"] == "accepted":
                booking.status= "accepted"
                booking.save()
                ser = BookingSerializer(instance=booking)
                ser.is_valid(raise_exception=True)
                return Response({"messege": "cahnges status"}, ser.data, status=status.HTTP_200_OK)
        else:
            data = request.data

            if booking.status == "rejected":
                ser = BookingSerializer(instance=booking)
                return Response({"messege": "booking rejected"}, ser.data , status=status.HTTP_204_NO_CONTENT)

            if booking.status == "pending":
                ser = BookingSerializer(instance=booking)
                return Response({"messege": "booking still pending"}, ser.data, status=status.HTTP_200_OK)

            if "lender_sign" in data:
                booking.lender_sign = data["lender_sign"]
                booking.save()
            if "booker_sign" in data:
                booking.booker_sign = data["booker_sign"]
                booking.save()

            







