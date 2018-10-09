import React from 'react'
import PropTypes from 'prop-types'
import './message-form.component.css'

function MessageFormComponent({
  currentMessage,
  failedMessage,
  onMessageChange,
  onMessageSubmit,
  userName
}) {
  return (
    <form className='message-form' onSubmit={ onMessageSubmit }>
      <input
        autoComplete='off'
        className='message-form__input'
        id='input-message'
        type='text'
        value={ currentMessage }
        onChange={ onMessageChange }
      />
      <button
        className='message-form__button'
        disabled={ currentMessage === '' || userName == null }
        id='send-button'
      >Send
      </button>
      { failedMessage
        ? <span className='message-form__failed-message'>Failed to send message. Please make sure you have a secret unicorn identity.</span>
        : ''
      }
    </form>
  )
}

MessageFormComponent.propTypes = {
  currentMessage: PropTypes.string.isRequired,
  onMessageChange: PropTypes.func.isRequired,
  onMessageSubmit: PropTypes.func.isRequired,
  userName: PropTypes.string
}

export default MessageFormComponent
