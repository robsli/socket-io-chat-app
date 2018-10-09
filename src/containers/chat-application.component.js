import React, { Component } from 'react'

import ApplicationPageHeaderComponent from '../components/application-page-header/application-page-header.component'
import ChatWindowComponent from '../components/chat-window/chat-window.component'
import ChatDataService from '../services/chat-data.service'
import ServerConnection from '../services/server-connection.service'
import SessionStorageManager from '../services/session-storage-manager.service'
import './chat-application.component.css'

class ChatApplicationComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMessage: '',
      failedMessage: false,
      messages: [],
      socketID: null,
      userName: undefined
    }

    this.chatDataService = null
    this.onMessageChange = this.onMessageChange.bind(this)
    this.onMessageSubmit = this.onMessageSubmit.bind(this)
    this.onRequestNewName = this.onRequestNewName.bind(this)
    this.sessionStorageManager = new SessionStorageManager()
  }

  componentDidMount() {
    const currentUserName = this.sessionStorageManager.getUserName()

    ServerConnection.getPort()
      .then(response => {
        const serverPort = response.port == undefined ? response.httpPort : response.port
        this.chatDataService = new ChatDataService({
          onFailedMessage: this.onFailedMessage.bind(this),
          onLoadMessages: this.onLoadMessages.bind(this),
          onNewMessage: this.onNewMessage.bind(this),
          onNewName: this.onNewName.bind(this),
          onReceiveSocketID: this.onReceiveSocketID.bind(this),
          serverPort: serverPort
        })

        if (currentUserName == null) {
          this.chatDataService.getName()
        } else {
          this.setState({ userName: currentUserName })
        }
        this.chatDataService.getMessages()
      })
  }

  onFailedMessage() {
    this.setState({ failedMessage: true })
  }

  onLoadMessages(messages) {
    this.setState({ messages: messages })
    this.scrollToBottomOfElement(document.querySelector('.chat-messages'))
  }

  onMessageChange(event) {
    this.setState({ currentMessage: event.target.value })
  }

  onMessageSubmit(event) {
    event.preventDefault()

    if (this.state.currentMessage != null && this.state.currentMessage.trim() !== '') {
      this.chatDataService.sendMessage({
        messageText: this.state.currentMessage,
        senderName: this.state.userName
      })
      this.setState({ currentMessage: '' })
    }
  }

  onNewMessage(message) {
    this.setState({ messages: [ ...this.state.messages, message ] })
    this.scrollToBottomOfElement(document.querySelector('.chat-messages'))
  }

  onNewName(newName) {
    this.setState({ userName: newName })
    this.sessionStorageManager.setUserName(newName)

    this.scrollToBottomOfElement(document.querySelector('.chat-messages'))
    document.querySelector('.message-form__input').focus()
  }

  onReceiveSocketID(socketID) {
    this.setState({ socketID: socketID })
  }

  onRequestNewName(newName) {
    this.sessionStorageManager.removeUserName()

    this.chatDataService.getName()
  }

  scrollToBottomOfElement(element) {
    element.scrollTop = element.scrollHeight
  }

  render() {
    return (
      <main className="chat-application">
        <ApplicationPageHeaderComponent
          userName={ this.state.userName }
          onRequestNewName={ this.onRequestNewName }
        />
        <ChatWindowComponent
          currentMessage={ this.state.currentMessage }
          failedMessage={ this.state.failedMessage }
          messages={ this.state.messages }
          socketID={ this.state.socketID }
          userName={ this.state.userName }
          onMessageChange={ this.onMessageChange }
          onMessageSubmit={ this.onMessageSubmit }
        />
      </main>
    )
  }
}

export default ChatApplicationComponent
