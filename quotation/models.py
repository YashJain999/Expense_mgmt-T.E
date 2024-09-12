# from django.db import models

# class quotation(models.Model):
#     dept = models.CharField( 
#         verbose_name='Department',
#         max_length=50,
#         null=False
#     )
#     f_year = models.IntegerField(
#         verbose_name='Financial Year',
#         null=False
#     )
#     pdf_id = models.CharField(
#         primary_key=True,
#         verbose_name='PDF ID',
#         max_length=225,
#         null=False,
#         unique=True
#     )
#     pdf_name = models.CharField(
#         verbose_name='PDF Name',
#         max_length=50,  # Adjusted to match the database schema
#         null=False
#     )
#     req_name = models.CharField(
#         verbose_name='Requirement Name',
#         max_length=225,
#         null=False
#     )
#     vendor_name = models.CharField(
#         verbose_name='Vendor Name',
#         max_length=225,
#         null=False
#     )
#     item_name = models.CharField(
#         verbose_name='Item Name',
#         max_length=225,
#         null=False
#     )
#     item_qty = models.IntegerField(
#         verbose_name='Item Quantity',
#         null=False
#     )
#     item_price = models.IntegerField(
#         verbose_name='Item Price',
#         null=False
#     )
# class requirement(models.Model):
#     dept = models.CharField( 
#         verbose_name='Department',
#         max_length=50,
#         null=False
#     )
#     F_year = models.IntegerField(
#         verbose_name='Financial Year',
#         null=False
#     )
#     req_name = models.CharField(
#         primary_key=True,
#         verbose_name= "requirementt_name",
#         max_length = 255,
#         null=False
#     )
#     class Meta:
#         unique_together = (('dept', 'F_year', 'req_name'),)
from django.db import models
from django.utils import timezone
import uuid


def generate_pdf_filename(instance, filename):
    """Generate unique filename for PDF files."""
    timestamp = timezone.now().strftime('%Y%m%d%H%M%S')
    unique_id = uuid.uuid4().hex[:10]
    return f'quotation/{timestamp}_{unique_id}.pdf'

class quotation(models.Model):
    dept = models.CharField( 
        verbose_name='Department',
        max_length=50,
        null=False
    )
    f_year = models.IntegerField(
        verbose_name='Financial Year',
        null=False
    )
    pdf_id = models.CharField(
        primary_key = True,
        verbose_name='PDF ID',
        max_length=225,
        null=False,
        unique=True
    )
    pdf_name = models.CharField(
        verbose_name= "Pdf_name",
        max_length = 255,
        null=False
    )
    req_name = models.CharField(
        verbose_name= "requirementt_name",
        max_length = 255,
        null=False
    )
    pdf_file = models.FileField(
        verbose_name="PDF File",
        upload_to=generate_pdf_filename,
        null=False
    )
    file_name = models.CharField(
        verbose_name= "file_name",
        max_length = 255,
        null=False,
        default='default_filename.pdf'  # Setting a default value here
    )
    vendor_name = models.CharField(
        verbose_name= "vendor_name",
        max_length = 255,
        null=False,
        default='default_vendor_name'
    )
class requirement(models.Model):
    dept = models.CharField( 
        verbose_name='Department',
        max_length=50,
        null=False
    )
    F_year = models.IntegerField(
        verbose_name='Financial Year',
        null=False
    )
    req_name = models.CharField(
        primary_key=True,
        verbose_name= "requirementt_name",
        max_length = 255,
        null=False
    )
    class Meta:
        unique_together = (('dept', 'F_year', 'req_name'),)

class items(models.Model):
    pdf_id = models.CharField(
        max_length=225,
        verbose_name='PDF ID',
        null=False
    )
    item_name = models.CharField(
        max_length=225,
        verbose_name='Item Name',
        null=False
    )
    quantity = models.IntegerField(
        verbose_name='Quantity',
        null=False
    )
    price = models.FloatField(
        verbose_name='Price',
        null=False
    )