// eslint-disable-next-line no-unused-vars
import React from 'react'

// eslint-disable-next-line react/prop-types
function Button({ text }) {
  return (
    <div>
      {/* <p className={`bg-[#5B6DF3] hover:bg-[#4859da] py-2 px-4 rounded-md text-white hover:text-white`}> {text} </p> */}
      <p className={`bg-gradient-to-r from-blue-500 to-purple-700 hover:from-blue-400 hover:to-purple-600 py-2 px-4 rounded-md text-white hover:text-white`}>
        {text}
      </p>
    </div>
  )
}

export default Button
