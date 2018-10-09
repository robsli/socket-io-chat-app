import React from 'react'
import PropTypes from 'prop-types'
import './application-page-header.component.css'

function ApplicationPageHeaderComponent({ userName, onRequestNewName }) {

  return (
    <section className="page-header">
      <h1 className="page-header__heading">Welcome to the Unstable Stable</h1>
      <p className="page-header__user-name">
        { userName === undefined
          ? 'Getting your secret unicorn identity! Hang on one second.'
          : userName === null
            ? 'All unicorn identities have been taken. Please try again later.'
            : 'Your secret unicorn identity is: '
        }
        { userName != null && <span className="page-header__user-name--unicorn">{ userName }</span> }
      </p>
      { userName != null &&
        <button
          className='page-header__new-name'
          onClick={ onRequestNewName }
        >
          request a new name
        </button>
      }

    </section>
  )
}

ApplicationPageHeaderComponent.propTypes = {
  userName: PropTypes.string,
  onRequestNewName: PropTypes.func
}

export default ApplicationPageHeaderComponent
