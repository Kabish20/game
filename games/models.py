from django.db import models

class Game(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='games/', null=True, blank=True)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=100)
    release_date = models.DateField(auto_now_add=True)
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.title
