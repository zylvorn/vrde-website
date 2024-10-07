import React, { useMemo } from 'react'

type TProps = {
  size: 'md' | 'lg' | 'sm' | 'full'
  children?: React.ReactNode
}
const CustomCard: React.FC<TProps> = ({ size, children }) => {
  const wh = useMemo(() => {
    switch (size) {
      case 'full':
        return 'h-screen w-full'
      case 'md':
        return 'w-[50%] min-w-[350px]'
      case 'sm':
        return 'w-[30%] min-w-[350px]'
    }
  }, [size])
  return <div className={`p-2 py-4 bg-white rounded-lg ${wh}`}>{children}</div>
}
export default CustomCard
