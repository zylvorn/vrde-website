'use client'
import React, { useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import ClearIcon from '@mui/icons-material/Clear'
import NavButton from '../nav-button'

type TProps = {
  children?: React.ReactNode
}
const BaseLayout: React.FC<TProps> = ({ children }) => {
  const pathName = usePathname()
  const router = useRouter()
  const onClick = (p: string) => {
    router.push(p)
    setModal(false)
  }
  const selectedPath = (p: string) => {
    const defaultCl = 'font-bold cursor-pointer z-[100] hover:text-blue text-lg'
    if (pathName.includes(p)) {
      return defaultCl + ' text-blue'
    }
    if (pathName === '/home') return defaultCl + ' text-white'
    return defaultCl + ' text-black'
  }
  const selectedPathMobile = (p: string) => {
    const defaultCl =
      'font-bold cursor-pointer mb-3 hover:text-cdark hover:border-2 hover:border-cdark hover:rounded-lg w-full p-6 '
    if (pathName.includes(p)) {
      return (
        defaultCl +
        ' text-2xl text-cdark border-2 border-cdark rounded-lg w-full'
      )
    }
    return defaultCl + ' text-2xl text-white'
  }
  const setClass = useMemo(() => {
    if (pathName !== '/home') return ' fixed top-0 bg-white'
    return ''
  }, [pathName])
  const [modal, setModal] = useState(false)
  return (
    <div>
      <div
        className={
          'nav-dynamic-show px-5 py-4 flex justify-end fixed top-0 right-0 z-[99] w-full'
        }
      >
        {modal ? (
          <ClearIcon
            className='cursor-pointer'
            style={{ width: 50, height: 50, color: 'white' }}
            onClick={() => setModal(false)}
          />
        ) : (
          <NavButton
            onClick={() => setModal(true)}
            fill={pathName === '/home' ? 'white' : 'black'}
          />
        )}
      </div>
      {modal && (
        <div
          style={{ paddingTop: 200 }}
          className='nav-dynamic-show px-5 py-4 w-full h-screen bg-cgreen z-[99] items-center flex flex-col overflow-y-hidden'
        >
          <div
            className={selectedPathMobile('home')}
            onClick={() => onClick('/home')}
          >
            Home
          </div>
          <div
            className={selectedPathMobile('projects')}
            onClick={() => onClick('/projects')}
          >
            Projects
          </div>
          <div
            className={selectedPathMobile('about')}
            onClick={() => onClick('/about')}
          >
            About
          </div>
          <div
            className={selectedPathMobile('contacts')}
            onClick={() => onClick('/contacts')}
          >
            Contacts
          </div>
        </div>
      )}
      <div
        className={`flex w-full items-center justify-center h-[70px] ${setClass} z-[99] fixed top-0 nav-dynamic-hidden`}
      >
        <div className='flex w-[30%] items-center justify-around'>
          <div
            className={selectedPath('home')}
            onClick={() => onClick('/home')}
          >
            Home
          </div>
          <div
            className={selectedPath('project')}
            onClick={() => onClick('/projects')}
          >
            Projects
          </div>
          <div
            className={selectedPath('about')}
            onClick={() => onClick('/about')}
          >
            About
          </div>
          <div
            onClick={() => onClick('/contacts')}
            className={selectedPath('contact')}
          >
            Contact
          </div>
        </div>
      </div>
      {!modal && children}
    </div>
  )
}
export default BaseLayout
