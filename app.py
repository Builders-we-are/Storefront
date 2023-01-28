import sqlite3

from flask import Flask, render_template



app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


def get_db_connections():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/hi')
def hi_nigeria():
    return 'Hi Nigeria'



@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/menu')
def menus():
    conn = get_db_connections()
    menus = conn.execute('SELECT * FROM menus').fetchall()
    conn.close()
    return render_template('menu.html', menus=menus)



if __name__ == '__main__':
    app.run()
