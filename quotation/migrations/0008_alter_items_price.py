# Generated by Django 5.0.3 on 2024-09-11 18:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quotation', '0007_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='items',
            name='price',
            field=models.FloatField(verbose_name='Price'),
        ),
    ]