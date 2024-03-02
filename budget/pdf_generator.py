from reportlab.lib import colors
from reportlab.lib.pagesizes import A2
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from .models import *
from .serializers import *
from django.http import HttpResponse
import datetime

def generate_pdf(queryset_itemmaster):
    queryset_itemmaster = itemmaster.objects.all()
    current_year = datetime.datetime.now().year
    # here initial the variables from budget tables
    dept_value = 'IT'
    f_year_value = current_year
    
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="item_master.pdf"'

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

    heading = f"Cumulative Budget Report of CFY {f_year_value}"
    Heading = Paragraph(heading, title_style)
    elements.append(Heading)
    elements.extend([Paragraph(" ", title_style) for _ in range(7)])  # Add 5 blank paragraphs for spacing

    item_headers = ['Items'] 
    item_headers1 = ['Budget in CFY','Actual Expenses in CFY','Budget in CFYm1', 'Actual Expenses in CFYm1', 'Budget in CFYm2', 'Actual Expenses in CFYm2', 'Budget in CFYm3', 'Actual Expenses in CFYm3']

    data = [item_headers + item_headers1]  # Use combined_headers as the header row

    sum_values = [0] * len(item_headers1)  # Initialize a list to hold the sum of each column


    # Generate a list of the previous three years
    previous_years = [current_year - i for i in range(4)]

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
                        print(budget_obj.item)
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