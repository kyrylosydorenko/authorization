import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { ToastContainer, toast, Slide } from 'react-toastify'
import { clearAuthErrorAndMessage } from '../../redux/reducers/auth'

import 'react-toastify/dist/ReactToastify.css'

const Toastify = () => {
  const { message, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const contextClass = {
    success: 'text-blue-600',
    error: 'text-red-600',
    info: 'text-gray-600',
    warning: 'text-orange-400',
    default: 'text-indigo-600',
    dark: 'text-gray-600'
  }

  useEffect(() => {
    const notify = () =>
      toast(`${message}`, {
        transition: Slide,
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        closeButton: false
      })
    if (message) {
      notify()
    }
    if (message) dispatch(clearAuthErrorAndMessage())
  }, [message, dispatch])

  useEffect(() => {
    const notify = () =>
      toast.error(`${error}`, {
        transition: Slide,
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        closeButton: false
      })
    if (error) {
      notify()
    }
    if (error) dispatch(clearAuthErrorAndMessage())
  }, [error, dispatch])

  return (
    <div>
      <ToastContainer
        toastClassName={() =>
          'flex p-1 min-h-10 justify-center overflow-hidden cursor-pointer bg-transparent'
        }
        bodyClassName={({ type }) => `${contextClass[type || 'default']} text-lg block p-3`}
        transition={Slide}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default Toastify
