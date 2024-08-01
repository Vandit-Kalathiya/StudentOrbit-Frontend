// eslint-disable-next-line no-unused-vars
import React from 'react'

// eslint-disable-next-line react/prop-types
function ButtonOutline({text}) {
  return (
    <div>
      <a href="#" className={`border-2 border-[#5B6DF3]  text-[#5B6DF3] py-2 px-4 rounded-md hover:text-[#5B6DF3] hover:border-[#4859da]`}> {text} </a>
    </div>
  )
}

export default ButtonOutline
