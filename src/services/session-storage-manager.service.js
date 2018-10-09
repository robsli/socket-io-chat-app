function SessionStorageManager() {
  const USER_NAME = 'USER NAME'

  function getUserName() {
    const userName = sessionStorage.getItem(USER_NAME)

    if (userName === 'null' ) {
      return null
    } else {
      return userName
    }
  }

  function removeUserName() {
    sessionStorage.removeItem(USER_NAME)
  }

  function setUserName(newName) {
    sessionStorage.setItem(USER_NAME, newName)
  }

  return {
    getUserName,
    removeUserName,
    setUserName
  }
}

export default SessionStorageManager
