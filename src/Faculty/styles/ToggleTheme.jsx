// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Button } from 'antd'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'

// eslint-disable-next-line react/prop-types
const ToggleTheme = ({darkTheme, toggleTheme}) => {
  return (
    <div className='toggle-theme-btn absolute b-[30px] l-[20px] flex items-center justify-center text-[1rem] '>
      <Button onClick={toggleTheme}> {darkTheme ? <HiOutlineSun/> : <HiOutlineMoon/> }</Button>
    </div>
  )
}

export default ToggleTheme
