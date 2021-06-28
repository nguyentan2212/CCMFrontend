import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="#">UIT</a>
        <span className="ml-1">&copy; 2021 Quản Lý vốn Doanh Nghiệp.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">ReactJS</span>
        <a href="#">Blockchain for React</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
