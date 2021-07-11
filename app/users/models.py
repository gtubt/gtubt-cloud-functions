from django.db import models

from app.users.enums import Department
from core.utils.models import StarterModel


class User(StarterModel):
    name = models.CharField("First Name", max_length=255)
    last_name = models.CharField("Last Name", max_length=255)
    department = models.CharField(
        max_length=3, choices=Department.choices, default=Department.cse
    )
    year = models.PositiveIntegerField("Year", default=0)
    email = models.EmailField("Email")
    student_id = models.CharField("Student ID", max_length=255)
    photo_url = models.URLField("Photo")
    phone = models.CharField("Phone Number", max_length=128)
    is_active = models.BooleanField("Active", default=True)
