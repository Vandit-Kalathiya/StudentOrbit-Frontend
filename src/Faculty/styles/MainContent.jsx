// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Flex } from 'antd'
import Banner from './Banner'

function MainContent() {
  return (
    <div style={{flex: 1}}>
      <Flex vertical gap="2.3rem">
        <Banner />
        <Banner />
        <Banner />
        <Banner />
        <Banner />
      </Flex>
    </div>
  )
}

export default MainContent
