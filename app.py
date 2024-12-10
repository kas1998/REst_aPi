from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# Lista de tareas como ejemplo inicial
tasks = [
    {"id": 1, "title": "Aprender Flask", "done": False},
    {"id": 2, "title": "Crear una página interactiva", "done": True},
]

# Ruta para servir el archivo HTML
@app.route('/')
def index():
    return render_template('index.html')

# API para obtener todas las tareas
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    return jsonify({"tasks": tasks})

# API para agregar una nueva tarea
@app.route('/api/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    if not data or not "title" in data:
        return jsonify({"error": "Datos inválidos"}), 400
    new_task = {
        "id": len(tasks) + 1,
        "title": data["title"],
        "done": False,
    }
    tasks.append(new_task)
    return jsonify(new_task), 201

if __name__ == '__main__':
    app.run(debug=True)
