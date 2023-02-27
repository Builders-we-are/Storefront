import sqlite3

connection = sqlite3.connect('food_database.db')


with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO menu_table (Name,price,image,description ) VALUES (?, ?, ?, ?)",
            ('Fried Rice', 30, 'static/fried_rice.jpg', '')
            )
cur.execute("INSERT INTO menu_table (Name,price,image,description ) VALUES (?, ?, ?, ?)",
            ('Jollof Rice', 30, 'static/jollof_rice.jpg', '')
            )
cur.execute("INSERT INTO menu_table (Name,price,image,description ) VALUES (?, ?, ? , ?)",
            ('White Rice', 30, 'static/white_rice.jpg', '')
            )
cur.execute("INSERT INTO menu_table (Name,price,image,description ) VALUES (?, ?, ?, ?)",
            ('Egusi Soup', 30, 'static/egusi_soup.jpg', '')
            )
cur.execute("INSERT INTO menu_table (Name,price,image,description ) VALUES (?, ?, ?, ?)",
            ('Ogbono Soup', 30, 'static/ogbono_soup.jpg', '')
            )
cur.execute("INSERT INTO menu_table (Name,price,image,description ) VALUES (?, ?, ?, ?)",
            ('Pepper Soup', 30, 'static/pepper_soup.jpg', '')
            )
cur.execute("INSERT INTO menu_table (Name,price,image,description ) VALUES (?, ?, ?, ?)",
            ('Stew', 30, 'static/stew.jpg', '')
            )

connection.commit()
connection.close()
