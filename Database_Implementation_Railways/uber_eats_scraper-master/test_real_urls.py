# test_fixed.py
import menu_scraper_fixed

# Probar con McDonald's
test_url = "https://www.ubereats.com/ca/store/mcdonalds-barton-%26-lottridge/zDzvKIhxQVSH8qCmrOpc0Q"

print("TESTEANDO SCRAPER FIXED...")
print("=" * 50)

result = menu_scraper_fixed.scrape_menu(test_url)

print(f"\nRESULTADO:")
print(f"Restaurante: {result['restaurant_name']}")
print(f"Productos:")
for i, product in enumerate(result['products'], 1):
    print(f"   {i}. {product['name']} - {product['price']}")