# Generated by Django 5.0.2 on 2024-09-12 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quotation', '0005_quotation_file_name_quotation_vendor_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='items',
            name='price',
            field=models.FloatField(verbose_name='Price'),
        ),
    ]
