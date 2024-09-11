from .models import *
from budget.models import *
from rest_framework.exceptions import NotFound
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.files.storage import FileSystemStorage
from django.db.utils import IntegrityError
from django.conf import settings
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
            return Response({'message': 'A requirement with the new name already exists'})

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
import json  
import traceback
@api_view(['POST'])
def upload_quotation(request):
    try:
        username = request.data.get('username')
        selectedYear = request.data.get('selectedYear')
        branch = User.objects.get(u_email=username).u_dep
        vendor_name = request.data.get('vendor_name')
        file_name = request.data.get('file_name')
        # Fetch the 'items' field and parse it as a list
        pdf_items = json.loads(request.POST.get('items', '[]'))  # Default to empty list if not provided
        # Get the financial year
        year = financialyear.objects.get(Desc=selectedYear).F_year

        file = request.FILES.get('file')
        if file:
            content = file.read()
            content_file = io.BytesIO(content)
            content_file.seek(0)

            pdf_id = uuid4().hex

            with transaction.atomic():
                # Retrieve the requirement name based on department and financial year
                requirement_obj = get_object_or_404(requirement, dept=branch, F_year=year)
                req_name = requirement_obj.req_name

                # Insert the PDF entry
                quotation.objects.create(
                    dept=branch,
                    f_year=year,
                    pdf_file=ContentFile(content_file.read(), name=file.name),
                    pdf_id=pdf_id,
                    pdf_name=file.name,
                    file_name=file_name,
                    vendor_name=vendor_name,
                    req_name=req_name
                )
                print("Quotation saved")
                # Iterate through items and save each one
                for item in pdf_items:
                    items.objects.create(  # Ensure this matches your model name
                        pdf_id=pdf_id,
                        item_name=item['name'],
                        quantity=int(item['quantity']),  # Ensure correct data types
                        price=int(item['price'])        # Ensure correct data types
                    )
                return Response({'message': 'Quotation uploaded successfully'}, status=200)
        else:
            return Response({'message': 'No file provided'}, status=400)
    except financialyear.DoesNotExist:
        return Response({'message': 'Specified year not found'}, status=404)
    except Exception as e:
        print(traceback.format_exc())  # Log the full traceback for debugging
        return Response({'message': 'Failed to upload quotation', 'error': str(e)}, status=500)
    
@api_view(['GET','POST'])
def fetch_req_data(request):
    folder_name = request.data.get('folderName')
    selected_year = request.data.get('selectedYear')
    username = request.data.get('username')
    try:
        financial_year = financialyear.objects.get(Desc=selected_year).F_year
    except financialyear.DoesNotExist:
        raise NotFound(detail="Specified year not found")
    try:
        dept = User.objects.get(u_email=username).u_dep
        pdfs = list(quotation.objects.filter(dept=dept, f_year=financial_year, req_name=folder_name).values('pdf_name', 'pdf_id'))
        print(list(pdfs))
        if not pdfs:
            return Response({'message': 'No PDFs found for the selected year and department'}, status=404)
        return Response({'pdfs': list(pdfs)}, status=200)
    except User.DoesNotExist:
        return Response({'message': 'User not found'}, status=404)
    except Exception as e:
        return Response({'message': 'Failed to fetch PDFs', 'error': str(e)}, status=400)
    
@api_view(['GET','POST'])
def fetch_compare_data(request):
    folder_name = request.data.get('folderName')
    selected_year = request.data.get('selectedYear')
    username = request.data.get('username')
    try:
        financial_year = financialyear.objects.get(Desc=selected_year).F_year
    except financialyear.DoesNotExist:
        raise NotFound(detail="Specified year not found")
    try:
        dept = User.objects.get(u_email=username).u_dep
        pdfs = list(quotation.objects.filter(dept=dept, f_year=financial_year, req_name=folder_name).values('file_name', 'vendor_name','pdf_id')) 
        if not pdfs:
            return Response({'message': 'No PDFs found for the selected year and department'}, status=404)
        itemms=[]
        for id in list(pdfs):
            ite=list(items.objects.filter(pdf_id=id['pdf_id']).values('item_name','quantity','price'))
            itemms.append(list(ite))        
        return Response({'pdfs': list(pdfs),'items': list(itemms)}, status=200)
    except User.DoesNotExist:
        return Response({'message': 'User not found'}, status=404)
    except Exception as e:
        return Response({'message': 'Failed to fetch PDFs', 'error': str(e)}, status=400)
