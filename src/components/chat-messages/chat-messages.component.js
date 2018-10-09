import React from 'react'
import PropTypes from 'prop-types'

import ChatMessageComponent from '../chat-message/chat-message.component'
import './chat-messages.component.css'

function ChatMessagesComponent({
  messages,
  socketID,
  userName
}) {

  return (
    <ul className="chat-messages">
      { messages.map(message => {
        return (
          <ChatMessageComponent
            key={ message.messageID }
            message={ message }
            socketID={ socketID }
            userName={ userName }
          />
        )
      })}
    </ul>
  )
}

ChatMessagesComponent.propTypes = {
  messages: PropTypes.array.isRequired,
  socketID: PropTypes.string,
  userName: PropTypes.string
}

export default ChatMessagesComponent
