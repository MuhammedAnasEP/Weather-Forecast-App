from django.shortcuts import render
from rest_framework.decorators import api_view
import requests
from rest_framework.response import Response
from .models import Location
from django.utils import timezone
from .serializers import LocationSerializer
# Create your views here.

@api_view(['POST'])
def weather(request):
    name = request.data['name']
    api_key = '06953e9773affc401547bd098ef3d7ff'
    url = f'http://api.openweathermap.org/data/2.5/weather?q={name}&units=imperial&appid={api_key}'

    old_weather = Location.objects.filter(name__iexact = name)

    try:
        city_weather = requests.get(url).json()
        temperature = round((city_weather['main']['temp'] - 32) * (5 / 9), 2)
        description = city_weather['weather'][0]['description']
        if old_weather:
            old_weather.temperature = temperature
            old_weather.description = description
            old_weather.last_updated = timezone.now()
            old_weather.save()
            searializer = LocationSerializer(old_weather, many = False)
            return Response(searializer.data)
        else:
            weather = Location.objects.create(name = name, temperature = temperature, description = description, last_updated = timezone.now())
            weather.save()
        searializer = LocationSerializer(weather, many = False)
        return Response(searializer.data)

    except Exception as e:
        return Response(f'Error fetching weather data: {e}')
    
@api_view(['GET'])
def search_list(request):
    lists = Location.objects.all().order_by('-id')[:10]
    serializer = LocationSerializer(lists, many=True)
    return Response(serializer.data)