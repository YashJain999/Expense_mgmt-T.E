from .models import *
from . import views
from budget.pdf_generator import * 
from .serializers import *
import json
import io
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import IntegrityError
from django.core.files.base import ContentFile
from django.http import Http404
from django.db.utils import IntegrityError
from django.http import JsonResponse
from django.http import JsonResponse
from django.http import FileResponse
from django.http import HttpResponse
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib.pagesizes import A2
# new imports
from django.views.decorators.csrf import csrf_exempt
from reportlab.pdfgen import canvas
from rest_framework import status
import base64
from django.http import HttpResponseServerError
from rest_framework.response import Response
from .models import pdf, financialyear
from .serializers import PdfData
from django.http import HttpResponse
from django.core.files import File


class LoginView(APIView):
    def post(self, request):
        u_email = request.data.get('username')  # Assuming 'u_email' is the username field
        u_pass = request.data.get('password')    # Assuming 'u_pass' is the password field   
        try:
            user = User.objects.get(u_email=u_email)
            if user.u_pass == u_pass:  # You should hash and compare passwords securely
                return Response({'message': 'Login successful'})
            else:
                return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except user.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
class CreateUserView(APIView):
    def post(self, request):
        u_email = request.data.get('u_email')
        u_pass = request.data.get('u_pass')
        u_desig = request.data.get('u_desig')
        u_dep = request.data.get('u_dep')

        try:
            user = User.objects.create(
                u_email=u_email,
                u_pass=u_pass,
                u_desig=u_desig,
                u_dep=u_dep,
            )
            return Response({'message': 'User created successfully'}, status=201)
        except IntegrityError:
            return Response({'message': 'Email already exists'}, status=400)
        except Exception as e:
            return Response({'message': 'Failed to create user'}, status=400)    

class EmailVerificationView(APIView):
    def post(self, request):
        email = request.data.get('email')

        try:
            user = User.objects.get(u_email=email)
        except user.DoesNotExist:
            return Response({"is_verified": False}, status=400)

        # Here you can implement your email verification logic.
        # For simplicity, we assume verification is successful if the email exists.
        return Response({"is_verified": True}, status=200)

def generate_pdf_view(request):
    selected_year = request.GET.get('selectedYear', None)

    if not selected_year:
        return HttpResponse("Selected year is required", status=400)
    print(selected_year)
    queryset_itemmaster = itemmaster.objects.all()
    dept_value = 'IT'

    try:
        f_year_obj = financialyear.objects.get(Desc=selected_year)
        f_year_value = f_year_obj.F_year
    except financialyear.DoesNotExist:
        raise Http404("Financial Year matching query does not exist")
    
    filename = "item_master.pdf"
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="{filename}"'
    doc = SimpleDocTemplate(response, pagesize=A2, title="PDF Report")

    elements = []

    # Add title to the PDF
    title_style = ParagraphStyle(
        name='HeadingStyle',
        fontSize=36,
        fontName='Helvetica-Bold',
        alignment=1,
        spaceAfter=12,
    )
    college_name = 'A. P. Shah Institute of Technology'
    title = Paragraph(college_name, title_style)
    elements.append(title)
    # Add image to the right corner
    image_path = './images/apsit_logo.jpg'  # Update the path accordingly
    doc.build([Paragraph(" ", title_style)])  # Add some space for the image
    doc.drawImage(image_path, doc.width - 150, doc.height - 150, width=100, height=100)

    # Add blank paragraphs for spacing
    elements.extend([Paragraph(" ", title_style) for _ in range(7)])

    # Add heading to the PDF
    heading = f"Cumulative Budget Report of CFY {selected_year}"
    Heading = Paragraph(heading, title_style)
    elements.append(Heading)

    # Add blank paragraphs for spacing
    elements.extend([Paragraph(" ", title_style) for _ in range(7)])

    # Generate a list of the previous three years
    previous_years = [f_year_value - i for i in range(4)]

    # Convert the years to the required format
    f_years = [f"{year}-{year + 1}" for year in previous_years]

    # Create a list to hold the data for the PDF table
    data = [['Items'] + ['Budget in CFY', 'Actual Expenses in CFY', 'Budget in CFYm1', 'Actual Expenses in CFYm1', 'Budget in CFYm2', 'Actual Expenses in CFYm2', 'Budget in CFYm3', 'Actual Expenses in CFYm3']]

    # Fetch and organize data for each row
    for obj in queryset_itemmaster:
        data_row = [obj.item_desc]  # Use the item_desc field directly
        for f_y in f_years:
            queryset_budget = budget.objects.filter(dept=dept_value, f_year=f_y, item=obj.item)
            for budget_obj in queryset_budget:
                data_row.append(str(budget_obj.budgeted_amt))
                data_row.append(str(budget_obj.actual_exp))

        data.append(data_row)

    # Add the 'Total' row
    total_row = ['Total'] + [sum(float(data_row[i]) for data_row in data[1:]) for i in range(1, len(data[0]))]
    data.append(total_row)

    # Create a table with the data
    table = Table(data, colWidths=[120] * len(data[0]))

    # Define the style for the table
    style = TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.red),  # Color the headers
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),  # Set text color for headers
        ('GRID', (0, 0), (-1, -1), 1, colors.black),  # Add grid lines
        ('BOTTOMPADDING', (0, 0), (-1, -1), 20),  # Space after each row
        ('TOPPADDING', (0, 0), (-1, -1), 20),  # Space before each row
        ('WORDWRAP', (1, 0), (-1, -1), True),  # Allow word wrap within the specified column width
    ])

    # Apply the style to the table
    table.setStyle(style)

    # Add the table to the elements
    elements.append(table)

    # Add blank paragraphs for spacing
    elements.extend([Paragraph(" ", title_style) for _ in range(10)])

    # Add footer to the PDF
    footer_style = ParagraphStyle(
        name='footerStyle',
        fontSize=14,
        fontName='Helvetica-Bold',
    )
    footer_text = 'Department of Information Technology'
    footer = Paragraph(footer_text, footer_style)
    elements.append(footer)

    # Build the PDF document
    doc.build(elements)

    return response


@api_view(['POST'])
def update_password(request):
    u_pass = request.data.get('u_pass')
    email = request.data.get('email')  # Make sure you are getting the email from the request

    try:
        user = User.objects.get(u_email=email)
        user.u_pass = u_pass  # Update the password field
        user.save()
        return Response(status=status.HTTP_201_CREATED)
    except user.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'message': 'An error occurred while updating password', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def getyear(request):
    selected_year = request.data.get('selectedYear')
    return Response({'selectedYear': selected_year})

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
def show_enter_data(request):
    selected_year = request.data.get('selectedYear')
    financial_year = financialyear.objects.get(Desc=selected_year)
    desc = financial_year.F_year

    enter_data = list(budget.objects.filter(dept='IT',f_year__in=desc).values('budgeted_amt','actual_exp'))
    print(enter_data)
    return Response(enter_data)


class ExpenseList(APIView):
    def get(self, request):
        financial_year = request.GET.get('financial_year')
        if financial_year:

            expenses = budget.objects.all()  # Query your MySQL database for expenses
            # Assuming 'Expense' model has fields: 'item', 'budget', and 'actual_expenses'
            data = [{'item': budget.item, 'budget': budget.budgeted_amt, 'actual_expenses': budget.actual_exp} for budget in expenses]

            return Response(data)
        else:
            return JsonResponse({'error': 'Financial year not provided'}, status=400)
    
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
    
@api_view(['POST'])
def upload_budget(request):
    branch = request.data.get('branch')
    selectedYear = request.data.get('selectedYear')

    try:
        year = financialyear.objects.get(Desc=selectedYear).F_year
    except financialyear.DoesNotExist:
        raise NotFound(detail="Specified year not found")

    file = request.FILES.get('file')
    description = request.data.get('description')
    status = 'reject'
    comment = 'null'

    if file:
        content = file.read()
        content_file = io.BytesIO(content)
        content_file.seek(0)
        try:
            budget, created = pdf.objects.update_or_create(
                dept=branch,
                f_year=year,
                defaults={
                    'pdf': ContentFile(content_file.read(), name=file.name),
                    'description': description,
                    'status': status,
                    'comment': comment
                }
            )
            return Response({"message": "PDF uploaded successfully"}, status=201)
        except IntegrityError as e:
            return Response({"message": "Failed to upload PDF: " + str(e)}, status=500)
    else:
        return Response({"message": "No file provided"}, status=400)
    
@api_view(['POST'])
def get_uploaded_docs(request):
    branch = request.data.get('branch')
    selectedYear = request.data.get('selectedYear')
    year = financialyear.objects.get(Desc=selectedYear).F_year

    # Retrieve the required data from the model
    try:
        data = list(pdf.objects.filter(dept=branch, f_year=year).values('pdf', 'description', 'status', 'comment'))
        
        print(data)  # Assuming you have defined a PdfSerializer for the pdf model
        return Response(data)
    except pdf.DoesNotExist:
        return Response({"message": "No data found for the specified branch and year"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def get_budget_details(request):
    try: 
        selectedYear = request.data.get('selectedYear')
        year = financialyear.objects.get(Desc=selectedYear).F_year
        dept = 'IT'
        data = list(budget.objects.filter(dept = dept, f_year = year).values('item', 'budgeted_amt', 'actual_exp'))
        return Response(data)
    except :
        return Response({'message': 'Error in finding data'})
   
    
@csrf_exempt
@api_view(['POST'])
def update_budget_details(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            selectedYear = request.data.get('selectedYear')
            year = financialyear.objects.get(Desc=selectedYear).F_year

            item_mappings = {
                'Laboratory Consumables': 'LAB-CONSUME',
                'Laboratory Equipment': 'LAB-EQ',
                'Maintenance and Spares': 'MAINT-SPARE',
                'Miscellaneous expenses': 'MISC',
                'Research and Development': 'RND',
                'Software': 'SOFT',
                'Training and Travel': 'T&T'
            }

            for item_data in data.get('updatedData', []):
                item_name = item_data.get('item')
                budgeted_amt = float(item_data.get('budgeted_amt', 0))
                actual_exp = float(item_data.get('actual_exp', 0))

                if item_name in item_mappings:
                    item_value = item_mappings[item_name]

                    # Try to get the existing record
                    try:
                        budget_obj = budget.objects.get(dept='IT', f_year=year, item=item_value)

                        # If it exists, delete the existing record
                        budget_obj.delete()

                    except budget.DoesNotExist:
                        pass  # If it doesn't exist, do nothing

                else:
                    continue  # Skip items not in item_mappings

            for item_data in data.get('updatedData', []):
                item_name = item_data.get('item')
                budgeted_amt = float(item_data.get('budgeted_amt', 0))
                actual_exp = float(item_data.get('actual_exp', 0))

                if item_name in item_mappings:
                    item_value = item_mappings[item_name]
                    # Create a new record
                    budget_obj = budget.objects.create(
                        dept='IT',
                        f_year=year,
                        item=item_value,
                        budgeted_amt=budgeted_amt,
                        actual_exp=actual_exp
                    )

                else:
                    print("Error occur")

                

            return Response({'message': 'Budget details updated successfully.'}, status=status.HTTP_200_OK)

        except json.JSONDecodeError as e:
            return Response({'error': 'Invalid JSON format.'}, status=status.HTTP_400_BAD_REQUEST)

        except financialyear.DoesNotExist:
            return Response({'error': 'Selected year not found.'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    else:
        return Response({'error': 'Invalid request method.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['GET'])
def get_all_pdf_records(request):
    selected_year = request.data.get('selected_year')
    year = financialyear.objects.get(Desc=selected_year).F_year

    # Retrieve the required data from the model
    try:
        pdf_record = pdf.objects.get(f_year=year)
        response = HttpResponse(pdf_record.pdf, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="{pdf_record.pdf.name}"'
        print(response)
        return response
    except pdf.DoesNotExist:
        return Response({"message": "No data found for the specified branch and year"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def principal_status(request):
    branch = request.data.get('dept')
    selectedYear = request.data.get('year')
    status = request.data.get('status')
    comment = request.data.get('comment')

    try:
        year = financialyear.objects.get(Desc=selectedYear).F_year
    except financialyear.DoesNotExist:
        raise NotFound(detail="Specified year not found")

    try:
        # Update pdf instance
        pdf_instance = pdf.objects.get(dept=branch, f_year=year)
        pdf_instance.status = status
        pdf_instance.comment = comment
        pdf_instance.save()

        return Response({'message': 'Success'}, status=status.HTTP_201_CREATED)
    except pdf.DoesNotExist:
        return Response({'message': 'PDF not found for approval'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
