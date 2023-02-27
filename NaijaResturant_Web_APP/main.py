from flask import Flask, render_template, url_for
import sqlite3

app = Flask(__name__)


def get_db_connection():
    conn = sqlite3.connect("food_database.db")
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/')
def index():
    conn = get_db_connection()
    foodmenu = conn.execute("select * from menu_table").fetchall()
    conn.close()
    return render_template('index.html', foodmenu=foodmenu)

@app.route("/menu")
def menu():
    conn = get_db_connection()
    foodmenu = conn.execute("select * from menu_table").fetchall()
    conn.close()
    return render_template('menu.html', foodmenu=foodmenu)

if __name__ == '__main__':
    app.run(debug=True)