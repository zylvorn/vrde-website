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
import { base64BlurDataURL } from '@/utils/constants/constants'

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
        const img =
          project.images.find((x) => x === project.main_img) ||
          project.images[0]
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
            <Image
              src={mainImg || ''}
              alt={'main img'}
              className='img-fit transition-opacity duration-300'
              style={{ objectFit: 'cover', height: 600 }}
              width={600}
              height={600}
              placeholder='blur'
              blurDataURL={base64BlurDataURL}
            />
          )}
          <div className='mt-10 mb-10 flex flex-col gap-2 items-center'>
            <p
              className='text-3xl font-bold'
              style={{ fontFamily: 'Source Sans Pro', textAlign: 'center' }}
            >
              {project?.name}
            </p>
            <p
              className='text-xl'
              style={{ fontFamily: 'Source Sans Pro', textAlign: 'center' }}
            >
              {project?.location}
            </p>
            <p
              className='text-xl'
              style={{ fontFamily: 'Source Sans Pro', textAlign: 'center' }}
            >
              {moment(project?.date).format('YYYY')}
            </p>
            <p
              className='text-xl'
              style={{ fontFamily: 'Source Sans Pro', textAlign: 'center' }}
            >
              {project?.team}
            </p>
          </div>
          <div className='no-scrollbar gap-3 w-full grid-container-big transition-opacity duration-300'>
            {project?.images.map((img) => (
              <Image
                key={Math.random()}
                className='border rounded-md img-fit'
                alt={'alt-img'}
                placeholder='blur'
                width={300}
                height={540}
                src={`/static/projects/${img}`}
                blurDataURL={base64BlurDataURL}
              />
            ))}
          </div>
        </div>
      </BaseLayout>
    </AuthLayout>
  )
}
export default ProjectByID
