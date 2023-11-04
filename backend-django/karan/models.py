from django.db import models

class User(models.Model):
    u_email = models.CharField(max_length=50, primary_key=True , unique=True)
    u_pass = models.CharField(max_length=50)
    u_desig = models.CharField(max_length=30)
    u_dep = models.CharField(max_length=50, default='Default Department')