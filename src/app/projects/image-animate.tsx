import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { TProject } from './hooks'
import { useState } from 'react'

type TProps = {
  loadingProjects: boolean
  projects: TProject[]
}
const ImageAnimated: React.FC<TProps> = ({ loadingProjects, projects }) => {
  const router = useRouter()
  const [loadImage, setLoadImage] = useState(true)
  return (
    <div
      className={`no-scrollbar w-full grid-container !gap-0 transition-opacity duration-300 ${
        loadingProjects ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <AnimatePresence>
        {projects.map((item) => {
          const firstImg = item.images[0]
          const fImage =
            item.images.find((x) => x === item.cover_img) || firstImg
          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='relative group cursor-pointer'
              onClick={() => router.push(`/projects/${item.id}`)}
            >
              <div className='w-full h-0 pb-[100%] relative'>
                <div
                  className={`opacity-50 absolute inset-0 w-full h-full object-cover transition ease-out duration-300 hover:scale-105 bg-placeholder ${
                    loadImage ? '' : 'hidden'
                  }`}
                />
                <Image
                  className='absolute inset-0 w-full h-full object-cover transition ease-out duration-300 hover:scale-105'
                  alt={item.name}
                  loading='lazy'
                  width={300}
                  height={300}
                  src={`/static/projects/${fImage}`}
                  onLoad={() => setLoadImage(false)}
                />
              </div>
              <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <div className='items-center justify-center text-center'>
                  <p
                    className='text-white text-lg'
                    style={{ fontFamily: 'Source Sans Pro' }}
                  >
                    {item.name}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
export default ImageAnimated
