from lab import settings
from .models import *
from . import views
from .models import *
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
from django.db import transaction
from django.http import Http404
from django.db.utils import IntegrityError
from django.http import JsonResponse
from django.http import JsonResponse
from django.http import FileResponse
from django.http import HttpResponse
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib.pagesizes import A4
from django.views.decorators.csrf import csrf_exempt
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from uuid import uuid4
import os
from django.shortcuts import get_object_or_404
#new imports
from reportlab.platypus import Image
import os
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
from .prediction import predict_budgeted_amount
from .train import train_and_save_model

@api_view(['POST'])
def train(request):
    try:
        username = request.data.get('username')  # Assuming 'username' is the correct field
        if not username:
            return JsonResponse({'status': 'error', 'message': 'Username is required'}, status=400)
        
        # Retrieve department from the User model
        try:
            user = User.objects.get(u_email=username)
            dept = user.u_dep
        except User.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'User not found'}, status=404)
        
        # Retrieve data from the Budget table
        budget_data = budget.objects.all()
        
        # Pass the retrieved data to the model training function
        train_and_save_model(budget_data, dept)
        
        # Return a success response
        return JsonResponse({'status': 'success', 'message': 'Model trained successfully'})
    
    except Exception as e:
        # Return an error response if something goes wrong
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

@api_view(['POST'])
def predict(request):
    username = request.data.get('username')  # Assuming 'u_email' is the username field
    dept=User.objects.get(u_email=username).u_dep   
    # Retrieve data from the Budget table
    budget_data = budget.objects.all()
    # Pass the retrieved data to the predictor function
    # train_and_save_model(budget_data, dept)
    predictions_df = predict_budgeted_amount(budget_data,dept)
    predictions = predictions_df.to_dict(orient='records')
    return Response(predictions)


class LoginView(APIView):
    def post(self, request):
        u_email = request.data.get('username')  # Assuming 'u_email' is the username field
        u_pass = request.data.get('password')    # Assuming 'u_pass' is the password field   
        try:
            if User.objects.filter(u_email=u_email).exists():
                user = User.objects.get(u_email=u_email)
                if user.u_pass == u_pass:
                    return Response({'message': 'Login successful','u_desig':user.u_desig,'u_dep':user.u_dep ,'code':'10'})
                else :
                    return Response({'message': 'Incorrect password' , 'code':'20'})
                    print("Icoorect Password")
            else:
                return Response({'message': 'Incorrect User Email','code':'30'})
                print("Iccorect User email")
        except user.DoesNotExist:
            return Response({'message': 'User not found','code':'40'})  
        
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
    selected_year = request.GET.get('selectedYear')
     
    if not selected_year:
        return HttpResponse("Selected year is required", status=400)
    
    username = request.GET.get('username')
    dept_value=User.objects.get(u_email=username).u_dep
    queryset_itemmaster = itemmaster.objects.all()

    try:
        f_year_obj = financialyear.objects.get(Desc=selected_year)
        f_year_value = f_year_obj.F_year
    except financialyear.DoesNotExist:
        raise Http404("Financial Year matching query does not exist")
    
    # Adjustments for A4 paper size
    page_width, page_height = A4
    page_margin = inch * 0.5  # Adjust margin as needed

    filename = "item_master.pdf"
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="{filename}"'
    
    doc = SimpleDocTemplate(response, pagesize=A4, rightMargin=page_margin, leftMargin=page_margin, topMargin=page_margin, bottomMargin=page_margin,title="PDF Report")

    elements = []
    image_path = os.path.join(settings.BASE_DIR, 'budget', 'images', 'apsit_header.png')

    # Add the image to the elements
    image = Image(image_path, width=page_width - 2 * page_margin, height=100)  # Adjust width as needed
    elements.append(image)

    # Add title to the PDF
    title_style = ParagraphStyle(
        name='HeadingStyle',
        fontSize=18,
        fontName='Helvetica-Bold',
        alignment=1,
        spaceAfter=12,
    )

    # Add blank paragraphs for spacing
    elements.extend([Paragraph(" ", title_style) for _ in range(4)])

    # Add heading to the PDF
    heading = f"Cumulative Budget Report of CFY {selected_year}"
    Heading = Paragraph(heading, title_style)
    elements.append(Heading)

    # Add blank paragraphs for spacing
    elements.extend([Paragraph(" ", title_style) for _ in range(4)])

    # Generate a list of the previous three years
    previous_years = [f_year_value - i for i in range(4)]

    # Convert the years to the required format
    f_years = [f"{year}-{year + 1}" for year in previous_years]

    # Create a list to hold the data for the PDF table
    data = [['Items'] + [f'Budget in {f_year_value}', f'Actual Expenses in {f_year_value}', f'Budget in {f_year_value-1}', f'Actual Expenses in {f_year_value-1}', f'Budget in {f_year_value-2}', f'Actual Expenses in {f_year_value-2}', f'Budget in {f_year_value-3}', f'Actual Expenses in {f_year_value-3}']]


    # Fetch and organize data for each row
    for obj in queryset_itemmaster:
        data_row = [obj.item_desc]  # Use the item_desc field directly
        for f_y in f_years:
            queryset_budget = budget.objects.filter(dept=dept_value, f_year=f_y, item=obj.item)
            budget_obj = queryset_budget.first()  # Retrieve the first budget object
            if budget_obj:  # Check if budget data exists
                data_row.append(str(budget_obj.budgeted_amt))
                data_row.append(str(budget_obj.actual_exp))
            else:  # If budget data is missing, append default values of 0
                data_row.extend(['0', '0'])

        data.append(data_row)

    # Add the 'Total' row
    total_row = ['Total'] + [sum(float(data_row[i]) for data_row in data[1:]) for i in range(1, len(data[0]))]
    data.append(total_row)

    # Create a table with the data
    table = Table(data, colWidths=[75] + [63] * (len(f_years) * 2))  # Adjust column widths as needed

    # Define the style for the table
    style = [
        ('BACKGROUND', (0, 0), (-1, 0), colors.red),  # Color the headers
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),  # Set text color for headers
       # ('ALIGN', (0, 0), (-1, -1), 'LEFT'),  # Center align text
        ('GRID', (0, 0), (-1, -1), 1, colors.black),  # Add grid lines
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),  # Space after each row
        ('TOPPADDING', (0, 0), (-1, -1), 10),  # Space before each row
        ('WORDWRAP', (0, 0), (-1, 0), False),  # Enable word wrap for header cells
        ('FONT', (0, 0), (-1, -1), 'Helvetica'),  # Set bold font for all cells
        ('FONTSIZE', (0, 0), (-1, -1), 5),  # Set font size for all cells
    ]

    # Apply the style to the table
    table.setStyle(style)

    # Add the table to the elements
    elements.append(table)

    # Add blank paragraphs for spacing
    elements.extend([Paragraph(" ", title_style) for _ in range(10)])

    # Add footer to the PDF
    footer_style = ParagraphStyle(
        name='footerStyle',
        fontSize=12,
        fontName='Helvetica-Bold',
    )
    department = Deptmaster.objects.get(dept=dept_value).desc
    footer_text = f'Department of {department}'
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
def departments(request):
    dept = Deptmaster.objects.values_list('desc', flat=True)
    return Response(dept)

@api_view(['GET'])
def item_dropdown(request):
    item = itemmaster.objects.values_list('item_desc', flat=True)
    return Response(item)

@api_view(['GET'])
def get_financialyears(request):
    years = financialyear.objects.values_list('F_year', flat=True)
    desc = financialyear.objects.values_list('Desc', flat=True)
    return Response({'years': list(years), 'desc': list(desc)}, status=status.HTTP_200_OK)
    
@api_view(['POST'])
def get_budget_data(request):
    start_selected_year = request.data.get('selectedYearfrom')
    end_selected_year = request.data.get('selectedYearto')
    username = request.data.get('username')
    dept=User.objects.get(u_email=username).u_dep   
    start_financial_year = financialyear.objects.get(Desc=start_selected_year).F_year
    end_financial_year = financialyear.objects.get(Desc=end_selected_year).F_year

    budget_data = list(budget.objects.filter(dept=dept, f_year__range=(start_financial_year, end_financial_year)).values('f_year','item', 'budgeted_amt', 'actual_exp'))
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
        departments = Deptmaster.objects.all()
        items = itemmaster.objects.all()
        for department in departments:
            for item in items:
                budget_instance = budget.objects.create(
                    dept=department.dept,
                    f_year=F_year,
                    item=item.item,
                    budgeted_amt=0.0,
                    actual_exp=0.0
                )
        return Response({'message': 'Data added successfully'})
    else:
        return Response({'error': 'Invalid data provided'}, status=400)
        

@api_view(['POST'])
def get_uploaded_docs(request):
    username = request.data.get('username')
    branch=User.objects.get(u_email=username).u_dep
    selectedYear = request.data.get('selectedYear')
    year = financialyear.objects.get(Desc=selectedYear).F_year

    # Retrieve the required data from the model
    try:
        data = list(Pdf.objects.filter(dept=branch, f_year=year).values('pdf_name', 'description', 'status', 'comment','pdf_id'))
        
        print(data)  # Assuming you have defined a PdfSerializer for the pdf model
        return Response(data)
    except Pdf.DoesNotExist:
        return Response({"message": "No data found for the specified branch and year"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def get_budget_details(request):
    try: 
        selectedYear = request.data.get('selectedYear')
        username = request.data.get('username')
        dept=User.objects.get(u_email=username).u_dep
        selected_financial_year = financialyear.objects.get(Desc=selectedYear)
        budget_data = budget.objects.filter(f_year=selected_financial_year.F_year,dept = dept)
        # Fetch budget details with item descriptions
        data = []
        for record in budget_data:
            item = itemmaster.objects.get(item = record.item).item_desc
            pdf_data = {
                'item' : item,
                'budgeted_amt': record.budgeted_amt,
                'actual_exp': record.actual_exp, 
            }
            data.append(pdf_data)
        return Response(data)
    except :
        return Response({'message': 'Error in finding data'})

@api_view(['POST'])
def get_item_amount(request):
    try:
        selectedYearfrom = request.data.get('selectedYearfrom')
        selectedYearto = request.data.get('selectedYearto')
        selecteditem = request.data.get('selecteditem')
        username = request.data.get('username')
        dept=User.objects.get(u_email=username).u_dep
        yearfrom = financialyear.objects.get(Desc=selectedYearfrom).F_year
        yearto = financialyear.objects.get(Desc=selectedYearto).F_year
        itemm=itemmaster.objects.get(item_desc=selecteditem).item
        data_budget = list(budget.objects.filter(dept = dept ,item = itemm ,f_year__range=(yearfrom, yearto)).values('budgeted_amt'))
        data_actual = list(budget.objects.filter(dept = dept ,item = itemm ,f_year__range=(yearfrom, yearto)).values('actual_exp'))
        data_year = list(financialyear.objects.filter(F_year__range=(yearfrom, yearto)).values('Desc'))
        if len(data_budget)==len(data_year) and len(data_actual)==len(data_year):
            response_data = {
            'data_budget': data_budget,
            'data_actual': data_actual,
            'data_year': data_year
            }
            return Response(response_data)
        else:
            cul=[]
            for i in range(len(data_year)):
                desc = data_year[i]['Desc']
                num = financialyear.objects.get(Desc=desc).F_year
                try:
                    budget_item = budget.objects.get(dept=dept, item=itemm, f_year=num).budgeted_amt
                except budget.DoesNotExist:
                    budget_item = None
                try:
                    actual_item = budget.objects.get(dept=dept, item=itemm, f_year=num).actual_exp
                except budget.DoesNotExist:
                    actual_item = None
                if budget_item is None and actual_item is None:
                    cul.append(desc)
            return Response({'code':'10','years':cul})
    except :
        return Response({'message':'Error in finding data'})

@api_view(['POST'])
def get_list_amount(request):
    try:
        selectedYearfrom = request.data.get('selectedYearfrom')
        selectedYearto = request.data.get('selectedYearto')
        selectedPrice = request.data.get('selectedprice')
        username = request.data.get('username')
        dept=User.objects.get(u_email=username).u_dep
        yearfrom = financialyear.objects.get(Desc=selectedYearfrom).F_year
        yearto = financialyear.objects.get(Desc=selectedYearto).F_year
        item_1 = list(budget.objects.filter(dept = dept , item = 'LAB-CONSUME' , f_year__range = (yearfrom, yearto)).values('f_year',selectedPrice))
        item_2 = list(budget.objects.filter(dept = dept , item = 'LAB-EQ' , f_year__range = (yearfrom, yearto)).values('f_year',selectedPrice))
        item_3 = list(budget.objects.filter(dept = dept , item = 'MAINT-SPARE' , f_year__range = (yearfrom, yearto)).values('f_year',selectedPrice))
        item_4 = list(budget.objects.filter(dept = dept , item = 'MISC' , f_year__range = (yearfrom, yearto)).values('f_year',selectedPrice))
        item_5 = list(budget.objects.filter(dept = dept , item = 'RND' , f_year__range = (yearfrom, yearto)).values('f_year',selectedPrice))
        item_6 = list(budget.objects.filter(dept = dept , item = 'SOFT' , f_year__range = (yearfrom, yearto)).values('f_year',selectedPrice))
        item_7 = list(budget.objects.filter(dept = dept , item = 'T&T' , f_year__range = (yearfrom, yearto)).values('f_year',selectedPrice))
        data_year = list(financialyear.objects.filter(F_year__range=(yearfrom, yearto)).values('Desc'))
        data_response={
            'Item_1':item_1,
            'Item_2':item_2,
            'Item_3':item_3,
            'Item_4':item_4,
            'Item_5':item_5,
            'Item_6':item_6,
            'Item_7':item_7,
            'data_year':data_year,
        }
        return Response(data_response)
    except :
        return Response({'message':'Error in finding data'})
def has_non_zero_values(data):
    for item in data['data_budget']:
        if item.get('budgeted_amt', 0) != 0:
            return True
    for item in data['data_actual']:
        if item.get('actual_exp', 0) != 0:
            return True
    return False
@api_view(['POST'])
def get_pie(request):
    try:
        selectedYear = request.data.get('selectedYear')
        username = request.data.get('username')
        dept=User.objects.get(u_email=username).u_dep
        year = financialyear.objects.get(Desc=selectedYear).F_year
        data_budget = list(budget.objects.filter(dept = dept  ,f_year = year).values('item','budgeted_amt'))
        data_actual = list(budget.objects.filter(dept = dept  ,f_year = year).values('item','actual_exp'))
        response_data = {
            'data_budget': data_budget,
            'data_actual': data_actual,
            }
        if has_non_zero_values(response_data):
            return Response(response_data)
        else :
            return Response({'code':'10','year':selectedYear})
    except:
        return Response({'message':'Error in finding data'})
      

@csrf_exempt
@api_view(['POST'])
def update_budget_details(request):
    if request.method == 'POST':
        try:
            data = request.data
            selectedYear = data.get('selectedYear')
            year = financialyear.objects.get(Desc=selectedYear).F_year
            username = data.get('username')
            dept = User.objects.get(u_email=username).u_dep

            item_mappings = {
                'Laboratory Consumables': 'LAB-CONSUME',
                'Laboratory Equipment': 'LAB-EQ',
                'Maintenance and Spares': 'MAINT-SPARE',
                'Miscellaneous expenses': 'MISC',
                'Research and Development': 'RND',
                'Software': 'SOFT',
                'Training and Travel': 'T&T'
            }

            # Delete existing records first
            for item_data in data.get('updatedData', []):
                item_name = item_data.get('item')
                if item_name in item_mappings:
                    item_value = item_mappings[item_name]
                    budget.objects.filter(dept=dept, f_year=year, item=item_value).delete()

            # Insert new records
            for item_data in data.get('updatedData', []):
                item_name = item_data.get('item')
                budgeted_amt = float(item_data.get('budgeted_amt', 0))
                actual_exp = float(item_data.get('actual_exp', 0))

                if item_name in item_mappings:
                    item_value = item_mappings[item_name]
                    budget_obj = budget.objects.create(
                        dept=dept,
                        f_year=year,
                        item=item_value,
                        budgeted_amt=budgeted_amt,
                        actual_exp=actual_exp
                    )
                else:
                    print(f"Item '{item_name}' not found in item_mappings.")

            return Response({'message': 'Budget details updated successfully.'}, status=status.HTTP_200_OK)

        except json.JSONDecodeError:
            return Response({'error': 'Invalid JSON format.'}, status=status.HTTP_400_BAD_REQUEST)

        except financialyear.DoesNotExist:
            return Response({'error': 'Selected year not found.'}, status=status.HTTP_404_NOT_FOUND)

        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    else:
        return Response({'error': 'Invalid request method.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET'])
def download_pdf(request, pdf_id):
    try:
        pdf_instance = get_object_or_404(Pdf, pdf_id=pdf_id)
        if pdf_instance.pdf:
            # Remove the leading 'b' character and decode the byte string
            pdf_path = os.path.join(settings.MEDIA_ROOT, str(pdf_instance.pdf)[2:-1])
            with open(pdf_path, 'rb') as pdf_file:
                response = HttpResponse(pdf_file.read(), content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="{pdf_instance.pdf_id}.pdf"'
            return response
        else:
            return Response({"error": "PDF not found"}, status=404)
    except Pdf.DoesNotExist:
        return Response({"error": "PDF not found"}, status=404)
    

@api_view(['GET'])
def get_all_pdf_records(request):
    selected_year = request.GET.get('selectedYear', None)

    if not selected_year:
        return Response({"error": "Selected year is required"}, status=400)

    try:
        selected_financial_year = financialyear.objects.get(Desc=selected_year)
        pdf_records = Pdf.objects.filter(f_year=selected_financial_year.F_year)

        # Create a list to store the modified data
        data = []
        for record in pdf_records:
            dept = Deptmaster.objects.get(dept = record.dept).desc
            pdf_data = {
                'dept' : dept,
                'pdf_id': record.pdf_id,
                'comment': record.comment, 
                'status' :record.status,
            }
            data.append(pdf_data)
            print(pdf_data)
        return Response(data)

    except financialyear.DoesNotExist:
        return Response({"error": "Selected financial year not found"}, status=404)
    except Pdf.DoesNotExist:
        return Response({"error": "No records found for the selected year"}, status=404)
    

@api_view(['POST'])
def principal_status(request):
    branch = request.data.get('dept')
    selectedYear = request.data.get('year')
    approval_status = request.data.get('status')
    comment = request.data.get('comment')

    try:
        year = financialyear.objects.get(Desc=selectedYear).F_year
    except financialyear.DoesNotExist:
        return Response({'error': 'Specified year not found'}, status=status.HTTP_404_NOT_FOUND)

    try:
        dept_desc = Deptmaster.objects.get(desc=branch).dept
    except Deptmaster.DoesNotExist:
        return Response({'error': 'Department not found'}, status=status.HTTP_404_NOT_FOUND)

    try:
        # Check if PDF instance exists for the specified department and year
        pdf_instance = Pdf.objects.filter(f_year=year,dept=dept_desc)

        if pdf_instance:
            # Update fields using update()
            pdf_instance.update(status=approval_status, comment=comment)
            return Response({'message': 'Success'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'PDF instance not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['POST'])
def upload_budget(request):
    username = request.data.get('username')
    selectedYear = request.data.get('selectedYear')
    branch = User.objects.get(u_email=username).u_dep

    try:
        year = financialyear.objects.get(Desc=selectedYear).F_year
    except financialyear.DoesNotExist:
        raise NotFound(detail="Specified year not found")

    file = request.FILES.get('file')
    description = request.data.get('description')

    if file:
        content = file.read()
        content_file = io.BytesIO(content)
        content_file.seek(0)

        # Generate a unique pdf_id
        pdf_id = uuid4().hex

        try:
            with transaction.atomic():
                # Call the helper function to delete any existing budget entries
                print("rehahj")
                # Check if an entry exists in the Pdf model
                if Pdf.objects.filter(dept=branch, f_year=year).exists():
                    # If it exists, call the helper function to delete the existing budget
                    delete_existing_budget(username, selectedYear)

                # Insert the new entry
                Pdf.objects.create(
                    dept=branch,
                    f_year=year,
                    pdf=ContentFile(content_file.read(), name=file.name),
                    description=description,
                    status='',
                    comment='',
                    pdf_id=pdf_id,  # Assign the generated pdf_id
                    pdf_name=file.name  # Save the PDF name
                )
                return Response({"message": "PDF uploaded successfully", "pdf_id": pdf_id}, status=201)
        except Exception as e:
            return Response({"message": "Failed to upload PDF: " + str(e)}, status=500)
    else:
        return Response({"message": "No file provided"}, status=400)

def delete_existing_budget(username, selectedYear):
    branch = User.objects.get(u_email=username).u_dep
    try:
        year = financialyear.objects.get(Desc=selectedYear).F_year
    except financialyear.DoesNotExist:
        raise NotFound(detail="Specified year not found")
    
    try:
        budget_entry = Pdf.objects.get(dept=branch, f_year=year)
    except Pdf.DoesNotExist:
        raise NotFound(detail="PDF entry not found")

    # Remove the leading 'b' character and decode the byte string
    budget_file_path = os.path.join(settings.MEDIA_ROOT, str(budget_entry.pdf)[2:-1])
    if os.path.exists(budget_file_path):
        os.remove(budget_file_path)
    
    # Delete the Pdf instance itself
    budget_entry.delete()

    return "PDF deleted successfully"

@api_view(['POST'])
def delete_budget(request):
    username = request.data.get('username')
    selectedYear = request.data.get('selectedYear')
    try:
        # Call the helper function
        message = delete_existing_budget(username, selectedYear)
        return Response({"message": message}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"message": f"Failed to delete PDF: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)