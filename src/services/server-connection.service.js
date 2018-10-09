const socketServer = process.env.NODE_ENV === 'development'
? 'http://localhost:8080'
: 'https://socketio-chat-app-staging.herokuapp.com'

const ServerConnection = {
  getPort: () => {
    return fetch(socketServer, {
      credentials: 'include',
      method: 'GET'
    })
    .then(response => {
      console.log('port response back')
      console.log(response)
      return response.json()
    })
  }
}

export default ServerConnection
