from django.urls import path
from .views import PersonajeView, filter_personajes
from .views_seed import seed_marvel

urlpatterns = [
    path('personajes/', PersonajeView.as_view()),
    path('personajes/<str:personaje_id>', PersonajeView.as_view(), name='personaje-detail'),
    path('personajes/filter/', filter_personajes),
    path('personajes/seed/marvel/', seed_marvel),
    path('test/', lambda request: JsonResponse({'status': 'ok'})),
]
