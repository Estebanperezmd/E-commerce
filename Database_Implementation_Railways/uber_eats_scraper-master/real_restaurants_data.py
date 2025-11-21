# real_restaurants_data.py
def get_real_restaurant_examples():
    """Proveer URLs de ejemplo de restaurantes reales (pueden cambiar)"""
    
    # Estos son ejemplos de URLs reales (pueden expirar)
    real_restaurants = {
        "toronto": [
            "https://www.ubereats.com/store/mcdonalds-front-st/Dq1Jh5yfT7yVvJzJzJzJzA",
            "https://www.ubereats.com/store/tim-hortons-king-st/Wq2Kh6zfU8zWwKaKaKaKaB", 
            "https://www.ubereats.com/store/pizza-pizza-queen-st/Er3Li7agV9AxLbLbLbLbLC",
            "https://www.ubereats.com/store/starbucks-dundas-st/Ts4Mj8bhW0ByMcMcMcMcMD",
            "https://www.ubereats.com/store/subway-yonge-st/Fu5Nk9ciX1CzNdNdNdNdNE"
        ],
        "kingston": [
            "https://www.ubereats.com/store/mcdonalds-downtown-kingston/Gv6Ol0djY2DaOeOeOeOeOF",
            "https://www.ubereats.com/store/tim-hortons-princess-st/Hw7Pm1ekZ3EbPfPfPfPfPG",
            "https://www.ubereats.com/store/pizza-pizza-kingston/Ix8Qn2flA4FcQgQgQgQgQH"
        ],
        "hamilton": [
            "https://www.ubereats.com/store/mcdonalds-main-st-hamilton/Jy9Ro3gmB5GdRhRhRhRhRI",
            "https://www.ubereats.com/store/tim-hortons-james-st/Kz0Sp4hnC6HeSiSiSiSiSJ",
            "https://www.ubereats.com/store/pizza-pizza-hamilton/La1Tq5ioD7IfTjTjTjTjTK"
        ]
    }
    
    return real_restaurants

def save_real_urls_for_testing():
    """Guardar URLs reales para testing"""
    real_data = get_real_restaurant_examples()
    
    for city, urls in real_data.items():
        filename = f"{city}_restaurant_urls.txt"
        with open(filename, 'w', encoding='utf-8') as f:
            for url in urls:
                f.write(url + '\n')
        print(f"💾 {city}: {len(urls)} URLs guardadas")
    
    return real_data