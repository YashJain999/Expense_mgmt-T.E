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
    item = models.TimeField(
        max_length=255,
        primary_key=True,
    )
    def __str__(self):
        return self.item_desc
    

class budget(models.Model):
    dept = models.TextField(
        max_length=255,
        verbose_name="Department",
        default='Default Department'
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
        default="Default Itemmaster"
    )
    budgeted_amt = models.CharField(
        max_length=255,
        verbose_name="Budget_amount"
    )
    actual_exp = models.CharField(
        max_length=255,
        verbose_name="Actual_exp"
    )

    # class Meta:
    #     unique_together = ('dept', 'f_year', 'item')
