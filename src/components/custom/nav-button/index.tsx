'use client'
import React from 'react'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'

const NavButton: React.FC<{ fill: string; onClick: () => void }> = ({
  fill,
  onClick,
}) => {
  return (
    <MenuOpenIcon
      onClick={onClick}
      style={{ color: fill, width: 36, height: 36 }}
    />
  )
}
export default NavButton
