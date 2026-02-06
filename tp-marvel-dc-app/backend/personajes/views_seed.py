from django.http import JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from personajes.models import Personaje
import json
import os

@csrf_exempt
def seed_marvel(request):
    if request.method != "POST":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    # Seguridad mínima
    if not settings.DEBUG:
        return JsonResponse({"error": "Seed deshabilitado en producción"}, status=403)

    path = os.path.join(
        settings.BASE_DIR,
        "personajes",
        "data",
        "marvel_seed.json"
    )

    if not os.path.exists(path):
        return JsonResponse({"error": "Archivo seed no encontrado"}, status=404)

    with open(path, encoding="utf-8") as f:
        personajes = json.load(f)

    creados = 0

    for data in personajes:
        # Evitar duplicados por alias
        if Personaje.objects(alias=data["alias"]).first():
            continue

        Personaje(**data).save()
        creados += 1

    return JsonResponse({
        "mensaje": "Seed completado",
        "creados": creados
    })
