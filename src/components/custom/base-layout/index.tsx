'use client'
import React, { useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import ClearIcon from '@mui/icons-material/Clear'

type TProps = {
  children?: React.ReactNode
  backgroundImage?: string
}
const BaseLayout: React.FC<TProps> = ({ children, backgroundImage }) => {
  const pathName = usePathname()
  const router = useRouter()
  const onClick = (p: string) => {
    router.push(p)
    setModal(false)
  }
  const selectedPath = (p: string) => {
    if (pathName.includes(p)) {
      return ' text-blue'
    }
    if (pathName === '/home') return ' text-white'
    return ' text-black'
  }
  const selectedPathMobile = (p: string) => {
    if (pathName.includes(p)) {
      return ' text-2xl text-cdark border-2 border-cdark rounded-lg w-full'
    }
    return ' text-2xl text-white'
  }
  const setClass = useMemo(() => {
    if (pathName !== '/home') return ' fixed top-0 bg-white'
    return ''
  }, [pathName])
  const [modal, setModal] = useState(false)
  return (
    <div
      className='w-full h-screen'
      style={{
        backgroundImage: backgroundImage
          ? `url('${backgroundImage}')`
          : undefined,
      }}
    >
      <div
        className={
          'nav-dynamic-show px-5 py-4 flex justify-end fixed top-0 right-0 z-50 w-full' +
          (pathName !== '/home' ? 'bg-cgreen' : '')
        }
      >
        {modal ? (
          <ClearIcon
            className='cursor-pointer'
            style={{ width: 50, height: 50, color: 'white' }}
            onClick={() => setModal(false)}
          />
        ) : (
          <FormatListBulletedIcon
            className='cursor-pointer'
            style={{ width: 50, height: 50 }}
            onClick={() => setModal(true)}
          />
        )}
      </div>
      {modal && (
        <div
          style={{ paddingTop: 200 }}
          className='nav-dynamic-show px-5 py-4 w-full h-full bg-cgreen z-50 items-center flex flex-col overflow-y-hidden'
        >
          <div
            className={
              'font-bold cursor-pointer mb-3 hover:text-cdark hover:border-2 hover:border-cdark hover:rounded-lg w-full p-6' +
              selectedPathMobile('home')
            }
            onClick={() => onClick('/home')}
          >
            Home
          </div>
          <div
            className={
              'font-bold cursor-pointer mb-3 hover:text-cdark hover:border-2 hover:border-cdark hover:rounded-lg w-full p-6' +
              selectedPathMobile('projects')
            }
            onClick={() => onClick('/projects')}
          >
            Project
          </div>
          <div
            className={
              'font-bold cursor-pointer mb-3 hover:text-cdark hover:border-2 hover:border-cdark hover:rounded-lg w-full p-6' +
              selectedPathMobile('about')
            }
            onClick={() => onClick('/about')}
          >
            About
          </div>
          <div
            className={
              'font-bold cursor-pointer mb-12 hover:text-cdark hover:border-2 hover:border-cdark hover:rounded-lg w-full p-6' +
              selectedPathMobile('contacts')
            }
            onClick={() => onClick('/contacts')}
          >
            Contacts
          </div>
        </div>
      )}
      <div
        className={`flex w-full items-center justify-center h-[70px] ${setClass} z-50 nav-dynamic-hidden`}
      >
        <div className='flex w-[40%] items-center justify-around'>
          <div
            className={
              'font-bold cursor-pointer hover:text-blue' + selectedPath('home')
            }
            onClick={() => onClick('/home')}
          >
            Home
          </div>
          <div
            className={
              'font-bold cursor-pointer hover:text-blue' +
              selectedPath('project')
            }
            onClick={() => onClick('/projects')}
          >
            Project
          </div>
          <div
            className={
              'font-bold cursor-pointer hover:text-blue' + selectedPath('about')
            }
            onClick={() => onClick('/about')}
          >
            About
          </div>
          <div
            onClick={() => onClick('/contacts')}
            className={
              'font-bold cursor-pointer hover:text-blue' +
              selectedPath('contact')
            }
          >
            Contact
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
export default BaseLayout
