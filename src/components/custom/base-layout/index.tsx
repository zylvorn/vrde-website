'use client'
import React, { useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import ClearIcon from '@mui/icons-material/Clear'
import NavButton from '../nav-button'
import VRDELogo from '../vrde-logo'

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
    const defaultCl =
      'font-bold cursor-pointer z-[100] hover:text-cvrde text-lg'
    if (pathName.includes(p)) {
      return defaultCl + ' text-cvrde'
    }
    if (pathName === '/home') return defaultCl + ' text-white'
    return defaultCl + ' text-cgray'
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
        className={`nav-dynamic-show px-5 py-4 flex justify-end fixed top-0 right-0 z-[99] w-full 
          ${pathName === '/home' ? '!overflow-hidden' : ''}`}
      >
        {modal ? (
          <ClearIcon
            className='cursor-pointer'
            style={{ width: 36, height: 36, color: 'white' }}
            onClick={() => setModal(false)}
          />
        ) : (
          <NavButton
            onClick={() => setModal(true)}
            fill={pathName === '/home' ? 'white' : '#637047'}
          />
        )}
      </div>

      <div
        className={`nav-dynamic-show py-2 flex justify-start fixed top-0 left-0 z-[99]`}
        onClick={() => onClick('/home')}
      >
        <VRDELogo fill={pathName === '/home' || modal ? 'white' : 'green'} />
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
        className={`flex w-full items-center justify-between h-[70px] ${setClass} z-[99] fixed top-0 nav-dynamic-hidden`}
      >
        <VRDELogo fill={pathName === '/home' ? 'white' : 'green'} />
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
        <div />
      </div>
      {!modal && children}
    </div>
  )
}
export default BaseLayout
