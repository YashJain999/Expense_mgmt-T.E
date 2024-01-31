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

class pdf(models.Model):
    dept = models.CharField(
        verbose_name='department',
        max_length=50,
        default='Default Department'
    )
    f_year = models.IntegerField(
        primary_key=True,
        verbose_name='Financial Year'
    )
    pdf = models.FileField(
        verbose_name='pdf report'
    )
    description = models.CharField(
        verbose_name='description',
        max_length=500,
    )

    status = models.CharField(
        verbose_name='status',
        max_length=50
    )

    comment = models.CharField(
        verbose_name='comment',
        max_length=500
    )