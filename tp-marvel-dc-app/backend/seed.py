import os
import django
import json

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings")
django.setup()

from personajes.models import Personaje

SEED_FILE = "personajes/data/marvel_seed.json"

def run():
    if Personaje.objects.count() > 0:
        print("📦 Personajes ya cargados, seed omitido")
        return

    with open(SEED_FILE, encoding="utf-8") as f:
        data = json.load(f)

    for p in data:
        Personaje(**p).save()

    print(f"✅ {len(data)} personajes Marvel cargados")

if __name__ == "__main__":
    run()
