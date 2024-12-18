from pymongo import MongoClient
from datetime import datetime

uri = "mongodb+srv://Prueba:QjdF3qd8w7i2P3AK@dev.sptuy.mongodb.net/"
client = MongoClient(uri)

db = client['ingreso_producto']

collection = db['proveedores']

documento = {
    "ruc": "0931044667001", 
    "proveedor": "C",
    "fecha_cosecha": datetime.strptime("2023-10-10", "%Y-%m-%d"),
    "fecha_envio": datetime.strptime("2023-10-15", "%Y-%m-%d"),
    "cantidad_kg": 1200,
    "precio_por_kg": 16,
    "total_dolar": 19200
}

result = collection.insert_one(documento)
print(f"Documento insertado con ID: {result.inserted_id}")
