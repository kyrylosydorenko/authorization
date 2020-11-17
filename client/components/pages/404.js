import React from 'react'
import { useHistory } from 'react-router-dom'

const NotFound = () => {
  const history = useHistory()
  const handleGoHome = () => {
    history.push('/')
  }
  return (
    <div className="flex text-center justify-center items-center h-full">
      <div className="flex flex-col mx-auto ">
        <h1 className="text-6xl">404</h1>
        <p className="text-gray-800 mb-5">Page Not Found</p>
        <p className="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p>
        <br />
        <button
          className="btn btn-secondary btn-lg"
          type="button"
          tabIndex="0"
          onClick={() => handleGoHome()}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}

NotFound.propTypes = {}

NotFound.defaultProps = {}

export default NotFound
