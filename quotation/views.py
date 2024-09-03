from .models import *
from budget.models import *
from rest_framework.exceptions import NotFound
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.utils import IntegrityError
# new imports
from django.shortcuts import get_object_or_404
from uuid import uuid4
import os
import io
from django.core.files.base import ContentFile
from django.db import transaction

@api_view(['POST'])
def get_req(request):
    selected_year = request.data.get('selectedYear')
    financial_year = financialyear.objects.get(Desc=selected_year).F_year
    username = request.data.get('username')
    dept = User.objects.get(u_email=username).u_dep
    try:
        req_data = list(requirement.objects.filter(dept=dept, F_year=financial_year).values('req_name'))
        return Response(req_data)
    except requirement.DoesNotExist:
        raise NotFound(detail="Specified year not found")

@api_view(['POST'])
def add_req(request):
    selected_year = request.data.get('selectedYear')
    financial_year = financialyear.objects.get(Desc=selected_year).F_year
    username = request.data.get('username')
    dept = User.objects.get(u_email=username).u_dep
    req_name = request.data.get('req_name')
    try:
        requirement.objects.create(
            dept=dept,
            F_year=financial_year,
            req_name=req_name
        )
        return Response({'message': 'Requirement created successfully'}, status=201)
    except IntegrityError:
        return Response({'message': 'Requirement already exists'}, status=400)
    except Exception as e:
        return Response({'message': 'Failed to create requirement', 'error': str(e)}, status=400)

@api_view(['POST'])
def rename_req(request):
    selected_year = request.data.get('selectedYear')
    financial_year = financialyear.objects.get(Desc=selected_year).F_year
    username = request.data.get('username')
    dept = User.objects.get(u_email=username).u_dep
    old_name = request.data.get('old_name')
    new_name = request.data.get('new_name')

    try:
        # Check if a requirement with the new name already exists
        if requirement.objects.filter(dept=dept, F_year=financial_year, req_name=new_name).exists():
            return Response({'message': 'A requirement with the new name already exists'}, status=400)

        # Update the requirement name using the update() method
        rows_updated = requirement.objects.filter(
            dept=dept,
            F_year=financial_year,
            req_name=old_name
        ).update(req_name=new_name)

        if rows_updated == 0:
            return Response({'message': 'Requirement not found or already updated'}, status=404)

        return Response({'message': 'Requirement renamed successfully'}, status=200)

    except Exception as e:
        return Response({'message': 'Failed to rename requirement', 'error': str(e)}, status=400)

@api_view(['POST'])
def delete_req(request):
    selected_year = request.data.get('selectedYear')
    financial_year = financialyear.objects.get(Desc=selected_year).F_year
    username = request.data.get('username')
    dept = User.objects.get(u_email=username).u_dep
    req_name = request.data.get('req_name')
    try:
        req = requirement.objects.get(dept=dept, F_year=financial_year, req_name=req_name)
        req.delete()
        return Response({'message': 'Requirement deleted successfully'}, status=200)
    except requirement.DoesNotExist:
        raise NotFound(detail="Requirement not found")
    except Exception as e:
        return Response({'message': 'Failed to delete requirement', 'error': str(e)}, status=400)
    
@api_view(['POST'])
def upload_quotation(request):
    username = request.data.get('username')
    selectedYear = request.data.get('selectedYear')
    branch = User.objects.get(u_email=username).u_dep

    try:
        year = financialyear.objects.get(Desc=selectedYear).F_year
    except financialyear.DoesNotExist:
        raise NotFound(detail='Specified year not found')
    
    file = request.FILES.get('file')
    if file:
        content = file.read()
        content_file = io.BytesIO(content)
        content_file.seek(0)

        pdf_id = uuid4().hex

        try:
            with transaction.atomic():
                # Retrieve the requirement name based on department and financial year
                requirement_obj = get_object_or_404(requirement, dept=branch, F_year=year)
                req_name = requirement_obj.req_name

                # now insert the pdf entry
                quotation.objects.create(
                    dept=branch,
                    f_year=year,
                    pdf_file=ContentFile(content_file.read(),name=file.name),
                    pdf_id=pdf_id,
                    pdf_name=file.name,
                    req_name=req_name  # Add the retrieved requirement name here
                )
                return Response({'message': 'Quotation uploaded successfully'}, status=200)
        except Exception as e:
            return Response({'message': 'Failed to upload quotation', 'error': str(e)}, status=500)
    else:
        return Response({'message': 'No file provided'}, status=400)