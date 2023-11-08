from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class PdfSerializer(serializers.ModelSerializer):
    class Meta:
        model = itemmaster
        fields = '__all__'

class PdfData(serializers.ModelSerializer):
    class Meta:
        model = budget
        fields = "__all__"

class FinancialYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = financialyear
        fields = '__all__'

class PdfSerializer(serializers.ModelSerializer):
    class Meta:
        model = pdf
        fields = '__all__'  # Use this if you want to include all fields from the model
