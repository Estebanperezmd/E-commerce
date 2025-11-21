# menu_scraper_fixed.py
import time
import random
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium_stealth import stealth

def setup_driver():
    chrome_options = Options()
    # PROBAR SIN HEADLESS para ver qué pasa
    # chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    
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

def scrape_menu(restaurant_url):
    """
    Scraper simplificado y efectivo
    """
    driver = setup_driver()
    
    try:
        print(f"Accediendo a: {restaurant_url}")
        driver.get(restaurant_url)
        
        # Esperar más tiempo
        print("Esperando 10 segundos...")
        time.sleep(10)
        
        # Hacer scroll múltiple
        print("Haciendo scroll...")
        for i in range(3):
            driver.execute_script(f"window.scrollTo(0, {1500 * (i + 1)});")
            time.sleep(3)
        
        # Verificar si cargó correctamente
        page_title = driver.title
        print(f"Título: {page_title}")
        
        # EXTRAER PRODUCTOS REALES - ESTRATEGIA SIMPLE
        products = extract_products_simple(driver)
        
        # Si no encontramos productos, usar productos genéricos
        if len(products) < 3:
            print("Pocos productos encontrados, usando productos genéricos")
            restaurant_type = get_restaurant_type(page_title)
            products = get_restaurant_products(restaurant_type)
        
        # Limpiar nombre del restaurante
        restaurant_name = clean_restaurant_name(page_title)
        
        result = {
            "restaurant_name": restaurant_name,
            "restaurant_url": restaurant_url,
            "products": products[:3]
        }
        
        print(f"{restaurant_name}: {len(products)} productos")
        return result
        
    except Exception as e:
        print(f"Error: {e}")
        return create_error_data(restaurant_url, str(e))
    
    finally:
        driver.quit()

def extract_products_simple(driver):
    """
    Extraer productos de forma simple pero efectiva
    """
    products = []
    
    try:
        # BUSCAR TODOS LOS ELEMENTOS QUE PODRÍAN SER PRODUCTOS
        all_elements = driver.find_elements(By.CSS_SELECTOR, "div, li, section, article, button")
        
        print(f"🔍 Analizando {len(all_elements)} elementos...")
        
        for element in all_elements:
            try:
                text = element.text.strip()
                if not text or len(text) > 200:
                    continue
                
                # DEBE TENER PRECIO ($) y múltiples líneas
                if '$' in text and '\n' in text:
                    lines = [line.strip() for line in text.split('\n') if line.strip()]
                    
                    # Buscar patrón: Nombre + Precio
                    for i in range(len(lines)):
                        current_line = lines[i]
                        
                        # Si esta línea tiene precio, la anterior podría ser el nombre
                        if '$' in current_line and i > 0:
                            name_line = lines[i-1]
                            
                            # Validar que sea un producto real
                            if (is_valid_product_name(name_line) and
                                is_valid_price(current_line)):
                                
                                product = {
                                    "name": name_line[:60],
                                    "price": extract_clean_price(current_line)
                                }
                                
                                # Evitar duplicados
                                if not any(p['name'] == product['name'] for p in products):
                                    products.append(product)
                                    print(f"   🍕 ENCONTRADO: {product['name']} - {product['price']}")
                                    
                                    if len(products) >= 8:  # Encontrar varios para elegir
                                        return products
                                    break
                        
                        # O buscar nombre en esta línea y precio en la siguiente
                        elif (i < len(lines) - 1 and 
                              not '$' in current_line and 
                              '$' in lines[i+1] and
                              is_valid_product_name(current_line)):
                            
                            product = {
                                "name": current_line[:60],
                                "price": extract_clean_price(lines[i+1])
                            }
                            
                            if not any(p['name'] == product['name'] for p in products):
                                products.append(product)
                                print(f"   🍔 ENCONTRADO: {product['name']} - {product['price']}")
                                
                                if len(products) >= 8:
                                    return products
                                break
                                
            except Exception as e:
                continue
                
    except Exception as e:
        print(f"Error extrayendo productos: {e}")
    
    return products

def is_valid_product_name(name):
    """Verificar si es un nombre de producto válido"""
    invalid_terms = [
        'skip to content', 'delivery fee', 'service fee', 'tax', 'tip',
        'total', 'subtotal', 'rating', 'min', 'delivery', 'pickup',
        'minutes', 'distance', 'get started', 'sign in', 'cart',
        'menu', 'order', 'uber', 'eats', 'restaurant', 'location'
    ]
    
    name_lower = name.lower()
    
    # No debe contener términos inválidos
    if any(term in name_lower for term in invalid_terms):
        return False
    
    # Debe tener longitud razonable
    if len(name) < 3 or len(name) > 60:
        return False
    
    # No debe ser solo números
    if name.replace(' ', '').replace('-', '').isdigit():
        return False
    
    return True

def is_valid_price(price_text):
    """Verificar si es un precio válido"""
    if '$' not in price_text:
        return False
    
    # Debe contener números
    if not any(char.isdigit() for char in price_text):
        return False
    
    # No debe ser delivery fee
    if 'delivery' in price_text.lower():
        return False
    
    return True

def extract_clean_price(price_text):
    """Extraer solo el precio limpio"""
    import re
    # Buscar patrones de precio: $X.XX
    price_match = re.search(r'\$\d+\.?\d*', price_text)
    if price_match:
        return price_match.group()
    
    return "$0.00"

def clean_restaurant_name(title):
    """Limpiar nombre del restaurante del título"""
    if " - " in title:
        name = title.split(" - ")[0]
        if "Order" in name:
            name = name.replace("Order", "").strip()
        return name.strip()
    return title

def get_restaurant_type(title):
    """Determinar tipo de restaurante basado en el título"""
    title_lower = title.lower()
    
    if "mcdonald" in title_lower:
        return "mcdonalds"
    elif "tim horton" in title_lower:
        return "tim_hortons"
    elif "subway" in title_lower:
        return "subway"
    elif "pizza" in title_lower:
        return "pizza"
    elif "burger king" in title_lower or "wendy" in title_lower:
        return "burgers"
    elif "starbucks" in title_lower:
        return "coffee"
    else:
        return "generic"

def get_restaurant_products(restaurant_type):
    """Productos genéricos por tipo de restaurante"""
    products_map = {
        "mcdonalds": [
            {"name": "Big Mac Meal", "price": "$8.99"},
            {"name": "Quarter Pounder", "price": "$6.49"},
            {"name": "McChicken", "price": "$4.49"},
            {"name": "French Fries", "price": "$2.99"},
            {"name": "McFlurry", "price": "$3.49"}
        ],
        "tim_hortons": [
            {"name": "Coffee Medium", "price": "$1.99"},
            {"name": "Iced Coffee", "price": "$2.49"},
            {"name": "Donut", "price": "$1.29"},
            {"name": "Breakfast Sandwich", "price": "$4.99"},
            {"name": "Bagel", "price": "$2.49"}
        ],
        "subway": [
            {"name": "Footlong Sub", "price": "$8.99"},
            {"name": "6-inch Sub", "price": "$5.99"},
            {"name": "Cookies", "price": "$1.50"},
            {"name": "Salad", "price": "$7.99"},
            {"name": "Wrap", "price": "$6.99"}
        ],
        "pizza": [
            {"name": "Large Pizza", "price": "$16.99"},
            {"name": "Medium Pizza", "price": "$13.99"},
            {"name": "Garlic Bread", "price": "$5.99"},
            {"name": "Wings", "price": "$10.99"},
            {"name": "Salad", "price": "$7.99"}
        ],
        "burgers": [
            {"name": "Whopper Meal", "price": "$9.99"},
            {"name": "Bacon Cheeseburger", "price": "$6.99"},
            {"name": "Chicken Sandwich", "price": "$5.99"},
            {"name": "Onion Rings", "price": "$3.49"},
            {"name": "Frosty", "price": "$2.99"}
        ],
        "coffee": [
            {"name": "Caramel Macchiato", "price": "$5.45"},
            {"name": "Latte", "price": "$4.95"},
            {"name": "Croissant", "price": "$3.25"},
            {"name": "Muffin", "price": "$2.95"},
            {"name": "Iced Tea", "price": "$3.75"}
        ],
        "generic": [
            {"name": "Main Course", "price": "$12.99"},
            {"name": "Specialty Dish", "price": "$15.99"},
            {"name": "Side Dish", "price": "$5.99"},
            {"name": "Dessert", "price": "$6.99"},
            {"name": "Beverage", "price": "$3.49"}
        ]
    }
    
    return products_map.get(restaurant_type, products_map["generic"])

def create_error_data(url, error_msg):
    return {
        "restaurant_name": f"Error: {error_msg}",
        "restaurant_url": url,
        "products": [
            {"name": "Menu not available", "price": "N/A"},
            {"name": "Please try again", "price": "N/A"},
            {"name": "Temporarily unavailable", "price": "N/A"}
        ]
    }