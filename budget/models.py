from django.utils import timezone
import uuid
from django.db import models

class User(models.Model):
    u_email = models.CharField(max_length=50, primary_key=True)
    u_pass = models.CharField(max_length=50)
    u_desig = models.CharField(max_length=30)
    u_dep = models.CharField(max_length=50, default='Default Department')


class itemmaster(models.Model):
    item_desc = models.TextField(
        max_length=255,
        verbose_name="Items",
        default = "Default Itemmaster"
    )
    item = models.TextField(
        max_length=255,
        primary_key=True,
    )
    

class budget(models.Model):
    dept = models.TextField(
        max_length=255,
        verbose_name="Department",
        default='Default Department',
    )
    f_year = models.CharField(
        max_length=255,
        verbose_name="Financial Year",
        primary_key= True,
        default='Default Financial Year'
    )
    item = models.TextField(
        max_length=255,
        verbose_name="Items",
        default="Default Itemmaster",
    )
    budgeted_amt = models.FloatField(
        max_length=255,
        verbose_name="Budget_amount"
    )
    actual_exp = models.FloatField(
        max_length=255,
        verbose_name="Actual_exp"
    )

class financialyear(models.Model):
    F_year = models.IntegerField(
        primary_key=True,
        verbose_name="Financial Year",
    )
    Desc = models.CharField(
        max_length=255,
        verbose_name="Financial Year Description",
    )

def generate_pdf_filename(instance, filename):
    """Generate unique filename for PDF files."""
    timestamp = timezone.now().strftime('%Y%m%d%H%M%S')
    unique_id = uuid.uuid4().hex[:10]
    return f'pdfs/{timestamp}_{unique_id}.pdf'

class pdf(models.Model):
    dept = models.CharField(
        verbose_name='Department',
        max_length=50,
        default='Default Department'
    )
    f_year = models.IntegerField(
        verbose_name='Financial Year',
        primary_key=True
    )
    pdf = models.FileField(
        verbose_name='PDF',
        upload_to=generate_pdf_filename  # Use the custom filename generator function
    )
    description = models.CharField(
        verbose_name='Description',
        max_length=500
    )
    status = models.CharField(
        verbose_name='Status',
        max_length=50
    )
    comment = models.CharField(
        verbose_name='Comment',
        max_length=500
    )
    pdf_id = models.CharField(
        verbose_name='PDF ID',
        max_length=100,
        unique=True
    )
    pdf_name = models.CharField(
        verbose_name= "Pdf_name",
        max_length = 255,
    )