import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { validateUser } from '../../redux/reducers/auth'

const Main = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(validateUser())
  }, [dispatch])

  return <div className="flex w-full h-full ju text-2xl items-center justify-center">Main Page</div>
}

export default Main
