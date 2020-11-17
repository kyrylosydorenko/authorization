/* eslint-disable react/button-has-type */
import React from 'react'

const Button = ({ title, styleButton, type, handleClick }) => {
  return (
    <button
      type={type}
      className={`${styleButton} py-2 rounded-full
      tracking-wide capitalize focus:outline-none`}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default Button
