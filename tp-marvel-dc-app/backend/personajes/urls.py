from django.urls import path
from .views import PersonajeView, filter_personajes

urlpatterns = [
    path('personajes/', PersonajeView.as_view()),
    path('personajes/<str:personaje_id>', PersonajeView.as_view(), name='personaje-detail'),
    path('personajes/filter/', filter_personajes),
    path('test/', lambda request: JsonResponse({'status': 'ok'})),
]
