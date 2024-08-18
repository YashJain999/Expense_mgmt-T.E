from .models import *
from budget.models import *
from rest_framework.exceptions import NotFound
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.utils import IntegrityError


@api_view(['POST'])
def get_req(request):
    selected_year = request.data.get('selectedYear')
    financial_year = financialyear.objects.get(Desc=selected_year).F_year
    username = request.data.get('username') 
    dept=User.objects.get(u_email=username).u_dep 
    try:
        req_data = list(requirement.objects.filter(dept=dept, F_year=financial_year).values('req_name'))
        print(req_data)
        return Response(req_data)
    except requirement.DoesNotExist:
        raise NotFound(detail="Specified year not found")
    
@api_view(['POST'])
def add_req(request):
    selected_year = request.data.get('selectedYear')
    financial_year = financialyear.objects.get(Desc=selected_year).F_year
    username = request.data.get('username') 
    dept=User.objects.get(u_email=username).u_dep 
    req_name=request.data.get('req_name')
    try:
        requirement.objects.create(
            dept=dept,
            F_year=financial_year,
            req_name=req_name
        )
        return Response({'message': 'User created successfully'}, status=201)
    except IntegrityError:
        return Response({'message': 'Email already exists'}, status=400)
    except Exception as e:
        return Response({'message': 'Failed to create user','error':e}, status=400)  
        