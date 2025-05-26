FROM python:3.10-slim

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos del backend al contenedor
COPY . .

# Instalar las dependencias
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Ejecutar migraciones y arrancar el servidor al iniciar el contenedor
CMD ["sh", "-c", "python manage.py runserver 0.0.0.0:8000"]
