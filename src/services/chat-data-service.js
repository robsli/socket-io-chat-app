import io from 'socket.io-client'

function ChatDataService({
  onFailedMessage,
  onLoadMessages,
  onNewMessage,
  onNewName,
  onReceiveSocketID
}) {
  const actions = {
    CONNECTED: 'CONNECTED',
    FAILED_MESSAGE: 'FAILED MESSAGE',
    LOAD_MESSAGE: 'LOAD MESSAGES',
    NEW_MESSAGE: 'NEW MESSAGE',
    NEW_NAME: 'NEW NAME'
  }
  const socketServer = 'http://192.168.0.40:8080'
  const socket = io(socketServer)

  socket.on(actions.CONNECTED, () => {
    onReceiveSocketID(socket.id)
  })

  socket.on(actions.FAILED_MESSAGE, () => {
    onFailedMessage()
  })

  socket.on(actions.LOAD_MESSAGE, (messages) => {
    onLoadMessages(messages)
  })

  socket.on(actions.NEW_MESSAGE, (message) => {
    onNewMessage(message)
  })

  socket.on(actions.NEW_NAME, (newName) => {
    onNewName(newName)
  })

  function getMessages() {
    socket.emit(actions.LOAD_MESSAGE)
  }

  function getName() {
    socket.emit(actions.NEW_NAME)
  }

  function sendMessage(message) {
    socket.emit(actions.NEW_MESSAGE, message)
  }

  return {
    getMessages,
    getName,
    sendMessage
  }
}

export default ChatDataService
