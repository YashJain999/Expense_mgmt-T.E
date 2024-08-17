from django.db import models

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
