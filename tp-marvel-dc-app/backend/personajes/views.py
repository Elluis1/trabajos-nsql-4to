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
                "imagenes": p.imagenes,
                "edad": p.edad,
                "descripcion": p.descripcion
            })
        return JsonResponse(data, safe=False)

    def post(self, request):
        try:
            if request.content_type.startswith('multipart/form-data'):
                data = request.POST
                file = request.FILES.get('imagenes')
            else:
                data = json.loads(request.body)
                file = None

            # Validar campos obligatorios
            for campo in ['nombre', 'alias', 'universo']:
                if campo not in data or not data[campo]:
                    return JsonResponse({"error": f"El campo '{campo}' es obligatorio"}, status=400)

            # Guardar imagen si se envió
            files = request.FILES.getlist('imagenes')  # Cambia a plural
            urls_imagenes = []

            if files:
                for file in files:
                    nombre_archivo = re.sub(r'\s+', '_', file.name)
                    nombre_archivo = re.sub(r'[^\w.-]', '', nombre_archivo)
                    ruta_archivo = os.path.join(settings.MEDIA_ROOT, nombre_archivo)

                    with open(ruta_archivo, 'wb+') as destino:
                        for chunk in file.chunks():
                            destino.write(chunk)

                    url_imagen = request.build_absolute_uri(
                        os.path.join(settings.MEDIA_URL, nombre_archivo)
                    )
                    urls_imagenes.append(url_imagen)

            personaje = Personaje(
                nombre=data["nombre"],
                alias=data["alias"],
                universo=data["universo"],
                poderes=data.get("poderes", "").split(',') if isinstance(data.get("poderes"), str) else data.get("poderes", []),
                apariciones=data.get("apariciones", "").split(',') if isinstance(data.get("apariciones"), str) else data.get("apariciones", []),
                imagenes=urls_imagenes,
                edad=int(data["edad"]) if "edad" in data and data["edad"] else None,
                descripcion=data.get("descripcion", "")
            )
            personaje.save()

            return JsonResponse({"id": str(personaje.id), "mensaje": "Personaje creado"})
        except ValidationError as e:
            return JsonResponse({"error": str(e)}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"Error inesperado: {str(e)}"}, status=500)

    def put(self, request, personaje_id):
        try:
            data = json.loads(request.body)
            personaje = Personaje.objects(id=personaje_id).first()
            if not personaje:
                return JsonResponse({"error": "Personaje no encontrado"}, status=404)

            for campo in ['nombre', 'alias', 'universo', 'edad', 'descripcion']:
                if campo in data:
                    setattr(personaje, campo, data[campo])

            if "poderes" in data:
                # Asegurar que 'poderes' sea una lista de strings
                if isinstance(data["poderes"], str):
                    poderes = [p.strip() for p in data["poderes"].split(',')]
                elif isinstance(data["poderes"], list):
                    poderes = [str(p).strip() for p in data["poderes"]]
                else:
                    return JsonResponse({"error": "El campo 'poderes' debe ser string o lista"}, status=400)

                # Append sin duplicados
                personajes_poderes = personaje.poderes if personaje.poderes else []
                for p in poderes:
                    if p and p not in personajes_poderes:
                        personajes_poderes.append(p)
                personaje.poderes = personajes_poderes

            if "apariciones" in data:
                # Igual para apariciones
                if isinstance(data["apariciones"], str):
                    apariciones = [a.strip() for a in data["apariciones"].split(',')]
                elif isinstance(data["apariciones"], list):
                    apariciones = [str(a).strip() for a in data["apariciones"]]
                else:
                    return JsonResponse({"error": "El campo 'apariciones' debe ser string o lista"}, status=400)

                personajes_apariciones = personaje.apariciones if personaje.apariciones else []
                for a in apariciones:
                    if a and a not in personajes_apariciones:
                        personajes_apariciones.append(a)
                personaje.apariciones = personajes_apariciones

            personaje.save()
            return JsonResponse({"mensaje": "Personaje actualizado correctamente"})
        except Exception as e:
            return JsonResponse({"error": f"Error al editar personaje: {str(e)}"}, status=500)

    def delete(self, request, *args, **kwargs):
        personaje_id = kwargs.get('personaje_id')
        try:
            print(f"Eliminando personaje con ID: {personaje_id}")
            personaje = Personaje.objects(id=personaje_id).first()
            if not personaje:
                return JsonResponse({"error": "Personaje no encontrado"}, status=404)
            personaje.delete()
            return JsonResponse({"mensaje": "Personaje eliminado"})
        except Exception as e:
            print(f"Error al eliminar: {str(e)}")
            return JsonResponse({"error": f"Error al eliminar personaje: {str(e)}"}, status=500)
