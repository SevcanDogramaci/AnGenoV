import enum

class MessageType(enum.Enum):
   SUCCESS = 1
   ERROR = 2

class MessageResponse:
    def __init__(self, messageType, message, returnObject=""):
        self.messageType = messageType
        self.message = message
        self.returnObject = returnObject

    def __str__(self):
        return { "message": self.message, "messageType": self.messageType.name, "returnObject": self.returnObject }.__str__()

    def get(self):
        return { "message": self.message, "messageType": self.messageType.name, "returnObject": self.returnObject }