# Generated by Django 5.0.2 on 2024-09-09 06:49

import quotation.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quotation', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quotation',
            name='pdf_file',
            field=models.FileField(upload_to=quotation.models.generate_pdf_filename, verbose_name='PDF File'),
        ),
    ]