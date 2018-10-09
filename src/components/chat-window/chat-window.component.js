import React from 'react'
import PropTypes from 'prop-types'

import ChatMessagesComponent from '../chat-messages/chat-messages.component'
import MessageFormComponent from '../message-form/message-form.component'
import './chat-window.component.css'

function ChatWindowComponent({
  currentMessage,
  failedMessage,
  messages,
  userName,
  socketID,
  onMessageChange,
  onMessageSubmit
}) {

  return (
    <section className="chat-window">
      <ChatMessagesComponent
        messages={ messages }
        socketID={ socketID }
        userName={ userName }
      />
      <MessageFormComponent
        currentMessage={ currentMessage }
        failedMessage={ failedMessage }
        userName={ userName }
        onMessageChange={ onMessageChange }
        onMessageSubmit={ onMessageSubmit }
      />
    </section>
  )
}

ChatWindowComponent.propTypes = {
  currentMessage: PropTypes.string.isRequired,
  failedMessage: PropTypes.bool.isRequired,
  messages: PropTypes.array.isRequired,
  userName: PropTypes.string,
  socketID: PropTypes.string,
  onMessageChange: PropTypes.func.isRequired,
  onMessageSubmit: PropTypes.func.isRequired
}

export default ChatWindowComponent
