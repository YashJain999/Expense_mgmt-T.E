from .models import *
from . import views
from .models import User
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
from django.http import HttpResponse
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib.pagesizes import A2

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
        except User.DoesNotExist:
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
        except User.DoesNotExist:
            return Response({"is_verified": False}, status=400)

        # Here you can implement your email verification logic.
        # For simplicity, we assume verification is successful if the email exists.
        return Response({"is_verified": True}, status=200)


def generate_pdf_view(request):
    selected_year = request.GET.get('selectedYear')  # Get the selected year from the request
    # Generate the PDF using the pdf_generator module
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

    # Use the title attribute to set the title of the PDF document
    doc = SimpleDocTemplate(response, pagesize=A2, title="PDF Report")

    elements = []
    title_style = ParagraphStyle(
        name='HeadingStyle',
        fontSize=24,
        fontName='Helvetica-Bold',
        alignment=1,
        spaceAfter=12,
    )
    college_name = 'A. P. Shah Institute of Technology'
    title = Paragraph(college_name, title_style)
    elements.append(title)
    elements.extend([Paragraph(" ", title_style) for _ in range(7)])  # Add 5 blank paragraphs for spacing
    heading = f"Cumulative Budget Report of CFY {selected_year}"
    Heading = Paragraph(heading, title_style)
    elements.append(Heading)
    elements.extend([Paragraph(" ", title_style) for _ in range(7)])  # Add 5 blank paragraphs for spacing
    item_headers = ['Items'] 
    item_headers1 = ['Budget in CFY','Actual Expenses in CFY','Budget in CFYm1', 'Actual Expenses in CFYm1', 'Budget in CFYm2', 'Actual Expenses in CFYm2', 'Budget in CFYm3', 'Actual Expenses in CFYm3']
    data = [item_headers + item_headers1]  # Use combined_headers as the header row
    sum_values = [0] * len(item_headers1)  # Initialize a list to hold the sum of each column

    # Generate a list of the previous three years
    previous_years = [f_year_value - i for i in range(4)]

    # Convert the years to the required format
    f_years = [f"{year}-{year + 1}" for year in previous_years]

    # Use the f_years list for filtering or querying your data
    processed_items = set()

    for obj in queryset_itemmaster:
        if obj.item_desc not in processed_items:
            processed_items.add(obj.item_desc)
            data_row = [obj.item_desc]  # Use the item_desc field directly
            for f_y in f_years:
                queryset_budget = budget.objects.filter(dept=dept_value, f_year=f_y)
                for budget_obj in queryset_budget:
                    if budget_obj.item == obj.item:
                        # print(budget_obj.item)
                        data_row.append(str(budget_obj.budgeted_amt))
                        data_row.append(str(budget_obj.actual_exp))
                        sum_values[-8] += int(budget_obj.budgeted_amt)
                        sum_values[-7] += int(budget_obj.actual_exp)
                        sum_values[-6] += int(budget_obj.budgeted_amt)
                        sum_values[-5] += int(budget_obj.actual_exp)
                        sum_values[-4] += int(budget_obj.budgeted_amt)
                        sum_values[-3] += int(budget_obj.actual_exp)
                        sum_values[-2] += int(budget_obj.budgeted_amt)
                        sum_values[-1] += int(budget_obj.actual_exp)
                        print(sum_values[-1])
                    else:
                        continue
            data.append(data_row)

    # Add the 'Total' row
    total_row = ['Total'] + [str(val) for val in sum_values]
    data.append(total_row)

    table = Table(data, colWidths=[120] * len(data[0]))
    table_style = TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.red),  # Color the headers
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),  # Set text color for headers
        ('GRID', (0, 0), (-1, -1), 1, colors.black),  # Add grid lines
        ("BOTTOMPADDING", (0, 0), (-1, -1), 20),  # Space after row 1
        ("TOPPADDING", (0, 0), (-1, -1), 20),  # Space before row 2
        ('WORDWRAP', (1, 0), (-1, -1), True),# Allow word wrap within the specified column width
        ('FONT', (0,0),(-1,-1), "Helvetica", 9)
    ])

    table.setStyle(table_style)
    elements.append(table)
    # Add blank paragraphs for spacing
    for _ in range(10):
        elements.append(Paragraph(" ", title_style))

    footer_style = ParagraphStyle(
           name='footerStyle',
        fontSize=14,
        fontName='Helvetica-Bold',
    )
   
    footer_text = 'Department of Information Technology'
    footer = Paragraph(footer_text, footer_style)
    elements.append(footer)
   
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
    except User.DoesNotExist:
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
    status = 'pending'
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
    
@api_view(['POST'])
def update_budget_details(request): 
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            updated_data = data['updatedData']
            print(updated_data)
            selectedYear = request.data.get('selectedYear')
            year = financialyear.objects.get(Desc=selectedYear).F_year

            item_mappings = {
                'Laboratory Consumables': 'LAB-CONSUME',
                'Laboratory Equipments': 'LAB-EQ',
                'Maintenance and spares': 'MAINT-SPARE',
                'Miscellaneous': 'MISC',
                'Research and Development': 'RND',
                'Software': 'SOFT',
                'Training and travel': 'T&T'
            }

            for i in updated_data:
                if i['item'] in item_mappings:
                    item_value = item_mappings[i['item']]
                    print(item_value)
                    budget_item = budget.objects.get(dept='IT', f_year=year, item=item_value).values('budgeted_amt','actual_exp')
                    print('reach here')
                    budget_item.budgeted_amt = float(i['budgeted_amt']) if i['budgeted_amt'] else 0.0
                    print(budget_item.budgeted_amt)
                    print('u can able')
                    budget_item.actual_exp = float(i['actual_exp']) if i['actual_exp'] else 0.0
                    print(budget_item.actual_exp)
                    print('help save please')
                    budget_item.save()
                    print('budget saved ')
                else:
                    continue
            print('budget save')
            return Response({'message': 'Budget details updated successfully.'}, status=status.HTTP_200_OK)
        except json.JSONDecodeError as e:
            return Response({'error': 'Invalid JSON format.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response({'error': 'Invalid request method.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)