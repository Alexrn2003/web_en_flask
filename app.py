# app.py
from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def data():
    # Genera valores aleatorios para temperatura y humedad
    temperature = random.uniform(15.0, 30.0)  # Valores entre 15 y 30 grados Celsius
    humidity = random.uniform(30.0, 70.0)     # Valores entre 30% y 70%
    return jsonify({
        'temperature': round(temperature, 2),
        'humidity': round(humidity, 2)
    })

if __name__ == '__main__':
    app.run(debug=True)