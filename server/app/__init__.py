from flask import Flask, send_from_directory
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__, static_folder='../client/build/static')

socketio = SocketIO(app, cors_allowed_origins='*')

CORS(app)

from app import routes
from app.services import socket_io
