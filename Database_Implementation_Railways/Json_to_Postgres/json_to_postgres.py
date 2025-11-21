# json_to_postgres.py
import json
import os
import psycopg2
from psycopg2.extras import execute_values
from dotenv import load_dotenv
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Cargar variables de entorno
load_dotenv()

class UberEatsToPostgres:
    def __init__(self):
        self.conn = None
        self.cur = None
        self.db_url = os.getenv('DATABASE_URL')
        
    def connect(self):
        """Conectar a la base de datos"""
        try:
            self.conn = psycopg2.connect(self.db_url)
            self.cur = self.conn.cursor()
            logger.info("✅ Conectado a PostgreSQL")
            return True
        except Exception as e:
            logger.error(f"❌ Error conectando a la base de datos: {e}")
            return False
    
    def disconnect(self):
        """Desconectar de la base de datos"""
        if self.cur:
            self.cur.close()
        if self.conn:
            self.conn.close()
        logger.info("🔌 Desconectado de PostgreSQL")
    
    def create_tables(self):
        """Crear las tablas en PostgreSQL"""
        try:
            # Tabla de ciudades
            self.cur.execute("""
                CREATE TABLE IF NOT EXISTS cities (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100) NOT NULL UNIQUE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            """)
            
            # Tabla de restaurantes
            self.cur.execute("""
                CREATE TABLE IF NOT EXISTS restaurants (
                    id SERIAL PRIMARY KEY,
                    city_id INTEGER REFERENCES cities(id),
                    name VARCHAR(255) NOT NULL,
                    url TEXT,
                    scraped_at TIMESTAMP,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            """)
            
            # Tabla de productos
            self.cur.execute("""
                CREATE TABLE IF NOT EXISTS products (
                    id SERIAL PRIMARY KEY,
                    restaurant_id INTEGER REFERENCES restaurants(id),
                    name VARCHAR(255) NOT NULL,
                    price VARCHAR(50),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            """)
            
            # Tabla de metadata (opcional)
            self.cur.execute("""
                CREATE TABLE IF NOT EXISTS scraping_metadata (
                    id SERIAL PRIMARY KEY,
                    scraping_date TIMESTAMP,
                    cities_processed INTEGER,
                    total_restaurants INTEGER,
                    data_source VARCHAR(100),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            """)
            
            self.conn.commit()
            logger.info("✅ Tablas creadas exitosamente")
            return True
            
        except Exception as e:
            logger.error(f"❌ Error creando tablas: {e}")
            self.conn.rollback()
            return False
    
    def load_json_data(self, json_file_path):
        """Cargar datos desde el archivo JSON"""
        try:
            with open(json_file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            logger.info(f"✅ JSON cargado: {len(data.get('cities', []))} ciudades")
            return data
        except Exception as e:
            logger.error(f"❌ Error cargando JSON: {e}")
            return None
    
    def migrate_data(self, json_file_path):
        """Migrar todos los datos del JSON a PostgreSQL"""
        if not self.connect():
            return False
        
        try:
            # Crear tablas
            if not self.create_tables():
                return False
            
            # Cargar datos JSON
            data = self.load_json_data(json_file_path)
            if not data:
                return False
            
            # Insertar metadata
            self.insert_metadata(data.get('metadata', {}))
            
            # Insertar ciudades y restaurantes
            for city_data in data.get('cities', []):
                self.insert_city_data(city_data)
            
            self.conn.commit()
            logger.info("✅ Migración completada exitosamente")
            return True
            
        except Exception as e:
            logger.error(f"❌ Error en migración: {e}")
            self.conn.rollback()
            return False
        finally:
            self.disconnect()
    
    def insert_metadata(self, metadata):
        """Insertar metadata del scraping"""
        try:
            self.cur.execute("""
                INSERT INTO scraping_metadata 
                (scraping_date, cities_processed, total_restaurants, data_source)
                VALUES (%s, %s, %s, %s)
            """, (
                metadata.get('scraping_date'),
                metadata.get('cities_processed'),
                metadata.get('total_restaurants'),
                metadata.get('data_source', 'uber_eats')
            ))
            logger.info("📊 Metadata insertada")
        except Exception as e:
            logger.error(f"❌ Error insertando metadata: {e}")
            raise
    
    def insert_city_data(self, city_data):
        """Insertar datos de una ciudad y sus restaurantes"""
        try:
            city_name = city_data.get('city')
            
            # Insertar o obtener ciudad
            self.cur.execute(
                "INSERT INTO cities (name) VALUES (%s) ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id",
                (city_name,)
            )
            city_id = self.cur.fetchone()[0]
            
            logger.info(f"🏙️  Procesando ciudad: {city_name} (ID: {city_id})")
            
            # Insertar restaurantes
            restaurants = city_data.get('restaurants', [])
            for restaurant in restaurants:
                self.insert_restaurant_data(city_id, restaurant)
            
        except Exception as e:
            logger.error(f"❌ Error insertando datos de ciudad {city_data.get('city')}: {e}")
            raise
    
    def insert_restaurant_data(self, city_id, restaurant):
        """Insertar datos de un restaurante y sus productos"""
        try:
            # Insertar restaurante
            self.cur.execute("""
                INSERT INTO restaurants 
                (city_id, name, url, scraped_at)
                VALUES (%s, %s, %s, %s)
                RETURNING id
            """, (
                city_id,
                restaurant.get('restaurant_name'),
                restaurant.get('restaurant_url'),
                restaurant.get('processed_at')  # Usar processed_at del JSON si existe
            ))
            restaurant_id = self.cur.fetchone()[0]
            
            # Insertar productos
            products = restaurant.get('products', [])
            product_data = []
            for product in products:
                product_data.append((
                    restaurant_id,
                    product.get('name'),
                    product.get('price')
                ))
            
            if product_data:
                execute_values(
                    self.cur,
                    "INSERT INTO products (restaurant_id, name, price) VALUES %s",
                    product_data
                )
            
            logger.info(f"   🏪 Restaurante: {restaurant.get('restaurant_name')} - {len(products)} productos")
            
        except Exception as e:
            logger.error(f"❌ Error insertando restaurante {restaurant.get('restaurant_name')}: {e}")
            raise

# Función principal
def main():
    migrator = UberEatsToPostgres()
    
    # Especifica la ruta de tu archivo JSON
    json_file = "uber_eats_data.json"  # Cambia por el nombre de tu archivo
    
    if not os.path.exists(json_file):
        logger.error(f"❌ Archivo {json_file} no encontrado")
        return
    
    logger.info(f"🚀 Iniciando migración de {json_file} a PostgreSQL")
    
    if migrator.migrate_data(json_file):
        logger.info("🎉 ¡Migración completada exitosamente!")
    else:
        logger.error("💥 Migración falló")

if __name__ == "__main__":
    main()