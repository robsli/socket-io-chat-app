import React from 'react'
import PropTypes from 'prop-types'

import './chat-message.component.css'

function ChatMessageComponent({
  message,
  socketID,
  userName
}) {
  return (
    <li
      className={ message.senderID === socketID ? 'chat-message chat-message__self' : 'chat-message chat-message__other' }
      id= { 'chat-message-' + message.messageID }
    >
      { message.senderID === socketID && message.senderName === userName
        ? ''
        : <p className='chat-message__sender'>{ message.senderName }</p>
      }
      <p className='chat-message__text'>
        { message.messageText }
      </p>

    </li>
  )
}

ChatMessageComponent.propTypes = {
  message: PropTypes.object.isRequired,
  socketID: PropTypes.string,
  userName: PropTypes.string
}

export default ChatMessageComponent
