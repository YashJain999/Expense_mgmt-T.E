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