from ..models import Clinics

def get_clinic(self, clinic_id, user_id):
        try:
            return Clinics.objects.get(id=clinic_id, user=user_id)
        except Clinics.DoesNotExist:
            return None