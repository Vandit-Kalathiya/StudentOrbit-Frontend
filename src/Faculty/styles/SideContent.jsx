// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Flex } from 'antd'
import ContentSidebar from './ContentSidebar'
import PendingTask from './PendingTask'

function SideContent() {
  return (
    <Flex vertical gap='2.3rem' style={{width: 350}}>
      <ContentSidebar />
      <PendingTask />
    </Flex>
  )
}

export default SideContent
