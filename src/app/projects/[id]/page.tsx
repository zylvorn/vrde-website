'use client'

import AuthLayout from '@/app/auth'
import BaseLayout from '@/components/custom/base-layout'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { TProject } from '../hooks'
// import ImageCarousel from '@/components/custom/carousel'
import moment from 'moment'
import Image from 'next/image'

const ProjectByID = () => {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<TProject | null>(null)
  const getProjectByID = async (id: string) => {
    const { data } = await axios.get<TProject>(`/api/projects/getID/${id}`)
    if (data.id) {
      setProject(data)
    }
  }
  useEffect(() => {
    if (params.id) {
      const id = params.id as string
      getProjectByID(id)
    } else router.back()
  }, [params])
  // const imgsCarousel = useMemo(() => {
  //   return (
  //     project?.images.map((img) => ({
  //       src: `/static/projects/${img}`,
  //       alt: 'image',
  //     })) || []
  //   )
  // }, [project])
  const mainImg = useMemo(() => {
    if (project?.images) {
      if (project.images.length > 0) {
        const [img] = project.images
        return `/static/projects/${img}`
      }
    }
    return null
  }, [project])
  return (
    <AuthLayout>
      <BaseLayout>
        <div className='px-[7%] no-scrollbar' style={{ marginTop: 70 }}>
          {mainImg && (
            <img
              src={mainImg || ''}
              alt={'main img'}
              className='img-fit transition-opacity duration-300'
              style={{ objectFit: 'cover', height: 600 }}
              loading='lazy'
            />
          )}
          <div className='mt-10 mb-10 flex flex-col gap-2 items-center'>
            <p
              className='text-3xl font-bold'
              style={{ fontFamily: 'Source Sans Pro' }}
            >
              {project?.name}
            </p>
            <p className='text-xl' style={{ fontFamily: 'Source Sans Pro' }}>
              {project?.location}
            </p>
            <p className='text-xl' style={{ fontFamily: 'Source Sans Pro' }}>
              {moment(project?.date).format('YYYY')}
            </p>
            <p className='text-xl' style={{ fontFamily: 'Source Sans Pro' }}>
              {project?.team}
            </p>
          </div>
          <div className='no-scrollbar gap-3 w-full grid-container-big transition-opacity duration-300'>
            {project?.images.map((img) => (
              <Image
                key={Math.random()}
                className='border rounded-md img-fit'
                alt={'alt-img'}
                loading='lazy'
                width={300}
                height={540}
                src={`/static/projects/${img}`}
              />
            ))}
          </div>
        </div>
      </BaseLayout>
    </AuthLayout>
  )
}
export default ProjectByID
