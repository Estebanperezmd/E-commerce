# main.py
import json
import time
from datetime import datetime
import menu_scraper
import menu_scraper_advanced

class UberEatsScraper:
    def __init__(self):
        self.city_list = ["toronto", "kingston", "hamilton"]
        self.QUICK = False
        self.QUICK_LIMIT = 3  # Restaurantes por ciudad
        self.restaurant_data = {'cities': [], 'metadata': {}}
    
    def setup_metadata(self):
        self.restaurant_data['metadata'] = {
            'scraping_date': datetime.now().isoformat(),
            'cities_processed': len(self.city_list),
            'restaurants_per_city': self.QUICK_LIMIT,
            'data_source': 'uber_eats_brand_pages'
        }
    
    def process_city(self, city):
        print(f"\n{'='*50}")
        print(f"PROCESANDO: {city.upper()}")
        print(f"{'='*50}")
        
        # Obtener URLs reales usando el nuevo método
        restaurant_urls = menu_scraper_advanced.scrape_restaurants(
            "",  # base_url no se usa en el nuevo método
            city, 
            quick_limit=self.QUICK_LIMIT
        )
        
        if not restaurant_urls:
            print(f"No se pudieron obtener URLs para {city}")
            return {
                'city': city,
                'restaurants': [],
                'count': 0,
                'success_rate': "0/0"
            }
        
        return self.scrape_restaurant_menus(city, restaurant_urls)
    
    def scrape_restaurant_menus(self, city, urls):
        """Scrapear menús de los restaurantes"""
        restaurants = []
        success_count = 0
        
        print(f"Scrapeando {len(urls)} restaurantes...")
        
        for i, url in enumerate(urls, 1):
            print(f"  [{i}/{len(urls)}] Scrapeando...")
            
            try:
                menu_data = menu_scraper.scrape_menu(url)
                
                if menu_data and menu_data.get('restaurant_name'):
                    restaurants.append(menu_data)
                    success_count += 1
                    print(f"{menu_data['restaurant_name']}")
                else:
                    print(f"No se extrajeron datos")
                
                # Respeta los límites de rate
                time.sleep(4)
                
            except Exception as e:
                print(f"Error: {e}")
                continue
        
        return {
            'city': city,
            'restaurants': restaurants,
            'count': success_count,
            'success_rate': f"{success_count}/{len(urls)}",
            'processed_at': datetime.now().isoformat()
        }
    
    def run(self):
        print("INICIANDO SCRAPER CON URLs REALES")
        print("Usando patrón: /ca/brand-city/{city}-on/{brand}")
        self.setup_metadata()
        
        for city in self.city_list:
            city_data = self.process_city(city)
            self.restaurant_data['cities'].append(city_data)
        
        self.save_results()
    
    def save_results(self):
        output_file = 'uber_eats_data.json'
        
        total_restaurants = sum(city.get('count', 0) for city in self.restaurant_data['cities'])
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(self.restaurant_data, f, indent=2, ensure_ascii=False)
        
        print(f"\nJSON generado: {output_file}")
        print(f"RESUMEN FINAL:")
        print(f"Ciudades procesadas: {len(self.city_list)}")
        print(f"Total restaurantes: {total_restaurants}")
        
        for city in self.restaurant_data['cities']:
            print(f"   🏙️  {city['city']}: {city['count']} restaurantes")
        
        self.show_data_preview()
    
    def show_data_preview(self):
        print(f"\n{'='*60}")
        print("VISTA PREVIA DE DATOS:")
        print(f"{'='*60}")
        
        for city_data in self.restaurant_data['cities']:
            if city_data.get('restaurants'):
                print(f"\n{city_data['city'].upper()}:")
                for restaurant in city_data['restaurants']:
                    print(f"{restaurant['restaurant_name']}")
                    for product in restaurant['products']:
                        print(f"{product['name']} - {product['price']}")

if __name__ == "__main__":
    scraper = UberEatsScraper()
    scraper.run()