# verify_migration.py
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

def verify_migration():
    """Verificar que los datos se migraron correctamente"""
    try:
        conn = psycopg2.connect(os.getenv('DATABASE_URL'))
        cur = conn.cursor()
        
        print("🔍 Verificando migración...")
        
        # Contar ciudades
        cur.execute("SELECT COUNT(*) FROM cities")
        cities_count = cur.fetchone()[0]
        print(f"🏙️  Ciudades: {cities_count}")
        
        # Contar restaurantes
        cur.execute("SELECT COUNT(*) FROM restaurants")
        restaurants_count = cur.fetchone()[0]
        print(f"🏪 Restaurantes: {restaurants_count}")
        
        # Contar productos
        cur.execute("SELECT COUNT(*) FROM products")
        products_count = cur.fetchone()[0]
        print(f"🍔 Productos: {products_count}")
        
        # Mostrar algunos datos de ejemplo
        print("\n📊 Datos de ejemplo:")
        
        # Ciudades
        cur.execute("SELECT id, name FROM cities LIMIT 3")
        cities = cur.fetchall()
        print("Ciudades:", cities)
        
        # Restaurantes por ciudad
        cur.execute("""
            SELECT c.name, COUNT(r.id) 
            FROM cities c 
            LEFT JOIN restaurants r ON c.id = r.city_id 
            GROUP BY c.id, c.name
        """)
        restaurants_by_city = cur.fetchall()
        print("Restaurantes por ciudad:", restaurants_by_city)
        
        # Productos por restaurante
        cur.execute("""
            SELECT r.name, COUNT(p.id) 
            FROM restaurants r 
            LEFT JOIN products p ON r.id = p.restaurant_id 
            GROUP BY r.id, r.name 
            LIMIT 5
        """)
        products_by_restaurant = cur.fetchall()
        print("Productos por restaurante (primeros 5):", products_by_restaurant)
        
        cur.close()
        conn.close()
        
        print("✅ Verificación completada")
        
    except Exception as e:
        print(f"❌ Error en verificación: {e}")

if __name__ == "__main__":
    verify_migration()