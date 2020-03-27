from flask import send_from_directory
from app import app


@app.route('/')
def serve_static_index():
    return send_from_directory('./web/build/', 'index.html')
