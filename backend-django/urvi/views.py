# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from . import views
from .serializers import *
from django.contrib.auth import authenticate, login  # Add this import
from django.http import JsonResponse
from django.http import HttpResponse
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from .models import *
from django.shortcuts import render
from .pdf_generator import generate_pdf

class EmailVerificationView(APIView):
    def post(self, request):
        email = request.data.get('email')

        try:
            user = User.objects.get(u_email=email)
        except User.DoesNotExist:
            return Response({"is_verified": False}, status=400)

        # Here you can implement your email verification logic.
        # For simplicity, we assume verification is successful if the email exists.
        return Response({"is_verified": True}, status=200)
    
# class LoginView(APIView):
#     def post(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')
#         user = authenticate(request, username=email, password=password)

#         if user is not None:
#             login(request, user)
#             return JsonResponse({'message': 'Login successful'})
#         else:
#             return JsonResponse({'message': 'Login failed'}, status=401)


def generate_pdf_view(request):
    queryset_itemmaster = itemmaster.objects.all()
    # queryset_budget = budget.objects.all()
    return generate_pdf(queryset_itemmaster)




