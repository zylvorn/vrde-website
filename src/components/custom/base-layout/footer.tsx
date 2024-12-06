import React, { useEffect, useState } from 'react'
import { Instagram, WhatsApp, LinkedIn } from '@mui/icons-material'
import IContact from '@/app/contacts/types'
import axios from 'axios'
import Link from 'next/link'

const Footer: React.FC = () => {
  const [contactState, setContactState] = useState<IContact.IState>({
    html: '',
    whatsapp: '',
  })
  const getContact = () => {
    // This for non blocking the rendering
    axios
      .get<IContact.IState>('/api/contacts')
      .then((res) => {
        setContactState(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getContact()
  }, [])

  const sendMessage = () => {
    const waNum = contactState.whatsapp
    const msg = `Hi VRDE Studio, saya mau tanya-tanya dan diskusi tentang jasa dari kalian dong!\n\n\nNama: \nLokasi: \nPesan:`
    const encodedMsg = encodeURIComponent(msg)
    const link = `https://api.whatsapp.com/send?phone=${waNum}&text=${encodedMsg}`
    window.open(link, '__blank')
  }
  return (
    <footer className='bg-[#f3f6f5] py-10 mt-3'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Top Section */}
        <div className='flex flex-wrap justify-between items-start'>
          {/* Logo and Tagline */}
          <div className='mb-6 md:mb-0'>
            <div className='text-green-700 font-bold text-2xl'>VRDE Studio</div>
          </div>

          {/* Links */}
          <div className='flex flex-wrap gap-8'>
            <ul className='text-gray-600 hover:text-cvrde text-lg'>
              <Link href='/about'>About</Link>
            </ul>
            <ul className='text-gray-600 hover:text-cvrde text-lg'>
              <Link href='/projects'>Project</Link>
            </ul>
            <ul className='text-gray-600 hover:text-cvrde text-lg'>
              <Link href='/contacts'>Contact</Link>
            </ul>
          </div>

          {/* Address */}
          <div className='mt-6 md:mt-0 grid'>
            <div
              className='hover:text-cvrde cursor-pointer text-gray-800'
              onClick={() => {
                window.open(
                  'https://www.google.com/maps/uv?pb=!1s0x2e69c5bbd9518aed%3A0xca4be3469bba0852!3m1!7e115!4s%2Fmaps%2Fplace%2Fvrde%2Bstudio%2F%40-6.5672822%2C106.7808303%2C3a%2C75y%2C37.21h%2C90t%2Fdata%3D*213m4*211e1*213m2*211sZgGji9R7U9iji2Rs2EdTmg*212e0*214m2*213m1*211s0x2e69c5bbd9518aed%3A0xca4be3469bba0852%3Fsa%3DX%26ved%3D2ahUKEwinsNuvjJKKAxWm8qACHSxFG3wQpx96BAgwEAA!5svrde%20studio%20-%20Google%20Search!15sCgIgAQ&imagekey=!1e2!2sZgGji9R7U9iji2Rs2EdTmg&cr=le_a7&hl=en&ved=1t%3A206134&ictx=111',
                  '__blank'
                )
              }}
            >
              <div className='font-medium'>Jl. Tanjung VIII</div>
              <div className='mt-2'>
                Blok O6 No.14, RT.03/RW.12, Tanah Sareal, <br />
                Kec. Tanah Sereal, Kota Bogor, Jawa Barat 16164
              </div>
            </div>
            <p className='text-gray-600 mt-2'>
              <a className='hover:text-cvrde' href='#' onClick={sendMessage}>
                {contactState.whatsapp}
              </a>
              <br />
              <a className='hover:text-cvrde' href='#'>
                studiovrde.id
              </a>
            </p>

            {/* Copyright */}
            <p className='text-gray-600 !mt-4 sm:mt-0'>
              &copy; {new Date().getFullYear()} Studio VRDE. All rights
              reserved.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='mt-10 flex flex-col sm:flex-row justify-between items-center'>
          {/* Social Media Icons */}
          <div className='flex space-x-4'>
            <a href='#' onClick={sendMessage}>
              <WhatsApp />
            </a>
            <a
              href='https://www.instagram.com/studio.vrde/'
              onClick={sendMessage}
            >
              <Instagram />
            </a>
            <a href='#' type='__blank'>
              <LinkedIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
