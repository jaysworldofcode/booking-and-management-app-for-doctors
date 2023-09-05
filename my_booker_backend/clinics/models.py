from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Clinics(models.Model):
    user = models.ForeignKey(User, verbose_name="User", on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=250, verbose_name="Clinic Name")
    date_established = models.DateTimeField(verbose_name="Date Established", default='', blank=True, null=True)
    contact_number = models.CharField(max_length=20, verbose_name="Contact Number")
    address = models.CharField(max_length=250, verbose_name="Address")
    description = models.CharField(max_length=400, verbose_name="Clinic Description", default='', blank=True)
