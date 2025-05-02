# backdjango/api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('guardar_puntos/', views.guardar_puntos, name='guardar_punto'),
    path('cercanos/', views.ubicaciones_cercanas, name='puntos_cercanos'),
    path('distancias/', views.distancia_ubicacion, name='puntos_cercanos'),
    path('obtener_ubicaciones/', views.obtener_todos_los_puntos, name='ubicaciones'),
    path('borrar_ubicaciones/', views.borrar_todos_los_puntos, name='borrar_ubicaciones'),
]
