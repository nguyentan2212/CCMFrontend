import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý Vốn']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Danh sách vốn',
    to: '/capitals',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý người dùng']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Danh sách người dùng',
    to: '/users',
    icon: 'cil-puzzle',
  },
]

export default _nav
