from flask import request
from flask_socketio import emit
from app import socketio
from app.modules.chat import Chat

chat_app = Chat()


@socketio.on('connect')
def connect():
    chat_app.client_added(request.sid, {
        "name": "Stranger",
        "gender": None,
        "talking_to": None
    })

    chat_app.broadcast_online_users_number()

    emit('users_updated', chat_app.online_users, broadcast=True)


@socketio.on('disconnect')
def disconnect():
    chat_app.client_left(request.sid)

    chat_app.broadcast_online_users_number()


@socketio.on('look_for_stranger')
def look_for_stranger(data):
    chat_app.update_client_data(request.sid, data)

    chat_app.client_look_for_room(request.sid)


@socketio.on('user_typing')
def user_typing(data):
    chat_app.user_typing_to(request.sid, data)


@socketio.on('message_stranger')
def message_stranger(data):
    chat_app.message_to(request.sid, data)


@socketio.on('user_leave')
def user_leave():
    chat_app.leave_conversation(request.sid)
