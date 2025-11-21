
CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    city TEXT,
    count INTEGER,
    success_rate TEXT,
    processed_at TIMESTAMP
);

CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    city_id INTEGER REFERENCES cities(id),
    restaurant_name TEXT,
    restaurant_url TEXT
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES restaurants(id),
    name TEXT,
    price TEXT
);

CREATE TABLE metadata (
    id SERIAL PRIMARY KEY,
    scraping_date TIMESTAMP,
    cities_processed INTEGER,
    restaurants_per_city INTEGER,
    data_source TEXT
);

INSERT INTO metadata (scraping_date, cities_processed, restaurants_per_city, data_source) VALUES ('2025-11-19T19:37:54.685674', 3, 3, 'uber_eats_brand_pages');
INSERT INTO cities (city, count, success_rate, processed_at) VALUES ('toronto', 9, '9/9', '2025-11-19T19:47:02.214992');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (1, 'Starbucks (Bedford Bloor)', 'https://www.ubereats.com/ca/store/starbucks-bedford-bloor/6-18OYmRTI6Ws7Soz-Y4gQ');
INSERT INTO products (restaurant_id, name, price) VALUES (1, 'Caffè Latte', '$5.85');
INSERT INTO products (restaurant_id, name, price) VALUES (1, 'Egg White & Roasted Red Pepper Egg Bites', '$6.95');
INSERT INTO products (restaurant_id, name, price) VALUES (1, 'Crispy Grilled Cheese on Sourdough', '$7.95');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (1, 'Tim Hortons (375 King Street West)', 'https://www.ubereats.com/ca/store/tim-hortons-375-king-street-west/fra0DDbERXmVMHeW3UxqZw');
INSERT INTO products (restaurant_id, name, price) VALUES (2, 'Original Protein Iced Latte', '$5.19');
INSERT INTO products (restaurant_id, name, price) VALUES (2, 'Mango Starfruit Infusr™ Energy Drink', '$4.39');
INSERT INTO products (restaurant_id, name, price) VALUES (2, 'Original Iced Latte', '$4.19');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (1, 'Pizza Pizza (Church & Wellesley)', 'https://www.ubereats.com/ca/store/pizza-pizza-church-%26-wellesley/BXhFbrPASRir5GpSbMY2JQ');
INSERT INTO products (restaurant_id, name, price) VALUES (3, 'Large', '$15.99');
INSERT INTO products (restaurant_id, name, price) VALUES (3, 'Medium', '$12.29');
INSERT INTO products (restaurant_id, name, price) VALUES (3, '10 Wings', '$17.19');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (1, 'Pizza Pizza (Church & Wellington)', 'https://www.ubereats.com/ca/store/pizza-pizza-church-%26-wellington/3nGkl-qpSnewPdDtI-Xz-w');
INSERT INTO products (restaurant_id, name, price) VALUES (4, 'Large', '$15.99');
INSERT INTO products (restaurant_id, name, price) VALUES (4, 'Single Pizza (Medium) + Dipping Sauce', '$13.88');
INSERT INTO products (restaurant_id, name, price) VALUES (4, 'Medium', '$12.29');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (1, 'Burger King (The Exchange Tower)', 'https://www.ubereats.com/ca/store/burger-king-the-exchange-tower/q7Wl1EPmQsaYTHJ1ltcU2A');
INSERT INTO products (restaurant_id, name, price) VALUES (5, 'Whopper® Jr.', '$5.69');
INSERT INTO products (restaurant_id, name, price) VALUES (5, 'Spicy Crispy Chicken Sandwich Meals', '$15.09');
INSERT INTO products (restaurant_id, name, price) VALUES (5, 'Whopper®', '$9.69');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (1, 'Wendy''s (110 Blue Jays Way)', 'https://www.ubereats.com/ca/store/wendys-110-blue-jays-way/m-QadXkBX4K6B6xKTxMixA');
INSERT INTO products (restaurant_id, name, price) VALUES (6, 'Baconator® with Cheese (Cals: 970)', '$12.21');
INSERT INTO products (restaurant_id, name, price) VALUES (6, '5-Piece Chicken Strips (Cals: 640)', '$13.30');
INSERT INTO products (restaurant_id, name, price) VALUES (6, 'Spicy Chicken Sandwich (Cals: 450)', '$10.15');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (1, 'Wendy''s (615 Dundas Street East, Regent Park)', 'https://www.ubereats.com/ca/store/wendys-615-dundas-street-east-regent-park/zAdG41bDRMeIM6epksh3aw');
INSERT INTO products (restaurant_id, name, price) VALUES (7, 'Spicy Chicken Sandwich (Cals: 450)', '$10.15');
INSERT INTO products (restaurant_id, name, price) VALUES (7, 'Baconator® with Cheese (Cals: 970)', '$12.21');
INSERT INTO products (restaurant_id, name, price) VALUES (7, '5-Piece Chicken Strips (Cals: 640)', '$13.30');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (1, 'McDonald''s (Yonge & Elm)', 'https://www.ubereats.com/ca/store/mcdonalds-yonge-%26-elm/pprgsJgLR5WfQtzZ9GAnug');
INSERT INTO products (restaurant_id, name, price) VALUES (8, '6 Chicken McNuggets [290-360 Cals]', '$9.69');
INSERT INTO products (restaurant_id, name, price) VALUES (8, 'Big Mac [560.0 Cals]', '$10.29');
INSERT INTO products (restaurant_id, name, price) VALUES (8, 'Med Fries [350.0 Cals]', '$5.69');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (1, 'Starbucks (Bloor & Jarvis)', 'https://www.ubereats.com/ca/store/starbucks-bloor-%26-jarvis/T9vIDBQVTLGKnrqbyLN9mw');
INSERT INTO products (restaurant_id, name, price) VALUES (9, 'Double-Smoked Bacon, Cheddar & Egg Sandwich', '$7.35');
INSERT INTO products (restaurant_id, name, price) VALUES (9, 'Iced Brown Sugar Oat Shaken Espresso', '$7.35');
INSERT INTO products (restaurant_id, name, price) VALUES (9, 'Iced Matcha Tea Latte', '$6.85');
INSERT INTO cities (city, count, success_rate, processed_at) VALUES ('kingston', 9, '9/9', '2025-11-19T19:55:28.747608');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (2, 'Tim Hortons (29 Niagara Park Dr)', 'https://www.ubereats.com/ca/store/tim-hortons-29-niagara-park-dr/gdHiPiBEVfacKV2q86V3Gg');
INSERT INTO products (restaurant_id, name, price) VALUES (10, 'Original Iced Capp®', '$3.99');
INSERT INTO products (restaurant_id, name, price) VALUES (10, '20 Timbits® Multi-Pack', '$6.39');
INSERT INTO products (restaurant_id, name, price) VALUES (10, 'French Vanilla', '$3.49');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (2, 'McDonald''s (Kingston', 'https://www.ubereats.com/ca/store/mcdonalds-kingston-312-princess/xz8AH0-9SiC_Di8lwWeyFA');
INSERT INTO products (restaurant_id, name, price) VALUES (11, '6 Chicken McNuggets [290-360 Cals]', '$8.29');
INSERT INTO products (restaurant_id, name, price) VALUES (11, 'Med Fries [350.0 Cals]', '$5.59');
INSERT INTO products (restaurant_id, name, price) VALUES (11, 'McDouble [380.0 Cals]', '$4.79');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (2, 'Starbucks (121 Division Street)', 'https://www.ubereats.com/ca/store/starbucks-121-division-street/s0mMU4eiWTC1WgLN-CRZFQ');
INSERT INTO products (restaurant_id, name, price) VALUES (12, 'Double-Smoked Bacon, Cheddar & Egg Sandwich', '$7.35');
INSERT INTO products (restaurant_id, name, price) VALUES (12, 'Crispy Grilled Cheese on Sourdough', '$7.75');
INSERT INTO products (restaurant_id, name, price) VALUES (12, 'Iced Matcha Tea Latte', '$6.85');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (2, 'Pizza Pizza (760 Kingston 15)', 'https://www.ubereats.com/ca/store/pizza-pizza-760-kingston-15/bd_N8bK9RS666JJgEUumjQ');
INSERT INTO products (restaurant_id, name, price) VALUES (13, 'Large', '$15.99');
INSERT INTO products (restaurant_id, name, price) VALUES (13, 'Medium', '$12.29');
INSERT INTO products (restaurant_id, name, price) VALUES (13, 'Large Pepperoni', '$18.94');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (2, 'Starbucks (Highway 15 & Rose Abbey Drive)', 'https://www.ubereats.com/ca/store/starbucks-highway-15-%26-rose-abbey-drive/2ZTyykh7QGSg_G6vAD7s5w');
INSERT INTO products (restaurant_id, name, price) VALUES (14, 'Cappuccino', '$5.65');
INSERT INTO products (restaurant_id, name, price) VALUES (14, 'Double-Smoked Bacon, Cheddar & Egg Sandwich', '$7.35');
INSERT INTO products (restaurant_id, name, price) VALUES (14, 'Everything Croissant & Roasted Ham Sandwich', '$7.35');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (2, 'Subway (3-841 Highway 15)', 'https://www.ubereats.com/ca/store/subway-3-841-highway-15/vMwtwkozQjqUShh01WBp7Q');
INSERT INTO products (restaurant_id, name, price) VALUES (15, 'Red Velvet Cookie', '$30.00');
INSERT INTO products (restaurant_id, name, price) VALUES (15, 'Cold Cut Combo (Footlong)', '$11.79');
INSERT INTO products (restaurant_id, name, price) VALUES (15, 'Italian B.M.T.® (Footlong)', '$13.09');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (2, 'Subway (Portsmouth)', 'https://www.ubereats.com/ca/store/subway-portsmouth/csdu6sVkQWKwn5xWqHPJ7A');
INSERT INTO products (restaurant_id, name, price) VALUES (16, 'Turkey Breast', '$13.96');
INSERT INTO products (restaurant_id, name, price) VALUES (16, 'Steak & Cheese', '$9.69');
INSERT INTO products (restaurant_id, name, price) VALUES (16, 'Meatball Marinara', '$7.99');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (2, 'Wendy''s (17 Warne Crescent)', 'https://www.ubereats.com/ca/store/wendys-17-warne-crescent/AUaXCLW6QjGDp0ddBIqpqw');
INSERT INTO products (restaurant_id, name, price) VALUES (17, '10-Piece Crispy Chicken Nuggets (Cals: 410)', '$9.30');
INSERT INTO products (restaurant_id, name, price) VALUES (17, 'Baconator® with Cheese (Cals: 970)', '$11.97');
INSERT INTO products (restaurant_id, name, price) VALUES (17, '6-Piece Crispy Chicken Nuggets (Cals: 190)', '$4.46');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (2, 'Uber Eats: Food Delivery', 'https://play.google.com/store/apps/details?id=com.ubercab.eats');
INSERT INTO products (restaurant_id, name, price) VALUES (18, 'Main Course', '$12.99');
INSERT INTO products (restaurant_id, name, price) VALUES (18, 'Specialty Dish', '$15.99');
INSERT INTO products (restaurant_id, name, price) VALUES (18, 'Side Dish', '$5.99');
INSERT INTO cities (city, count, success_rate, processed_at) VALUES ('hamilton', 9, '9/9', '2025-11-19T20:04:10.853626');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (3, 'Subway (155 John St S)', 'https://www.ubereats.com/ca/store/subway-155-john-st-s/irDDo-_VQU2z3AzZn2wS_w');
INSERT INTO products (restaurant_id, name, price) VALUES (19, 'Steak & Cheese (Footlong)', '$16.79');
INSERT INTO products (restaurant_id, name, price) VALUES (19, 'Cold Cut Combo (6'''')', '$8.24');
INSERT INTO products (restaurant_id, name, price) VALUES (19, 'Sweet Onion Chicken Teriyaki (Footlong)', '$15.68');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (3, 'Burger King (743 Upper James St)', 'https://www.ubereats.com/ca/store/burger-king-743-upper-james-st/YfjmPyHzUcat8tYw739snw');
INSERT INTO products (restaurant_id, name, price) VALUES (20, 'Whopper® Jr.', '$5.69');
INSERT INTO products (restaurant_id, name, price) VALUES (20, 'Whopper® Meals', '$15.59');
INSERT INTO products (restaurant_id, name, price) VALUES (20, 'Whopper®', '$9.69');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (3, 'Starbucks (112 King Street East)', 'https://www.ubereats.com/ca/store/starbucks-112-king-street-east/0RKjIXToTbi6oo7f3JAKGw');
INSERT INTO products (restaurant_id, name, price) VALUES (21, 'Double-Smoked Bacon, Cheddar & Egg Sandwich', '$7.35');
INSERT INTO products (restaurant_id, name, price) VALUES (21, 'Iced Caramel Macchiato', '$6.75');
INSERT INTO products (restaurant_id, name, price) VALUES (21, 'Pumpkin Spice Latte', '$6.85');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (3, 'Burger King (CF Limeridge Mall Food court', 'https://www.ubereats.com/ca/store/burger-king-cf-limeridge-mall-food-court-f112b/OsKdbNJuUaSZY15o_SrSMA');
INSERT INTO products (restaurant_id, name, price) VALUES (22, 'Whopper® Meals', '$15.60');
INSERT INTO products (restaurant_id, name, price) VALUES (22, 'Whopper® Jr.', '$5.67');
INSERT INTO products (restaurant_id, name, price) VALUES (22, 'Double Whopper® Meals', '$18.02');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (3, 'Pizza Pizza (1296 King Street E.)', 'https://www.ubereats.com/ca/store/pizza-pizza-1296-king-street-e/fcEVi4fnRECkiXYjjX0FgQ');
INSERT INTO products (restaurant_id, name, price) VALUES (23, 'Medium', '$14.29');
INSERT INTO products (restaurant_id, name, price) VALUES (23, 'Create Your Own Panzerotti', '$12.49');
INSERT INTO products (restaurant_id, name, price) VALUES (23, 'Small', '$11.89');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (3, 'Wendy''s (1550 Upper James Street)', 'https://www.ubereats.com/ca/store/wendys-1550-upper-james-street/Hku37nAlTlupoIoP104ONw');
INSERT INTO products (restaurant_id, name, price) VALUES (24, 'Spicy Chicken Sandwich (Cals: 450)', '$10.03');
INSERT INTO products (restaurant_id, name, price) VALUES (24, 'Baconator® with Cheese (Cals: 970)', '$12.09');
INSERT INTO products (restaurant_id, name, price) VALUES (24, '5-Piece Chicken Strips (Cals: 640)', '$13.18');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (3, 'Starbucks (Locke & Chatham)', 'https://www.ubereats.com/ca/store/starbucks-locke-%26-chatham/GcnyZb9FQl6veshgnsZXsg');
INSERT INTO products (restaurant_id, name, price) VALUES (25, 'Everything Croissant & Roasted Ham Sandwich', '$7.35');
INSERT INTO products (restaurant_id, name, price) VALUES (25, 'Double-Smoked Bacon, Cheddar & Egg Sandwich', '$7.35');
INSERT INTO products (restaurant_id, name, price) VALUES (25, 'Caramel Macchiato', '$6.05');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (3, 'Uber Eats: Food Delivery', 'https://play.google.com/store/apps/details?id=com.ubercab.eats');
INSERT INTO products (restaurant_id, name, price) VALUES (26, 'Main Course', '$12.99');
INSERT INTO products (restaurant_id, name, price) VALUES (26, 'Specialty Dish', '$15.99');
INSERT INTO products (restaurant_id, name, price) VALUES (26, 'Side Dish', '$5.99');
INSERT INTO restaurants (city_id, restaurant_name, restaurant_url) VALUES (3, 'McDonald''s (675 Upper James Street)', 'https://www.ubereats.com/ca/store/mcdonalds-675-upper-james-street/1blEfYbNQwWQOZ_yQ-CJLg');
INSERT INTO products (restaurant_id, name, price) VALUES (27, 'Med Fries [350.0 Cals]', '$5.59');
INSERT INTO products (restaurant_id, name, price) VALUES (27, 'McDouble [380.0 Cals]', '$4.69');
INSERT INTO products (restaurant_id, name, price) VALUES (27, '10 Chicken McNuggets [490-630 Cals]', '$11.59');