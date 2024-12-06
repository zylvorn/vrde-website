'use client'
import React, { useEffect, useState } from 'react'
import AuthLayout from '../auth'
import BaseLayout from '@/components/custom/base-layout'
import axios from 'axios'
import IHome from './types'
import Image from 'next/image'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'

const Home = () => {
  const [homeState, setHomeState] = useState<IHome.IState>({
    html: '',
    image_path: null,
  })
  const [showProject, setShowProject] = useState<IHome.IButtonHome>({
    id: null,
    buttonTextHome: null,
  })
  const getHome = async () => {
    try {
      const { data } = await axios.get<IHome.IState>('/api/home')
      setHomeState(data)
      const { data: latestProject } = await axios.get<IHome.IButtonHome>(
        '/api/home/show-project'
      )
      setShowProject(latestProject)
    } catch (error) {}
  }
  useEffect(() => {
    getHome()
  }, [])
  return (
    <AuthLayout>
      <BaseLayout>
        <div className='absolute top-0 left-0 !h-screen !w-screen bg-gradient-home' />
        <Image
          src={homeState.image_path || ''}
          alt='home-img'
          className='z-[-1] img-fit !w-screen !h-screen'
          layout='fill'
          loading='lazy'
        />
        <div className='grid items-center h-[calc(100vh-200px)] pl-[10%] pr-[10px] absolute z-[50] w-full'>
          <div
            className='no-scrollbar'
            dangerouslySetInnerHTML={{
              __html: homeState.html,
            }}
          />
          {showProject.id && (
            <button
              className='bg-white w-fit font-semibold h-16 text-[#16322c] px-4 items-center flex rounded-full fixed bottom-[15%] left-[10%] z-[1000]'
              onClick={() => {
                if (showProject.id) {
                  window.location.href = `/projects/${showProject.id}`
                }
              }}
            >
              <span className='mr-2'>{showProject.buttonTextHome}</span>
              <ArrowOutwardIcon />
            </button>
          )}
        </div>
      </BaseLayout>
    </AuthLayout>
  )
}
export default Home
