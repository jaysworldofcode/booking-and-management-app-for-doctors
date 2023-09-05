from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Clinics
from .serializers import ClinicsSerializer
from .helper.common import get_clinic

class ClinicsListApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        clinics = Clinics.objects.filter(user = request.user.id)
        serializer = ClinicsSerializer(clinics, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get(self, request, clinic_id, *args, **kwargs):
        clinic_instance = get_clinic(self, clinic_id, request.user.id)
        if not clinic_instance:
            return Response(
                {"res": "Object with clinic id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ClinicsSerializer(clinic_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request, *args, **kwargs):
        data = {
            'name': request.data.get('name'), 
            'date_established': request.data.get('date_established'), 
            'contact_number': request.data.get('contact_number'),
            'address': request.data.get('address'),
            'description': request.data.get('description'),
            'user': request.user.id
        }
        
        serializer = ClinicsSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, clinic_id, *args, **kwargs):
        
        clinic_instance = get_clinic(self, clinic_id, request.user.id)
        if not clinic_instance:
            return Response(
                {"res": "Object with clinic id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        data = {
            'name': request.data.get('name'), 
            'date_established': request.data.get('date_established'), 
            'contact_number': request.data.get('contact_number'),
            'address': request.data.get('address'),
            'description': request.data.get('description'),
            'user': request.user.id
        }
        
        serializer = ClinicsSerializer(instance = clinic_instance, data=data, partial = True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
