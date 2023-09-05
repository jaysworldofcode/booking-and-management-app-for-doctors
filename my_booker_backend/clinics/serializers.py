from rest_framework import serializers
from .models import Clinics

class ClinicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clinics
        fields = ["name", "date_established", "contact_number", "address", "description", "user"]

