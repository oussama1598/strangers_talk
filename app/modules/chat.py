from flask_socketio import join_room, emit
from app.modules.client import Client


class Chat:
    def __init__(self):
        self.queue = []
        self.clients = {}
        self.online_users = 0

    def client_added(self, sid, user_data):
        self.online_users += 1

        self.clients[sid] = Client(sid, user_data)

    def client_left(self, sid):
        self.online_users -= 1

        self.leave_conversation(sid)

        del self.clients[sid]

    def broadcast_online_users_number(self):
        emit('users_updated', self.online_users, broadcast=True)

    def update_client_data(self, sid, data):
        self.clients[sid].update_data(data)

    def client_look_for_room(self, sid):
        if len(self.queue) == 0:
            self.queue.append(sid)

            print(f'{sid} Client added to queue')

            return

        peer_id = self.queue.pop(0)

        self.clients[sid].talking_to = peer_id
        self.clients[peer_id].talking_to = sid

        emit('stranger_found', {'strangers_id': peer_id}, room=sid)
        emit('stranger_found', {'strangers_id': sid}, room=peer_id)

    def user_typing_to(self, sid, data):
        client_to_id = self.clients[sid].talking_to

        emit('stranger_typing', room=client_to_id)

    def message_to(self, sid, data):
        # TODO: check if the stranger exists
        print(data)
        client_to_id = self.clients[sid].talking_to

        emit('message', data['message'], room=client_to_id)

    def leave_conversation(self, sid):
        talking_to = self.clients[sid].talking_to

        if talking_to != None:
            emit('stranger_left', room=talking_to)

            self.clients[talking_to].talking_to = None
