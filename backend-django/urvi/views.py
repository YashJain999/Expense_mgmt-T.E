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
from django.http import Http404

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

@api_view(['GET'])
def dropdown(request):
    years = financialyear.objects.values_list('Desc', flat=True)
    return Response(years)


@api_view(['GET'])
def get_financialyears(request):
    years = financialyear.objects.values_list('F_year', flat=True)
    desc = financialyear.objects.values_list('Desc', flat=True)
    return Response({'years': list(years), 'desc': list(desc)}, status=status.HTTP_200_OK)

@api_view(['POST'])
def getyear(request):
    selected_year = request.data.get('selectedYear')
    # generate_pdf_view(selected_year)
    return Response({'selectedYear': selected_year})
    
@api_view(['GET'])
def generate_pdf_view(request,selected_year):
    try:
        # selected_year = request.data.get('selectedYear')
        f_year_obj = financialyear.objects.get(Desc=selected_year)
        f_year_value = f_year_obj.F_year
        queryset_itemmaster = itemmaster.objects.all()
        return generate_pdf(selected_year)
    except financialyear.DoesNotExist:
        raise Http404("Financial Year matching query does not exist")

@api_view(['POST'])
def get_budget_data(request):
    selected_year = request.data.get('selectedYear')
    financial_year = financialyear.objects.get(Desc=selected_year)
    desc = financial_year.F_year

    # Convert the years to the required format
    previous_years = [f"{year}-{year + 1}" for year in range(desc, desc - 4, -1)]

    budget_data = list(budget.objects.filter(dept='IT', f_year__in=previous_years).values('item', 'budgeted_amt', 'actual_exp'))
    print(budget_data)
    return Response(budget_data)

@api_view(['POST'])
def post_year_desc(request):
    F_year = request.data.get('F_year')
    Desc = request.data.get('Desc')
    if F_year is not None and Desc is not None:
        financial_year = financialyear.objects.create(F_year=F_year, Desc=Desc)
        # Add any additional logic or error handling here
        return Response({'message': 'Data added successfully'})
    else:
        return Response({'error': 'Invalid data provided'}, status=400)


    

