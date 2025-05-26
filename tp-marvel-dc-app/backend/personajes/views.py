import json
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from personajes.models import Personaje
from mongoengine.errors import ValidationError

@method_decorator(csrf_exempt, name='dispatch')
class PersonajeView(View):

    def get(self, request):
        personajes = Personaje.objects()
        data = []
        for p in personajes:
            data.append({
                "id": str(p.id),
                "nombre": p.nombre,
                "alias": p.alias,
                "universo": p.universo,
                "poderes": p.poderes,
                "apariciones": p.apariciones,
                "imagen": p.imagen,
                "edad": p.edad,
                "descripcion": p.descripcion
            })
        return JsonResponse(data, safe=False)

    def post(self, request):
        try:
            data = json.loads(request.body)

            # Validar campos obligatorios manualmente para dar mejor mensaje
            for campo in ['nombre', 'alias', 'universo']:
                if campo not in data or not data[campo]:
                    return JsonResponse({"error": f"El campo '{campo}' es obligatorio"}, status=400)

            personaje = Personaje(
                nombre=data["nombre"],
                alias=data["alias"],
                universo=data["universo"],
                poderes=data.get("poderes", []),
                apariciones=data.get("apariciones", []),
                imagen=data.get("imagen"),
                edad=data.get("edad"),
                descripcion=data.get("descripcion")
            )
            personaje.save()
            return JsonResponse({"id": str(personaje.id), "mensaje": "Personaje creado"})
        except ValidationError as e:
            return JsonResponse({"error": str(e)}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"Error inesperado: {str(e)}"}, status=500)
