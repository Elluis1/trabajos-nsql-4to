from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from django.http import JsonResponse
from personajes.models import Personaje
from mongoengine.errors import ValidationError
import os
import json
import re
from django.conf import settings

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
            if request.content_type.startswith('multipart/form-data'):
                data = request.POST
                file = request.FILES.get('imagen')
            else:
                data = json.loads(request.body)
                file = None

            # Validar campos obligatorios
            for campo in ['nombre', 'alias', 'universo']:
                if campo not in data or not data[campo]:
                    return JsonResponse({"error": f"El campo '{campo}' es obligatorio"}, status=400)

            # Guardar imagen si se envió
            url_imagen = None
            if file:
                # limpiar nombre
                nombre_archivo = re.sub(r'\s+', '_', file.name)
                nombre_archivo = re.sub(r'[^\w.-]', '', nombre_archivo)

                ruta_archivo = os.path.join(settings.MEDIA_ROOT, nombre_archivo)

                with open(ruta_archivo, 'wb+') as destino:
                    for chunk in file.chunks():
                        destino.write(chunk)

                # Construir URL absoluta para MongoDB
                url_imagen = request.build_absolute_uri(
                    os.path.join(settings.MEDIA_URL, nombre_archivo)
                )

            personaje = Personaje(
                nombre=data["nombre"],
                alias=data["alias"],
                universo=data["universo"],
                poderes=data.get("poderes", "").split(',') if isinstance(data.get("poderes"), str) else data.get("poderes", []),
                apariciones=data.get("apariciones", "").split(',') if isinstance(data.get("apariciones"), str) else data.get("apariciones", []),
                imagen=url_imagen,
                edad=int(data["edad"]) if "edad" in data and data["edad"] else None,
                descripcion=data.get("descripcion", "")
            )
            personaje.save()

            return JsonResponse({"id": str(personaje.id), "mensaje": "Personaje creado"})
        except ValidationError as e:
            return JsonResponse({"error": str(e)}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"Error inesperado: {str(e)}"}, status=500)