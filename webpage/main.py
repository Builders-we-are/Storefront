from flask import Flask, render_template as rt

app = Flask(__name__)

@app.route("/")
def hello():
    return rt("index.html")

@app.route("/menu")
def menu():
    return rt("menu.html")

if __name__ =="__main__":
    app.run(debug=True)