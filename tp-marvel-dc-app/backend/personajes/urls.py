from django.urls import path
from .views import PersonajeView

urlpatterns = [
    path('personajes/', PersonajeView.as_view()),
    path('personajes/<str:personaje_id>', PersonajeView.as_view(), name='personaje-detail'),
]
