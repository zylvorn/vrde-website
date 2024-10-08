'use client'
import React, { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type TProps = {
  children?: React.ReactNode
}
const AuthLayout: React.FC<TProps> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    if (pathname === '/') router.push('/home')
  }, [router, pathname])
  return children
}
export default AuthLayout
