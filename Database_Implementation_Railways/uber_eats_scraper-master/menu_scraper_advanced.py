# restaurant_scraper.py
import time
import random
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium_stealth import stealth

def setup_driver():
    """Configurar driver con stealth"""
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option('useAutomationExtension', False)
    
    user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    chrome_options.add_argument(f"--user-agent={user_agent}")
    
    driver = webdriver.Chrome(
        service=webdriver.ChromeService(ChromeDriverManager().install()),
        options=chrome_options
    )
    
    stealth(driver,
        languages=["en-US", "en"],
        vendor="Google Inc.",
        platform="Win32",
        webgl_vendor="Intel Inc.",
        renderer="Intel Iris OpenGL Engine",
        fix_hairline=True,
    )
    
    return driver

def get_restaurant_urls_from_brand(city, brand="mcdonalds", limit=5):
    """
    Obtener URLs reales usando el patrón: /ca/brand-city/{city}/{brand}
    """
    driver = setup_driver()
    restaurant_urls = []
    
    try:
        # Construir URL usando el patrón que encontraste
        brand_url = f"https://www.ubereats.com/ca/brand-city/{city}-on/{brand}"
        print(f"Navegando a: {brand_url}")
        
        driver.get(brand_url)
        time.sleep(5)
        
        # Hacer scroll para cargar más resultados
        for i in range(3):
            driver.execute_script(f"window.scrollTo(0, {1000 * (i + 1)});")
            time.sleep(2)
        
        # Buscar enlaces de restaurantes específicos
        restaurant_links = driver.find_elements(By.CSS_SELECTOR, "a[href*='/store/']")
        
        print(f"🔍 Encontrados {len(restaurant_links)} enlaces potenciales")
        
        for link in restaurant_links:
            try:
                href = link.get_attribute('href')
                if href and is_valid_restaurant_url(href):
                    restaurant_urls.append(href)
                    restaurant_name = extract_name_from_url(href)
                    print(f"{restaurant_name}")
                    
                    if len(restaurant_urls) >= limit:
                        break
            except Exception as e:
                continue
        
        return restaurant_urls[:limit]
        
    except Exception as e:
        print(f"Error: {e}")
        return []
    finally:
        driver.quit()

def get_multiple_brands_restaurants(city, limit_per_brand=3):
    """
    Obtener restaurantes de múltiples marcas populares
    """
    brands = ["mcdonalds", "tim-hortons", "subway", "pizza-pizza", "burger-king", "wendys", "starbucks"]
    
    all_restaurant_urls = []
    
    for brand in brands:
        print(f"\n🍔 Buscando {brand} en {city}...")
        
        try:
            urls = get_restaurant_urls_from_brand(city, brand, limit_per_brand)
            all_restaurant_urls.extend(urls)
            print(f"{len(urls)} restaurantes de {brand}")
            
            time.sleep(random.uniform(3, 6))  # Esperar entre marcas
            
        except Exception as e:
            print(f"Error con {brand}: {e}")
            continue
    
    # Eliminar duplicados y limitar
    unique_urls = list(set(all_restaurant_urls))
    return unique_urls[:limit_per_brand * 3]  # Máximo 3 por marca

def is_valid_restaurant_url(url):
    """Verificar si es una URL válida de restaurante"""
    if not url or '/store/' not in url:
        return False
    
    # Debe tener la estructura: .../store/restaurant-name/ID
    parts = url.split('/store/')
    if len(parts) < 2:
        return False
    
    store_part = parts[1]
    if '/' in store_part and len(store_part.split('/')) >= 2:
        return True
    
    return False

def extract_name_from_url(url):
    """Extraer nombre legible de la URL"""
    try:
        parts = url.split('/store/')[1].split('/')
        name_part = parts[0]
        # Convertir kebab-case a texto normal
        name = name_part.replace('-', ' ').title()
        return name
    except:
        return "Restaurante"

def scrape_restaurants(base_url, city, quick_limit=5, debug=False):
    """
    Función principal para obtener URLs de restaurantes
    """
    print(f"Obteniendo restaurantes reales en {city}...")
    
    # Usar el nuevo método con múltiples marcas
    restaurant_urls = get_multiple_brands_restaurants(city, quick_limit)
    
    # Guardar en archivo
    filename = f"{city}_restaurant_urls.txt"
    with open(filename, 'w', encoding='utf-8') as f:
        for url in restaurant_urls:
            f.write(url + '\n')
    
    print(f"Guardadas {len(restaurant_urls)} URLs reales en {filename}")
    
    # Mostrar preview
    print("URLs obtenidas:")
    for url in restaurant_urls[:5]:
        name = extract_name_from_url(url)
        print(f"{name}: {url}")
    
    return restaurant_urls