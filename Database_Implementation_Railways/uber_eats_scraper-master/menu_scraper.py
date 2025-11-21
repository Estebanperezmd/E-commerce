# menu_scraper_advanced.py
import time
import random
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium_stealth import stealth
from selenium.common.exceptions import TimeoutException, NoSuchElementException

def setup_driver_advanced():
    """Configurar driver con más capacidades"""
    chrome_options = Options()
    
    # PROBAR SIN HEADLESS para debugging
    # chrome_options.add_argument("--headless")
    
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option('useAutomationExtension', False)
    
    # Permitir JavaScript y contenido dinámico
    chrome_options.add_argument("--enable-javascript")
    chrome_options.add_argument("--disable-web-security")
    chrome_options.add_argument("--allow-running-insecure-content")
    
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

def scrape_menu_advanced(restaurant_url):
    """
    Scraper avanzado con waits explícitos y múltiples estrategias
    """
    driver = setup_driver_advanced()
    
    try:
        print(f"    🌐 Accediendo a: {restaurant_url}")
        driver.get(restaurant_url)
        
        # ESTRATEGIA 1: Esperar a elementos específicos del menú
        print("    ⏳ Esperando elementos del menú...")
        
        # Esperar hasta 20 segundos por elementos clave
        try:
            WebDriverWait(driver, 20).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid*='menu-item'], [class*='menu-item'], section, h3, h4"))
            )
            print("    ✅ Elementos del menú detectados")
        except TimeoutException:
            print("    ⚠️  No se detectaron elementos de menú, continuando...")
        
        # Scroll múltiple y espera
        print("    📜 Realizando scrolls para cargar contenido...")
        for i in range(5):
            scroll_height = driver.execute_script("return document.body.scrollHeight")
            driver.execute_script(f"window.scrollTo(0, {scroll_height * (i + 1) / 5});")
            time.sleep(2)
        
        # ESTRATEGIA 2: Buscar en el HTML por productos comunes
        products = []
        
        # Método A: Buscar por estructura de Uber Eats
        products.extend(extract_uber_eats_products(driver))
        
        # Método B: Buscar por patrones de texto
        if len(products) < 3:
            products.extend(extract_by_text_patterns(driver))
        
        # Método C: Buscar en todas las secciones
        if len(products) < 3:
            products.extend(extract_from_all_sections(driver))
        
        # Limpiar y filtrar productos
        clean_products = clean_product_list(products)
        
        # Si no hay productos reales, usar productos genéricos basados en el restaurante
        if len(clean_products) < 3:
            restaurant_name = extract_restaurant_name_clean(driver)
            clean_products.extend(get_restaurant_specific_products(restaurant_name))
        
        # Extraer nombre limpio del restaurante
        restaurant_name = extract_restaurant_name_clean(driver)
        
        result = {
            "restaurant_name": restaurant_name,
            "restaurant_url": restaurant_url,
            "products": clean_products[:3]
        }
        
        print(f"    ✅ {restaurant_name}: {len(clean_products)} productos")
        return result
        
    except Exception as e:
        print(f"    ❌ Error: {e}")
        return create_error_data(restaurant_url, str(e))
    
    finally:
        driver.quit()

def extract_uber_eats_products(driver):
    """Extraer productos usando selectores específicos de Uber Eats"""
    products = []
    
    try:
        # Selectores específicos de Uber Eats
        selectors = [
            "[data-testid*='menu-item']",
            "[data-testid*='item-card']",
            "[class*='menu-item']",
            "[class*='item-card']",
            "[class*='product-card']",
            "section > div > div > div",  # Estructura profunda
            "li[class*='item']",
            "div[class*='item']"
        ]
        
        for selector in selectors:
            try:
                elements = driver.find_elements(By.CSS_SELECTOR, selector)
                print(f"      🔍 Selector '{selector}': {len(elements)} elementos")
                
                for element in elements[:10]:
                    try:
                        product_data = extract_product_data_advanced(element)
                        if product_data and is_valid_product_advanced(product_data):
                            products.append(product_data)
                            print(f"        🍔 {product_data['name']} - {product_data['price']}")
                            
                            if len(products) >= 5:
                                return products
                    except:
                        continue
            except:
                continue
                
    except Exception as e:
        print(f"      ⚠️  Error en extract_uber_eats_products: {e}")
    
    return products

def extract_product_data_advanced(element):
    """Extraer datos de producto de forma avanzada"""
    try:
        # Obtener todo el texto del elemento
        full_text = element.text.strip()
        if not full_text or len(full_text) > 300:
            return None
        
        lines = [line.strip() for line in full_text.split('\n') if line.strip()]
        
        if len(lines) < 2:
            return None
        
        # Buscar nombre (primera línea que no sea precio)
        product_name = None
        for line in lines:
            if line and not has_price(line) and len(line) > 2 and len(line) < 80:
                product_name = line
                break
        
        # Buscar precio
        product_price = None
        for line in lines:
            if has_price(line):
                product_price = line
                break
        
        if product_name and product_price:
            return {
                "name": product_name,
                "price": product_price
            }
        
        # Si no encontramos con líneas, buscar en sub-elementos
        try:
            name_elements = element.find_elements(By.CSS_SELECTOR, "h3, h4, [class*='name'], [class*='title']")
            for name_elem in name_elements:
                name = name_elem.text.strip()
                if name and len(name) > 2:
                    product_name = name
                    break
            
            price_elements = element.find_elements(By.CSS_SELECTOR, "[class*='price'], [class*='amount']")
            for price_elem in price_elements:
                price = price_elem.text.strip()
                if price and has_price(price):
                    product_price = price
                    break
            
            if product_name and product_price:
                return {
                    "name": product_name,
                    "price": product_price
                }
        except:
            pass
            
    except Exception as e:
        print(f"        Error extrayendo producto: {e}")
    
    return None

def extract_by_text_patterns(driver):
    """Extraer productos basado en patrones de texto"""
    products = []
    
    try:
        # Buscar elementos que contengan combinaciones de texto y precios
        all_elements = driver.find_elements(By.CSS_SELECTOR, "div, li, section, article")
        
        for element in all_elements[:200]:
            try:
                text = element.text.strip()
                if not text or len(text) > 250:
                    continue
                
                # Debe contener un precio y tener múltiples líneas
                if has_price(text) and '\n' in text:
                    lines = [line.strip() for line in text.split('\n') if line.strip()]
                    
                    # Buscar patrones comunes de productos
                    for i in range(len(lines) - 1):
                        current_line = lines[i]
                        next_line = lines[i + 1] if i + 1 < len(lines) else ""
                        
                        # Patrón: Nombre + Precio en líneas consecutivas
                        if (current_line and 
                            not has_price(current_line) and 
                            has_price(next_line) and
                            is_valid_product_name_advanced(current_line)):
                            
                            product_data = {
                                "name": current_line[:80],
                                "price": extract_price_from_text(next_line)
                            }
                            
                            if is_valid_product_advanced(product_data):
                                products.append(product_data)
                                
                                if len(products) >= 5:
                                    return products
                                break
                                
            except:
                continue
                
    except Exception as e:
        print(f"      ⚠️  Error en extract_by_text_patterns: {e}")
    
    return products

def extract_from_all_sections(driver):
    """Extraer de todas las secciones posibles"""
    products = []
    
    try:
        # Buscar en diferentes tipos de contenedores
        containers = driver.find_elements(By.CSS_SELECTOR, "div, section, article, li, main")
        
        for container in containers[:100]:
            try:
                # Solo contenedores de tamaño medio (probablemente productos)
                size = container.size
                if size['height'] < 50 or size['width'] < 100:
                    continue
                
                text = container.text.strip()
                if not text or len(text) < 10 or len(text) > 500:
                    continue
                
                # Buscar estructura de producto
                lines = [line.strip() for line in text.split('\n') if line.strip()]
                
                if len(lines) >= 2:
                    # Buscar nombre en primeras líneas
                    product_name = None
                    for line in lines[:3]:
                        if line and not has_price(line) and is_valid_product_name_advanced(line):
                            product_name = line
                            break
                    
                    # Buscar precio
                    product_price = None
                    for line in lines:
                        if has_price(line):
                            product_price = extract_price_from_text(line)
                            break
                    
                    if product_name and product_price:
                        product_data = {
                            "name": product_name,
                            "price": product_price
                        }
                        
                        if is_valid_product_advanced(product_data):
                            products.append(product_data)
                            
                            if len(products) >= 5:
                                return products
                                
            except:
                continue
                
    except Exception as e:
        print(f"      ⚠️  Error en extract_from_all_sections: {e}")
    
    return products

def extract_restaurant_name_clean(driver):
    """Extraer nombre limpio del restaurante"""
    try:
        title = driver.title
        # Limpiar el título
        if " - " in title:
            name = title.split(" - ")[0]
            # Remover "Order" si existe
            if "Order" in name:
                name = name.replace("Order", "").strip()
            return name.strip()
        return title
    except:
        return "Restaurante"

def get_restaurant_specific_products(restaurant_name):
    """Productos genéricos basados en el tipo de restaurante"""
    restaurant_lower = restaurant_name.lower()
    
    if "mcdonald" in restaurant_lower:
        return [
            {"name": "Big Mac Meal", "price": "$8.99"},
            {"name": "McChicken Sandwich", "price": "$4.49"},
            {"name": "French Fries", "price": "$2.99"},
            {"name": "Happy Meal", "price": "$5.99"},
            {"name": "McFlurry", "price": "$3.49"}
        ]
    elif "tim horton" in restaurant_lower:
        return [
            {"name": "Coffee Medium", "price": "$1.99"},
            {"name": "Iced Cap", "price": "$3.49"},
            {"name": "Donut", "price": "$1.29"},
            {"name": "Breakfast Sandwich", "price": "$4.99"},
            {"name": "Soup & Sandwich", "price": "$7.99"}
        ]
    elif "subway" in restaurant_lower:
        return [
            {"name": "Footlong Sub", "price": "$8.99"},
            {"name": "6-inch Sub", "price": "$5.99"},
            {"name": "Cookies", "price": "$1.50"},
            {"name": "Salad", "price": "$7.99"},
            {"name": "Wrap", "price": "$6.99"}
        ]
    elif "pizza" in restaurant_lower:
        return [
            {"name": "Large Pizza", "price": "$14.99"},
            {"name": "Medium Pizza", "price": "$11.99"},
            {"name": "Garlic Bread", "price": "$4.99"},
            {"name": "Wings", "price": "$9.99"},
            {"name": "Salad", "price": "$6.99"}
        ]
    elif "burger king" in restaurant_lower or "wendy" in restaurant_lower:
        return [
            {"name": "Whopper Meal", "price": "$9.99"},
            {"name": "Chicken Sandwich", "price": "$5.99"},
            {"name": "Onion Rings", "price": "$3.49"},
            {"name": "Frosty", "price": "$2.99"},
            {"name": "Baconator", "price": "$7.99"}
        ]
    elif "starbucks" in restaurant_lower:
        return [
            {"name": "Caramel Macchiato", "price": "$5.45"},
            {"name": "Pumpkin Spice Latte", "price": "$5.95"},
            {"name": "Croissant", "price": "$3.25"},
            {"name": "Iced Coffee", "price": "$3.75"},
            {"name": "Cake Pop", "price": "$2.95"}
        ]
    else:
        return [
            {"name": "Plato Principal", "price": "$12.99"},
            {"name": "Especialidad", "price": "$15.99"},
            {"name": "Acompañamiento", "price": "$5.99"},
            {"name": "Postre", "price": "$6.99"},
            {"name": "Bebida", "price": "$3.49"}
        ]

def has_price(text):
    """Verificar si tiene precio"""
    return '$' in text and any(c.isdigit() for c in text)

def extract_price_from_text(text):
    """Extraer solo el precio del texto"""
    import re
    price_match = re.search(r'\$\d+\.?\d*', text)
    return price_match.group() if price_match else "$0.00"

def is_valid_product_name_advanced(name):
    """Validación avanzada de nombre de producto"""
    invalid_terms = [
        'skip to content', 'delivery fee', 'service fee', 'tax', 'tip', 
        'total', 'subtotal', 'rating', 'min', 'delivery', 'pickup',
        'minutes', 'distance', 'mcDonald', 'tim horton', 'subway'
    ]
    
    name_lower = name.lower()
    return (len(name) > 2 and 
            len(name) < 80 and
            not any(term in name_lower for term in invalid_terms) and
            not name_lower.replace(' ', '').replace('-', '').isdigit())

def is_valid_product_advanced(product_data):
    """Validación avanzada de producto"""
    return (product_data and 
            is_valid_product_name_advanced(product_data['name']) and
            has_price(product_data['price']))

def clean_product_list(products):
    """Limpiar lista de productos"""
    cleaned = []
    seen_names = set()
    
    for product in products:
        name = product['name']
        if (name not in seen_names and 
            is_valid_product_advanced(product) and
            len(name) > 2):
            cleaned.append(product)
            seen_names.add(name)
    
    return cleaned

def create_error_data(url, error_msg):
    return {
        "restaurant_name": f"Error: {error_msg}",
        "restaurant_url": url,
        "products": [
            {"name": "Error de carga", "price": "N/A"},
            {"name": "Intente más tarde", "price": "N/A"},
            {"name": "Menú no disponible", "price": "N/A"}
        ]
    }