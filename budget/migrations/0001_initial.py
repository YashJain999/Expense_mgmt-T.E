# Generated by Django 4.2.4 on 2024-02-22 19:13

import budget.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='budget',
            fields=[
                ('dept', models.TextField(default='Default Department', max_length=255, verbose_name='Department')),
                ('f_year', models.CharField(default='Default Financial Year', max_length=255, primary_key=True, serialize=False, verbose_name='Financial Year')),
                ('item', models.TextField(default='Default Itemmaster', max_length=255, verbose_name='Items')),
                ('budgeted_amt', models.FloatField(max_length=255, verbose_name='Budget_amount')),
                ('actual_exp', models.FloatField(max_length=255, verbose_name='Actual_exp')),
            ],
        ),
        migrations.CreateModel(
            name='Deptmaster',
            fields=[
                ('dept', models.CharField(max_length=255, primary_key=True, serialize=False, verbose_name='dept')),
                ('desc', models.CharField(max_length=255, verbose_name='desc')),
            ],
        ),
        migrations.CreateModel(
            name='financialyear',
            fields=[
                ('F_year', models.IntegerField(primary_key=True, serialize=False, verbose_name='Financial Year')),
                ('Desc', models.CharField(max_length=255, verbose_name='Financial Year Description')),
            ],
        ),
        migrations.CreateModel(
            name='itemmaster',
            fields=[
                ('item_desc', models.TextField(default='Default Itemmaster', max_length=255, verbose_name='Items')),
                ('item', models.CharField(default='Default Itemmaster', max_length=255, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Pdf',
            fields=[
                ('dept', models.CharField(default='Default Department', max_length=50, verbose_name='Department')),
                ('f_year', models.IntegerField(primary_key=True, serialize=False, verbose_name='Financial Year')),
                ('pdf', models.FileField(upload_to=budget.models.generate_pdf_filename, verbose_name='PDF')),
                ('description', models.CharField(max_length=500, verbose_name='Description')),
                ('status', models.CharField(max_length=50)),
                ('comment', models.CharField(max_length=500)),
                ('pdf_id', models.CharField(max_length=100, unique=True, verbose_name='PDF ID')),
                ('pdf_name', models.CharField(max_length=255, verbose_name='Pdf_name')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('u_email', models.EmailField(max_length=50, primary_key=True, serialize=False)),
                ('u_pass', models.CharField(max_length=50)),
                ('u_desig', models.CharField(max_length=30)),
                ('u_dep', models.CharField(default='Default Department', max_length=50)),
            ],
        ),
    ]