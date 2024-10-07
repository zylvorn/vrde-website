'use client'
import React, { useEffect, useState } from 'react'
import AuthLayout from '../auth'
import BaseLayout from '@/components/custom/base-layout'
import axios from 'axios'
import IHome from './types'

const Home = () => {
  const [homeState, setHomeState] = useState<IHome.IState>({
    html: '',
    image_path: '/static/home/home.jpg',
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
      <BaseLayout backgroundImage={homeState.image_path}>
        <div className='flex items-center h-[calc(100vh-200px)] pl-[50px]'>
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
