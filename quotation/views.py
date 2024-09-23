from .models import *
from budget.models import *
from rest_framework.exceptions import NotFound
from rest_framework.decorators import api_view
from rest_framework.response import Response
# from django.core.files.storage import FileSystemStorage
from django.db.utils import IntegrityError
# from django.conf import settings
# from django.shortcuts import get_object_or_404
from uuid import uuid4
import os
import io
from django.core.files.base import ContentFile
from django.db import transaction
from lab import settings
from django.http import FileResponse, Http404
import json  
import traceback

@api_view(['GET'])
def get_item_names(request):
    folder_names= itemmaster.objects.values_list('item_desc', flat=True)    
    # Assuming you have a model that stores folder names based on years
    return Response(list(folder_names))

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
        if requirement.objects.filter(dept=dept,F_year=financial_year,req_name=req_name).exists():
            return Response({'message': 'Requirement already exixts'}, status=404)
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
        # Fetch the requirement
        req = requirement.objects.get(dept=dept, F_year=financial_year, req_name=req_name)
        # Fetch the quotation entries (handle potential multiple quotations)
        quotation_entries = quotation.objects.filter(dept=dept, f_year=financial_year, req_name=req_name)
        if not quotation_entries.exists():
            req.delete()
            return Response({'message': 'Requirement deleted successfully'}, status=200)
        for quotation_entry in quotation_entries:
            folder_pdf_id = quotation_entry.pdf_id
            # Handle multiple items (delete all associated items with the pdf_id)
            items_to_delete = items.objects.filter(pdf_id=folder_pdf_id)
            if items_to_delete.exists():
                items_to_delete.delete()
            # Handle the file deletion
            quotation_file_path = os.path.join(settings.MEDIA_ROOT, str(quotation_entry.pdf_file)[2:-1])
            if os.path.exists(quotation_file_path):
                os.remove(quotation_file_path)
            # Delete the quotation entry
            quotation_entry.delete()
        # Finally, delete the requirement
        req.delete()
        return Response({'message': 'Requirement deleted successfully'}, status=200)
    except requirement.DoesNotExist:
        return Response({'message': 'Requirement not found'}, status=404)
    except Exception as e:
        return Response({'message': 'Failed to delete requirement', 'error': str(e)}, status=400)

@api_view(['POST'])
def upload_quotation(request):
    try:
        username = request.data.get('username')
        selectedYear = request.data.get('selectedYear')
        branch = User.objects.get(u_email=username).u_dep
        vendor_name = request.data.get('vendor_name')
        file_name = request.data.get('file_name')
        req_name=request.data.get('req_name')
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
                # # Retrieve the requirement name based on department and financial year
                # requirement_obj = get_object_or_404(requirement, dept=branch, F_year=year)
                # req_name = requirement_obj.req_name

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
                # Iterate through items and save each one
                for item in pdf_items:
                    items.objects.create(  # Ensure this matches your model name
                        pdf_id=pdf_id,
                        item_name=item['name'],
                        quantity=int(item['quantity']),  # Ensure correct data types
                        price=item['price']        # Ensure correct data types
                    )
                return Response({'message': 'Quotation uploaded successfully'}, status=200)
        else:
            return Response({'message': 'No file provided'}, status=400)
    except financialyear.DoesNotExist:
        return Response({'message': 'Specified year not found'}, status=404)
    except Exception as e:
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
        if quotation.objects.filter(dept=dept, f_year=financial_year, req_name=folder_name).exists():
            pdfs = list(quotation.objects.filter(dept=dept, f_year=financial_year, req_name=folder_name).values('pdf_name', 'pdf_id','vendor_name','pdf_id','file_name'))
            return Response({'pdfs': list(pdfs)}, status=200)
        else:  
            return Response({'message': 'No PDFs found for the selected year and department'}, status=404)
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

@api_view(['POST'])
def delete_file(request):
    username = request.data.get('username')
    selectedYear = request.data.get('selectedYear')
    branch = User.objects.get(u_email=username).u_dep
    req_name = request.data.get('req_name')
    file_name = request.data.get('filename')

    try:
        # Fetch the financial year
        year = financialyear.objects.get(Desc=selectedYear).F_year
        # Fetch the quotation entry (assumes there should only be one entry for the given filter)
        quotation_entry = quotation.objects.filter(
            dept=branch, f_year=year, req_name=req_name, pdf_id=file_name['pdf_id']
        ).first()  # Use .first() to get the first matching entry
        if not quotation_entry:
            return Response({"message": "Quotation entry not found"}, status=404)
        # Fetch and delete all associated items with the PDF
        items_to_delete = items.objects.filter(pdf_id=file_name['pdf_id'])
        if items_to_delete.exists():
            items_to_delete.delete()
        # Remove the quotation file from the filesystem
        quotation_file_path = os.path.join(settings.MEDIA_ROOT, str(quotation_entry.pdf_file)[2:-1])
        if os.path.exists(quotation_file_path):
            os.remove(quotation_file_path)
        # Delete the quotation entry itself
        quotation_entry.delete()
        return Response({"message": "Quotation file and associated items deleted successfully"}, status=200)
    except financialyear.DoesNotExist:
        return Response({"message": "Specified year not found"}, status=404)
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=404)
    except Exception as e:
        return Response({"message": f"Failed to delete quotation file: {str(e)}"}, status=500)
    
def get_pdf(request,pdf_id):
    pdf_file=quotation.objects.get(pdf_id=pdf_id).pdf_file
    file_path = os.path.join(settings.MEDIA_ROOT, str(pdf_file)[2:-1])
    try:
        if os.path.exists(file_path):
            response = FileResponse(open(file_path, 'rb'), content_type='application/pdf')
            response['Content-Disposition'] = f'inline; filename="{pdf_id}.pdf"'
            return response
        else:
            raise Http404("File does not exist")
    except Exception as e:
        raise Http404("Error while handling the file")
    
@api_view(['POST'])
def upload_bill(request):
    try:
        username = request.data.get('username')
        vendor_name = request.data.get('vendorName')
        total_amount = request.data.get('totalAmount')
        quantity = request.data.get('quantity')
        product_purchased = request.data.get('productPurchased')
        bill_date = request.data.get('date')  # Assuming this is the bill date
        warranty_date = request.data.get('warrantyDate')  # Warranty date
        selected_year = request.data.get('selectedYear')
        current_folder = request.data.get('currentFolder')
        dept = User.objects.get(u_email=username).u_dep  # Assuming folder maps to a department; modify if needed
        year = financialyear.objects.get(Desc=selected_year).F_year
        pdf_file = request.FILES.get('pdfFile')  # File field for the PDF
        if pdf_file:
            pdf_id = uuid4().hex  # Generate unique ID for the PDF
            content = pdf_file.read()
            content_file = io.BytesIO(content)
            content_file.seek(0)
            with transaction.atomic():
                bills.objects.create(
                    dept=dept,
                    f_year=year,
                    pdf_file=ContentFile(content_file.read(), name=pdf_file.name),  # Save the file to the DB
                    pdf_id=pdf_id,
                    pdf_name=pdf_file.name,
                    vendor_name=vendor_name,
                    item_name=current_folder,
                    product_purchased=product_purchased,
                    total_amount=total_amount,
                    quantity=quantity,
                    bill_date=bill_date,
                    warranty_date=warranty_date
                )
            return Response({'message': 'Bill uploaded successfully'}, status=200)
        else:
            return Response({'message': 'No file provided'}, status=400)

    except financialyear.DoesNotExist:
        return Response({'message': 'Specified year not found'}, status=404)
    except Exception as e:
        return Response({'message': 'Failed to upload bill', 'error': str(e)}, status=500)
    
@api_view(['POST'])
def get_bills(request):
    try:        
        username = request.data.get('username')
        selected_year = request.data.get('selectedYear')
        dept = User.objects.get(u_email=username).u_dep  
        year = financialyear.objects.get(Desc=selected_year).F_year
        folder_name = request.data.get('folder')
        # Get the department or folder associated with the bills
        bills_in_folder = bills.objects.filter(dept=dept,f_year=year,item_name=folder_name)  # Assuming item_name is folder name        
        # Serialize the bills (you may need a serializer if using DRF)
        bills_data = [{
            'vendorName': bill.vendor_name,
            'item_name': bill.item_name,
            'totalAmount': bill.total_amount,
            'quantity': bill.quantity,  
            "productPurchased":bill.product_purchased,
            'date': bill.bill_date,
            'warrantyDate': bill.warranty_date,
            'pdf_id':bill.pdf_id,
        } for bill in bills_in_folder]
        return Response(bills_data, status=200)
    except Exception as e:
        return Response({'message': 'Error fetching bills', 'error': str(e)}, status=500)

@api_view(["POST"])
def delete_bill(request):
    username = request.data.get('username')
    branch = User.objects.get(u_email=username).u_dep
    selected_year = request.data.get('selectedYear')
    item_name = request.data.get('currentFolder')
    pdf_id = request.data.get('pdf_id')
    try:
        # Fetch the financial year
        year = financialyear.objects.get(Desc=selected_year).F_year
        # Fetch the quotation entry (assumes there should only be one entry for the given filter)
        bills_entry = bills.objects.filter(dept=branch, f_year=year, item_name=item_name, pdf_id=pdf_id).first() # Use .first() to get the first matching entry
        if not bills_entry:
            return Response({"message": "Bill entry not found"}, status=404)
        # Remove the quotation file from the filesystem
        bill_file_path = os.path.join(settings.MEDIA_ROOT, str(bills_entry.pdf_file)[2:-1])
        if os.path.exists(bill_file_path):
            os.remove(bill_file_path)
        # Delete the quotation entry itself
        bills_entry.delete()
        return Response({"message": "Quotation file and associated items deleted successfully"}, status=200)
    except financialyear.DoesNotExist:
        return Response({"message": "Specified year not found"}, status=404)
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=404)
    except Exception as e:
        return Response({"message": f"Failed to delete quotation file: {str(e)}"}, status=500)

def get_bill_pdf(request,pdf_id):
    pdf_file=bills.objects.get(pdf_id=pdf_id).pdf_file
    file_path = os.path.join(settings.MEDIA_ROOT, str(pdf_file)[2:-1])
    try:
        if os.path.exists(file_path):
            response = FileResponse(open(file_path, 'rb'), content_type='application/pdf')
            response['Content-Disposition'] = f'inline; filename="{pdf_id}.pdf"'
            return response
        else:
            raise Http404("File does not exist")
    except Exception as e:
        raise Http404("Error while handling the file")
    
@api_view(['POST'])
def update_file(request):
    try:
        pdf_id=request.data.get('pdf_id')
        bills.objects.filter(
            pdf_id=pdf_id
        ).update(
            vendor_name = request.data.get('vendorName'),
            product_purchased = request.data.get('productPurchased'),
            total_amount = request.data.get('totalAmount'),
            quantity = request.data.get('quantity'),
            bill_date = request.data.get('date'),
            warranty_date = request.data.get('warrantyDate')
        )
        return Response({"message": "File updated successfully"}, status=200)
    except bills.DoesNotExist:
        return Response({"error": "File not found"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(['POST'])
def update_file_quotation(request):
    try: 
        print("here")
        username = request.data.get('username')
        selectedYear = request.data.get('selectedYear')
        branch = User.objects.get(u_email=username).u_dep
        vendor_name = request.data.get('vendor_name')
        file_name = request.data.get('file_name')
        req_name=request.data.get('req_name')

        # Fetch the 'items' field and parse it as a list
        pdf_items = json.loads(request.POST.get('items', '[]'))  # Default to empty list if not provided
            # Get the financial year
        year = financialyear.objects.get(Desc=selectedYear).F_year
        quotation_entry = quotation.objects.filter(dept=branch, req_name=req_name,file_name=file_name,f_year=year)
        pdf_id = quotation.objects.get(file_name=file_name).pdf_id
        if quotation_entry:
            # update vendor's name
            quotation_entry.update(vendor_name = vendor_name)
        else:
            return Response({'message': 'quotation entry not found'}, status=404)
        items_to_delete = items.objects.filter(pdf_id=pdf_id)
        if items_to_delete.exists():
            items_to_delete.delete()
        for item in pdf_items:
            items.objects.create(
                pdf_id = pdf_id,
                item_name = item['name'],
                quantity=item['quantity'],  # Ensure correct data types
                price=item['price'],
                warranty_date=item['warranty_date']       # Ensure correct data types
                )
        return Response({"message": "Quotation file update successful"}, status=200)
    except financialyear.DoesNotExist:
        return Response({"message": "Specified year not found"}, status=404)
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=404)
    except Exception as e:
        return Response({"message": f"Failed to update quotation file: {str(e)}"}, status=500)



    