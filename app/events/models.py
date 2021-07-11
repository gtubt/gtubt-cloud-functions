from django.db import models

from core.utils.models import StarterModel


class Event(StarterModel):
    title = models.CharField("Title", max_length=255)
    description = models.TextField("Description")
    cover_image_url = models.URLField("Cover Image URL")
    date = models.DateField("Date")
