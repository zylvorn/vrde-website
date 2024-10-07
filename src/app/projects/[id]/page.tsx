'use client'

import AuthLayout from '@/app/auth'
import BaseLayout from '@/components/custom/base-layout'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { TProject } from '../hooks'
import ImageCarousel from '@/components/custom/carousel'
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
  const imgsCarousel = useMemo(() => {
    return (
      project?.images.map((img) => ({
        src: `/static/projects/${img}`,
        alt: 'image',
      })) || []
    )
  }, [project])
  return (
    <AuthLayout>
      <BaseLayout>
        <div className='p-10 no-scrollbar' style={{ marginTop: 70 }}>
          <ImageCarousel images={imgsCarousel} />
          <div className='mt-10 mb-10'>
            <div className='mb-10'>
              <p className='font-bold text-gray'>PROJECT</p>
              <p className='text-3xl'>{project?.name}</p>
            </div>
            <div className='flex flex-wrap justify-between mb-12'>
              <div>
                <p className='font-bold text-gray'>LOCATION</p>
                <p className='text-2xl'>{project?.location}</p>
              </div>
              <div>
                <p className='font-bold text-gray'>YEARS</p>
                <p className='text-2xl'>
                  {moment(project?.date).format('YYYY')}
                </p>
              </div>
              <div>
                <p className='font-bold text-gray'>TEAM</p>
                <p className='text-2xl'>{project?.team}</p>
              </div>
            </div>
            <div className='flex flex-wrap justify-between mb-12'>
              <div>
                <p className='font-bold text-gray'>CLIENT</p>
                <p className='text-2xl'>{project?.client}</p>
              </div>
              <div>
                <p className='font-bold text-gray'>CATEGORY</p>
                <p className='text-2xl'>
                  {project?.tags.map((item) => item.name).join(', ')}
                </p>
              </div>
              <div />
            </div>
          </div>
          <div className='no-scrollbar gap-3 w-full grid-container-big'>
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
