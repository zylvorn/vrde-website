'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import AuthLayout from '../auth'
import BaseLayout from '@/components/custom/base-layout'
import axios from 'axios'
import IContact from './types'
import { Button, Input } from '@mui/material'

const Home = () => {
  const [contactState, setContactState] = useState<IContact.IState>({
    html: '',
    whatsapp: '',
  })
  const [waState, setWAState] = useState<IContact.IWa>({
    name: '',
    location: '',
    message: '',
  })
  const getContact = async () => {
    try {
      const { data } = await axios.get<IContact.IState>('/api/contacts')
      setContactState(data)
    } catch (error) {}
  }
  useEffect(() => {
    getContact()
  }, [])
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWAState({
      ...waState,
      [e.target.name]: e.target.value,
    })
  }
  const sendMessage = () => {
    const waNum = contactState.whatsapp
    const msg = `Hi VRDE Studio, saya mau tanya-tanya dan diskusi tentang jasa dari kalian dong!\n\n\nNama: ${waState.name}\nLokasi: ${waState.location}\nPesan: ${waState.message}`
    const encodedMsg = encodeURIComponent(msg)
    const link = `https://api.whatsapp.com/send?phone=${waNum}&text=${encodedMsg}`
    window.open(link, '__blank')
  }
  return (
    <AuthLayout>
      <BaseLayout>
        <div className='flex items-center px-[7%]' style={{ marginTop: 100 }}>
          <div
            className='no-scrollbar'
            dangerouslySetInnerHTML={{
              __html: contactState.html,
            }}
          />
        </div>
        <div className='px-[7%]'>
          <div className='flex flex-col justify-center mt-6 items-center'>
            <div className='text-3xl mb-6'>Send Message</div>
            <Input
              placeholder='Name'
              className='w-[40%] mb-6 dynamic-width'
              name='name'
              onChange={onChange}
              value={waState.name}
            />
            <Input
              placeholder='Location'
              className='w-[40%] mb-6 dynamic-width'
              name='location'
              onChange={onChange}
              value={waState.location}
            />
            <Input
              placeholder='Message'
              className='w-[40%] mb-6 dynamic-width'
              name='message'
              onChange={onChange}
              value={waState.message}
            />
            <Button
              className='rounded-xl mt-6'
              variant='contained'
              color='success'
              onClick={sendMessage}
            >
              Send Whatsapp
            </Button>
          </div>
        </div>
      </BaseLayout>
    </AuthLayout>
  )
}
export default Home
