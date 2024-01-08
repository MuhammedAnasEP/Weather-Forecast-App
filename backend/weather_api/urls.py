from django.urls import path
from .views import weather,search_list

urlpatterns = [
    path('weather/', weather, name='weather'),
    path('search-list/',search_list, name='search-list')
]