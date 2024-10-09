'use client'
import React from 'react'

const NavButton: React.FC<{ fill: 'white' | 'black'; onClick: () => void }> = ({
  fill,
  onClick,
}) => {
  return (
    <svg
      onClick={onClick}
      className='cursor-pointer'
      width='36'
      height='36'
      viewBox='0 0 36 36'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='7.5' cy='27' r='3' fill={fill} />
      <circle cx='28.5' cy='9' r='3' fill={fill} />
      <rect x='13.5' y='25.5' width='18' height='3' rx='1.5' fill={fill} />
      <rect x='4.5' y='16.5' width='27' height='3' rx='1.5' fill={fill} />
      <rect x='4.5' y='7.5' width='18' height='3' rx='1.5' fill={fill} />
    </svg>
  )
}
export default NavButton
