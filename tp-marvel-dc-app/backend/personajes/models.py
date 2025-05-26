from django.db import models
from mongoengine import Document, StringField, ListField, IntField

class Personaje(Document):
    nombre = StringField(required=True, max_length=100)
    alias = StringField(required=True, max_length=100)
    universo = StringField(required=True, choices=('Marvel', 'DC'))
    poderes = ListField(StringField(), default=list)
    apariciones = ListField(StringField(), default=list)
    imagen = StringField()
    edad = IntField()
    descripcion = StringField()
