'use client'
import React, { useEffect, useState } from 'react'
import AuthLayout from '../auth'
import BaseLayout from '@/components/custom/base-layout'
import axios from 'axios'
import IAbout from './types'
import Image from 'next/image'

const Home = () => {
  const [aboutState, setAboutState] = useState<IAbout.IState>({
    clients: [],
    sections: [],
  })
  const getHome = async () => {
    try {
      const { data } = await axios.get<IAbout.IState>('/api/about')
      setAboutState(data)
    } catch (error) {}
  }
  useEffect(() => {
    getHome()
  }, [])
  return (
    <AuthLayout>
      <BaseLayout backgroundImage={''}>
        <div className='p-10' style={{ marginTop: 70 }}>
          {aboutState.sections.map((item, id) => (
            <p key={Math.random()} className='mb-10'>
              {!(id % 2) ? (
                <div className='flex items-center'>
                  <div className='flex-grow border-t border-gray-400 mr-3' />
                  <span style={{ fontSize: 64 }} className='text-right'>
                    {item.name}
                  </span>
                </div>
              ) : (
                <div className='flex items-center'>
                  <span style={{ fontSize: 64 }} className='text-right'>
                    {item.name}
                  </span>
                  <div className='flex-grow border-t border-gray-400 ml-3' />
                </div>
              )}
              <div
                className='no-scrollbar'
                dangerouslySetInnerHTML={{
                  __html: item.html,
                }}
              />
            </p>
          ))}
          {aboutState.clients.length > 0 && (
            <div className='w-full'>
              <div className='flex gap-3 items-center mb-5'>
                <div className='flex-grow border-t border-gray-400' />
                <div style={{ fontSize: 64 }} className='text-center'>
                  Our Clients
                </div>
                <div className='flex-grow border-t border-gray-400' />
              </div>
            </div>
          )}
          <div className='flex gap-10 flex-wrap justify-center items-center'>
            {aboutState.clients.map((item) => {
              return (
                <div key={Math.random()} className='text-center'>
                  <Image
                    width={100}
                    height={100}
                    src={item.image}
                    alt={item.name}
                  />
                  <small>{item.name}</small>
                </div>
              )
            })}
          </div>
        </div>
      </BaseLayout>
    </AuthLayout>
  )
}
export default Home
