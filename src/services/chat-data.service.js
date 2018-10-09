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

  const socketServer = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080'
  : 'https://socketio-chat-app-staging.herokuapp.com'

  const socket = io(socketServer)

  socket.on(actions.CONNECTED, () => {
    console.log('connected to socket server!')
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

  return {
    getMessages: () => socket.emit(actions.LOAD_MESSAGE),
    getName: () => {
      console.log('chat-data service asking for new name')
      socket.emit(actions.NEW_NAME)
    },
    sendMessage: (message) => socket.emit(actions.NEW_MESSAGE, message)
  }
}

export default ChatDataService
