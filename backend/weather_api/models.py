from django.db import models

# Create your models here.

class Location(models.Model):
    name = models.CharField(max_length=255)
    temperature = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    last_updated = models.DateTimeField(null=True, blank=True)
    description = models.TextField()

    def __str__(self):
        return self.name