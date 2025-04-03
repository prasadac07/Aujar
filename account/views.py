from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserProfile, Product, Booking
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from .models import UserProfile, Booking, Product
from .serializers import UserProfileSerializer, LoginSerializer, ProductSerializer, BookingSerializer, ProductUpdateSerializer
from django.middleware import csrf
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import get_user_model
import logging
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from django.core.files.uploadedfile import InMemoryUploadedFile
import cloudinary.uploader

from .models import Product, UserProfile
from .serializers import ProductSerializer
from rest_framework.authtoken.models import Token
import os
from dotenv import load_dotenv

load_dotenv()



cloudinary.config( 
  cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME'), 
  api_key = os.getenv('CLOUDINARY_API_KEY'), 
  api_secret = os.getenv('CLOUDINARY_API_SECRET'),
)


logger = logging.getLogger(__name__)
User = get_user_model()

# class gettoken(APIView):
#     def post(self, request):
#         data = request.data
#
#         if 'mobile' in data:
#             token = get

class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        # print(serializer.validated_data, username, password)
        # Authenticate user
        user = authenticate(request, username=username, password=password)

        logger.debug(f"Attempting login for user: {username}")

        if user:
            user.save()

            # expiration_time = datetime.now() + timedelta(seconds=20)

            token_obj, _ = Token.objects.get_or_create(user=user)
            # token_obj.expires_at = expiration_time
            token_obj.save()

            response = Response({'message': 'Login successful', "token": str(token_obj)}, status=status.HTTP_200_OK)

            response['Authorization'] = "token " + str(token_obj)
            response.set_cookie('token', str(token_obj), max_age=None, httponly=True)

            return response
        else:
            return Response({"messege": "error"}, status=status.HTTP_400_BAD_REQUEST)




class LogoutView(APIView):

    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        token = request.COOKIES.get('token')

        if not token:
            return Response({'error': 'Token not found in cookies'}, status=status.HTTP_401_UNAUTHORIZED)

        # Verify the token
        try:
            token_obj = Token.objects.get(key=token)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token')

        # Token is valid, continue processing the request
        # For example, you can access the user associated with the token
        user = token_obj.user
        # Get the user associated with the token

        # Delete the existing token for the user
        Token.objects.filter(user=user).delete()
        response = Response({"message": "Logout successful"}, status=status.HTTP_200_OK)

        for cookie_name in request.COOKIES.keys():
            response.delete_cookie(cookie_name)

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

# from rest_framework import generics, status
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework.authentication import SessionAuthentication, BasicAuthentication
# from rest_framework.permissions import IsAuthenticated
# from django.contrib.auth import authenticate, login, logout
# from .models import UserProfile
# from .serializers import UserProfileSerializer, LoginSerializer
# from django.middleware import csrf
#asa
# class LoginView(APIView):
#     def post(self, request, *args, **kwargs):
#         serializer = LoginSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#
#         username = serializer.validated_data['username']
#         password = serializer.validated_data['password']
#
#         # Authenticate user
#         user = authenticate(request, username=username, password=password)
#
#         if user:
#             login(request, user)
#             return Response({"message": "Login successful."}, status=status.HTTP_200_OK)
#         else:
#             return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)
#
#
# class LogoutView(APIView):
#     authentication_classes = [SessionAuthentication, BasicAuthentication]
#     permission_classes = [IsAuthenticated]
#
#     def get(self, request, *args, **kwargs):
#         # Logout the user
#         logout(request)
#
#         # Clear session data
#         request.session.flush()
#
#         # Delete all cookies
#         response = Response({"message": "Logout successful."}, status=status.HTTP_200_OK)
#         response.delete_cookie('sessionid')
#         response.delete_cookie('csrftoken')  # If CSRF protection is enabled
#         # Add more cookie names if needed
#
#         return response
#
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


class InformationProduct(APIView):

    def post(self, request):
        token = request.META.get('HTTP_TOKEN')

        if not token:
            return Response({'error': 'Token not found'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            token_obj = Token.objects.get(key=token)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token')

        user = token_obj.user
        data = request.data

        # Check if image is provided
        image_url = None
        if 'image' in request.FILES:
            uploaded_image = request.FILES['image']

            # Upload image to Cloudinary
            result = cloudinary.uploader.upload(uploaded_image)
            image_url = result['secure_url']  # Cloudinary stores the image URL

        # Payload with Cloudinary image URL
        payload = {
            "available_till": data["available_till"],
            "ask_price": data["ask_price"],
            "image_link": image_url,
            "pincode": data["pincode"],
            "description": data["description"],
            "from_user": user.id,
            "available_from": data["available_from"],
            "product_type": data["product_type"],
            "company_name": data["company_name"],
            "taluka": data["taluka"]
        }

        serializer = ProductSerializer(data=payload)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Product created", "image_url": image_url}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "Invalid request", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        token = request.META.get('HTTP_TOKEN')

        if not token:
            return Response({'error': 'Token not found'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            token_obj = Token.objects.get(key=token)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token')

        user = token_obj.user
        products = Product.objects.exclude(from_user=user).order_by('-id')

        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


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

        token = request.META.get('HTTP_TOKEN')

        if not token:
            return Response({'error': 'Token not found in cookies'}, status=status.HTTP_401_UNAUTHORIZED)

        # Verify the token
        try:
            token_obj = Token.objects.get(key=token)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token')

        # Token is valid, continue processing the request
        # For example, you can access the user associated with the token
        user = token_obj.user

        prdtid = request.data["id"]
        num_hrs = int(request.data["hours"])
        # user = UserProfile.objects.get(id = 4)

        product = Product.objects.get(id = int(prdtid))
        # user_id = request.data["user_id"]

        userr = UserProfile.objects.get(username = product.from_user)
        print(user.id, userr.id)

        if 'status' in request.data and request.data["status"]:
            stattus = request.data["status"]
        else:
            stattus = "pending"

        if user.id != userr.id:
            payload = {
                    "product": prdtid,
                    "asker": user.id,
                    "status": stattus,
                    "number_of_hours": num_hrs,
                    "lender_sign": False,
                    "booker_sign": False,
                    "when_date": request.data["date"]
                }
            ser = BookingSerializer(data=payload)
            if ser.is_valid():
                    ser.save()
                    return Response({"messege": "booking successfull", "data": ser.data}, status=status.HTTP_200_OK)
            else:
                    return Response({"messege": "invalid data"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"messege": "cannot book your own item"}, status=status.HTTP_400_BAD_REQUEST)


class UpdateBookingStatus(APIView):
    def put(self, request, pk):


        token = request.META.get('HTTP_TOKEN')

        if not token:
            return Response({'error': 'Token not found in cookies'}, status=status.HTTP_401_UNAUTHORIZED)

        # Verify the token
        try:
            token_obj = Token.objects.get(key=token)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token')

        # Token is valid, continue processing the request
        # For example, you can access the user associated with the token
        user = token_obj.user

        # token = request.COOKIES.get('token')

        # if not token:
        #     return Response({'error': 'Token not found in cookies'}, status=status.HTTP_401_UNAUTHORIZED)
        #
        # # Verify the token
        # try:
        #     token_obj = Token.objects.get(key=token)
        # except Token.DoesNotExist:
        #     raise AuthenticationFailed('Invalid token')
        #
        # # Token is valid, continue processing the request
        # # For example, you can access the user associated with the token
        # user = token_obj.user
        booking = Booking.objects.get(id=int(pk))
        product_lender = booking.product.from_user
        product_lender = UserProfile.objects.get(username=product_lender)

        data = request.data
        product_user = UserProfile.objects.get(username = booking.asker)

        print(product_user.id, product_lender.id)

        if booking.status == "accepted" and booking.lender_sign and booking.booker_sign:
            ser = BookingSerializer(instance=booking)
            return Response({"messege": "this request has been completed", "data": ser.data},  status=status.HTTP_200_OK)

        if 'status' in request.data:
            if request.data["status"] == "pending":
                return Response({"messege": "no change in booking"}, status=status.HTTP_304_NOT_MODIFIED)
            if user == product_lender:
                booking.status= request.data.get("status")
                booking.save()
                ser = BookingSerializer(instance=booking)
                # ser.is_valid(raise_exception=True)
                return Response({"messege": "changes status", "data":ser.data},  status=status.HTTP_200_OK)
            else:
                ser = BookingSerializer(instance=booking)
                return Response({"messege": "cannot make this change", "data":ser.data}, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
        else:
            data = request.data

            if booking.status == "rejected":
                ser = BookingSerializer(instance=booking)
                return Response({"messege": "booking rejected", "data": ser.data }, status=status.HTTP_204_NO_CONTENT)

            if booking.status == "pending":
                ser = BookingSerializer(instance=booking)
                return Response({"messege": "booking still pending", "data": ser.data},  status=status.HTTP_200_OK)

            if user == product_lender:
                if "lender_sign" in data:
                    booking.lender_sign = data["lender_sign"]
                    booking.save()

            elif user == product_user:
                if "booker_sign" in data:
                    booking.booker_sign = data["booker_sign"]
                    booking.save()
            # if (user != product_user and ("lender_sign" in data)) or (user != product_lender and ("booker_sign" in data)):
            #     ser = BookingSerializer(instance=booking)
            #     return Response({"messege": "you are not autherized", "data": ser.data}, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

            ser = BookingSerializer(instance=booking)
            # ser.is_valid(raise_exception=True)
            return Response(ser.data, status=status.HTTP_200_OK)


class CheckBooking(APIView):
    def get(self, request):
        token = request.META.get('HTTP_TOKEN')
        if not token:
            return Response({'error': 'Token not found in headers'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            token_obj = Token.objects.get(key=token)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token')

        user = token_obj.user

        # Fetch bookings where the current user is the booker (asker)
        booking_objs = Booking.objects.filter(asker=user)
        ser = BookingSerializer(booking_objs, many=True)
        payload = ser.data

        # Enhance each booking record with additional details
        for p in payload:
            # Get the related product
            prdt = Product.objects.get(id=int(p["product"]))
            p["price"] = float(p["number_of_hours"]) * prdt.ask_price
            p["equipement_type"] = prdt.product_type

            # If the booking is accepted, add details of the product owner
            if p["status"] == "accepted":
                owner = prdt.from_user
                p["owner_name"] = f"{owner.first_name} {owner.last_name}"
                p["owner_phone"] = owner.username  # Phone stored in username

        if not booking_objs:
            return Response({"message": "No bookings found for this user"}, status=status.HTTP_404_NOT_FOUND)

        return Response(payload, status=status.HTTP_200_OK)


class CheckRequests(APIView):
    def get(self, request):
        token = request.META.get('HTTP_TOKEN')
        if not token:
            return Response({'error': 'Token not found in headers'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            token_obj = Token.objects.get(key=token)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token')

        user = token_obj.user

        # Get the products owned by the current user
        user_products = Product.objects.filter(from_user=user)
        # Filter bookings that have been made on the user's products
        bookings = Booking.objects.filter(product__in=user_products).order_by('-id')
        ser = BookingSerializer(bookings, many=True)
        payload = ser.data

        for p in payload:
            prdt = Product.objects.get(id=int(p["product"]))
            p["price"] = float(p["number_of_hours"]) * prdt.ask_price
            p["equipement_type"] = prdt.product_type

            # If the booking is accepted, attach details of the person who made the booking
            if p["status"] == "accepted":
                asker = UserProfile.objects.get(id=int(p["asker"]))
                p["asker_name"] = f"{asker.first_name} {asker.last_name}"
                p["asker_phone"] = asker.username

        return Response(payload, status=status.HTTP_200_OK)








class UserProductsView(APIView):
    def get(self, request):
        # Get token from request headers
        token = request.META.get('HTTP_TOKEN')
        
        if not token:
            return Response({'error': 'Token not found in headers'}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Verify the token
        try:
            token_obj = Token.objects.get(key=token)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token')
        
        # Get the authenticated user
        user = token_obj.user
        
        # Fetch products posted by the user
        user_products = Product.objects.filter(from_user=user).order_by('-id')
        
        # Serialize the products
        serializer = ProductSerializer(user_products, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk):
        # Get token from request headers
        token = request.META.get('HTTP_TOKEN')
        
        if not token:
            return Response({'error': 'Token not found in headers'}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Verify the token
        try:
            token_obj = Token.objects.get(key=token)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token')
        
        # Get the authenticated user
        user = token_obj.user
        
        try:
            # Get the product with the given ID that belongs to the current user
            product = Product.objects.get(id=pk, from_user=user)
        except Product.DoesNotExist:
            return Response(
                {"message": "Product not found or you don't have permission to update it"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Validate and update the product
        serializer = ProductUpdateSerializer(product, data=request.data, partial=True)
        
        if serializer.is_valid():
            # Perform validation for dates
            if 'available_from' in request.data and 'available_till' in request.data:
                from_date = serializer.validated_data.get('available_from')
                till_date = serializer.validated_data.get('available_till')
                
                # Ensure available_till is after available_from
                if till_date <= from_date:
                    return Response(
                        {"message": "Available Till date must be after Available From date"}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            # Save the updated product
            serializer.save()
            return Response(
                {"message": "Product updated successfully", "data": serializer.data}, 
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"message": "Invalid data", "errors": serializer.errors}, 
                status=status.HTTP_400_BAD_REQUEST
            )
    
    def delete(self, request, pk):
        # Get token from request headers
        token = request.META.get('HTTP_TOKEN')
        
        if not token:
            return Response({'error': 'Token not found in headers'}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Verify the token
        try:
            token_obj = Token.objects.get(key=token)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token')
        
        # Get the authenticated user
        user = token_obj.user
        
        try:
            # Get the product with the given ID that belongs to the current user
            product = Product.objects.get(id=pk, from_user=user)
        except Product.DoesNotExist:
            return Response(
                {"message": "Product not found or you don't have permission to delete it"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Check if there are any accepted bookings for this product
        has_accepted_bookings = Booking.objects.filter(
            product=product, 
            status="accepted"
        ).exists()
        
        if has_accepted_bookings:
            return Response(
                {"message": "Cannot delete product with accepted bookings"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Delete the product
        product.delete()
        return Response(
            {"message": "Product deleted successfully"}, 
            status=status.HTTP_200_OK
        )