from django.http import JsonResponse
from .redis_client import redis_client

def guardar_puntos(request):
    puntos = [
        (-32.47991342786424, -58.25826003493907, "Bar", "Apolo drinks"),
        (-32.486615321016544, -58.239522188689705, "Bar", "LA FUSTA"),
        (-32.48253369880035, -58.23265573368345, "Bar", "Filippo Café & Bistró"),
        (-32.48534711287768, -58.24590315894805, "Bar", "House"),
        
        (-32.48048376768366, -58.23390564304161, "Cerveceria", "Drakkar"),
        (-32.481061805264986, -58.237898852483546, "Cerveceria", "Träctor"),
        (-32.47710768917562, -58.24833586163535, "Cerveceria", "Lagash"),
        (-32.478189266512125, -58.23975279280136, "Cerveceria", "Ferrugem"),
        (-32.479229049265946, -58.235431815187226, "Cerveceria", "7 Colinas"),
        (-32.48650551595967, -58.24551692085851, "Cerveceria", "Beer Baron"),
        (-32.48194074592591, -58.25486972278421, "Cerveceria", "Cervecería Klug Gebräu"),
        (-32.48621910094287, -58.27117530782759, "Cerveceria", "Biguá"),
        
        (-32.48014874387599, -58.23692038005551, "Supermercado", "Supermercado chino"),
        
        (-32.4798727, -58.235107206764624, "Entretenimiento", "Cine San Martin"),
        (-32.482805209327545, -58.23148629055606, "Entretenimiento", "Casino"),
        
        (-32.48575104618425, -58.23922178128673, "Restaurante", "Pimienta Negra"),
        (-32.48388219312831, -58.23302587852857, "Restaurante", "La Ris"),
        (-32.48259252615159, -58.23179742680262, "Restaurante", "La Delfina"),
        (-32.48221241025615, -58.23393782954881, "Restaurante", "EL ARCA"),
        (-32.481012027428186, -58.236713316125396, "Restaurante", "Bajo Llave 929"),
        
        (-32.477587386158234, -58.24024631927043, "Deportes", "Gimnasio Cuerpo y Mente"),
        (-32.484501979753766, -58.25465514606285, "Deportes", "Oeste Padel"),
    ]

    for lon, lat, cat, nombre in puntos:
        redis_client.geoadd("puntos", (lon, lat, f"{cat}|{nombre}"))

    return JsonResponse({"status": "OK", "msg": "Se guardaron los puntos"})

def obtener_todos_los_puntos(request):
    lugares = redis_client.zrange("puntos", 0, -1)

    ubicaciones = []
    for lugar in lugares:
        pos = redis_client.geopos("puntos", lugar)
        if pos[0]:
            cat, nombre = lugar.split("|", 1)
            ubicaciones.append({
                "nombre": nombre,
                "cat": cat,
                "long": pos[0][1],
                "lat": pos[0][0]
            })

    return JsonResponse({"puntos": ubicaciones})

def ubicaciones_cercanas(request):
    lat = float(request.GET.get('lat'))
    lng = float(request.GET.get('lng'))
    radio = float(request.GET.get('radio'))

    puntos = redis_client.georadius('puntos', lng, lat, radio, unit='km', withcoord=True)

    resultado = []
    for punto in puntos:
        nombre = punto[0]
        lon, lat = punto[1]
        resultado.append({'nombre': nombre, 'lat': lat, 'long': lon, 'categoria': 'Turismo'})

    return JsonResponse({'puntos': resultado})

def borrar_todos_los_puntos(request):
    redis_client.delete("puntos")
    return JsonResponse({"status": "OK", "msg": "Todos los puntos fueron eliminados"})


