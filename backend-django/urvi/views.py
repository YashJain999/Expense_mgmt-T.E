# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from rest_framework.decorators import api_view
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
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User

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


def generate_pdf_view(request):
    queryset_itemmaster = itemmaster.objects.all()
    # queryset_budget = budget.objects.all()
    return generate_pdf(queryset_itemmaster)

@api_view(['POST'])
def update_password(request):
    u_pass = request.data.get('u_pass')
    email = request.data.get('email')  # Make sure you are getting the email from the request

    try:
        user = User.objects.get(u_email=email)
        user.u_pass = u_pass  # Update the password field
        user.save()
        return Response(status=status.HTTP_201_CREATED)
    except User.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'message': 'An error occurred while updating password', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
