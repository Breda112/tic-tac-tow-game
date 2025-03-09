from flask import Flask, jsonify, request, g
import tictactoe as ttt
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

# Middleware to measure execution time
@app.before_request
def start_timer():
    g.start_time = time.time()

@app.after_request
def log_execution_time(response):
    if hasattr(g, "start_time"):
        execution_time = time.time() - g.start_time
        print(f"Endpoint: {request.path}, Method: {request.method}, Execution Time: {execution_time:.4f} seconds")
    return response

@app.route("/minimax1", methods=["POST"])
def minimax1():
    board = request.json["board"]
    player = request.json["player"]
    action = ttt.minimax1(board, player)
    return jsonify({"action": action})

@app.route("/minimax2", methods=["POST"])
def minimax2():
    board = request.json["board"]
    action = ttt.minimax2(board, 'X')
    return jsonify({"action": action})

if __name__ == "__main__":
    app.run(debug=True)
