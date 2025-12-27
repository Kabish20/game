from django.contrib import admin
from .models import Game

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_featured', 'release_date')
    list_filter = ('category', 'is_featured')
    search_fields = ('title', 'category')
