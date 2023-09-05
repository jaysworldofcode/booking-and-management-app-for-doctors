from django.conf.urls import url
from django.urls import path, include
from .views import (
    ClinicsListApiView,
)

urlpatterns = [
    path('api', ClinicsListApiView.as_view()),
    path('api/<int:clinic_id>/', ClinicsListApiView.as_view()),
]
