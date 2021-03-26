import enum

class MessageType(enum.Enum):
   SUCCESS = 1
   ERROR = 2

class MessageResponse:
    def __init__(self, messageType, message, fileName=""):
        self.messageType = messageType
        self.message = message
        self.fileName = fileName

    def __str__(self):
        return { "message": self.message, "messageType": self.messageType.name, "fileName": self.fileName }.__str__()

    def get(self):
        return { "message": self.message, "messageType": self.messageType.name, "fileName": self.fileName }