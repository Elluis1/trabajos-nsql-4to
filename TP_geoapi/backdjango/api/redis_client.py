# backdjango/api/redis_client.py
import redis

# Si Redis está en otro contenedor, usá el nombre del servicio (ej: redis)
redis_client = redis.Redis(host='redis', port=6379, db=0, decode_responses=True)
