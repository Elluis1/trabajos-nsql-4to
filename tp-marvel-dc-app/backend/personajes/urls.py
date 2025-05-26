from django.urls import path
from .views import PersonajeView

urlpatterns = [
    path('personajes/', PersonajeView.as_view()),
]
