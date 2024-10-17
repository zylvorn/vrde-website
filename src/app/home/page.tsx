'use client'
import React, { useEffect, useState } from 'react'
import AuthLayout from '../auth'
import BaseLayout from '@/components/custom/base-layout'
import axios from 'axios'
import IHome from './types'
import Image from 'next/image'

const Home = () => {
  const [homeState, setHomeState] = useState<IHome.IState>({
    html: '',
    image_path: null,
  })
  const getHome = async () => {
    try {
      const { data } = await axios.get<IHome.IState>('/api/home')
      setHomeState(data)
    } catch (error) {}
  }
  useEffect(() => {
    getHome()
  }, [])
  return (
    <AuthLayout>
      <BaseLayout>
        <div className='absolute top-0 left-0 h-screen w-screen bg-gradient-home' />
        <Image
          src={homeState.image_path || ''}
          alt=''
          className='z-[-1] img-fit w-screen h-screen'
          layout='fill'
          loading='lazy'
        />
        <div className='flex items-center h-[calc(100vh-200px)] pl-[50px] absolute z-[50]'>
          <div
            className='no-scrollbar'
            dangerouslySetInnerHTML={{
              __html: homeState.html,
            }}
          />
        </div>
      </BaseLayout>
    </AuthLayout>
  )
}
export default Home
