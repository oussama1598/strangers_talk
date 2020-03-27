class Client:
    def __init__(self, sid, user_data):
        self.sid = sid
        self.name = user_data['name']
        self.gender = user_data['gender']
        self.talking_to = None

    def update_data(self, data):
        if data['name'] != '':
            self.name = data['name']

        self.gender = data['gender']
