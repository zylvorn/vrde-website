'use client'

import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { TProject } from '../hooks'
import moment from 'moment'
import { LoadingFullScreen } from '@/components/custom/loading'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import BaseLayout from '@/components/custom/base-layout'

const AuthLayout = dynamic(() => import('@/app/auth'), {
  loading: () => <LoadingFullScreen />,
})

const OpenImageDialog = dynamic(() => import('./open-image-dialog'))

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
    router.prefetch('/projects')
  }, [])
  useEffect(() => {
    if (params.id) {
      const id = params.id as string
      getProjectByID(id)
    } else router.push('/projects')
  }, [params])

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
  const [dialogProps, setDialogProps] = useState({
    isOpen: false,
    image: '',
  })

  const [loadImage, setLoadImage] = useState(true)
  return (
    <AuthLayout>
      <BaseLayout showFooter={!!project?.main_img}>
        <OpenImageDialog
          isOpen={dialogProps.isOpen}
          onClose={() => setDialogProps({ image: '', isOpen: false })}
          image={dialogProps.image}
        />
        <div className='px-[7%] no-scrollbar' style={{ marginTop: 70 }}>
          <Fragment>
            <div
              onClick={() =>
                mainImg && setDialogProps({ image: mainImg, isOpen: true })
              }
              className={`opacity-30 transition-opacity h-[600px] duration-300 cursor-pointer bg-placeholder ${
                loadImage ? '' : 'hidden'
              }`}
            />
            <Image
              src={mainImg || ''}
              alt={'main img'}
              className={`img-fit transition-opacity duration-300 cursor-pointer ${
                loadImage ? 'hidden' : ''
              }`}
              style={{ objectFit: 'cover', height: 600 }}
              loading='lazy'
              width={600}
              height={600}
              onClick={() =>
                mainImg && setDialogProps({ image: mainImg, isOpen: true })
              }
              onLoad={() => setLoadImage(false)}
            />
          </Fragment>
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
            {project?.images
              .filter((x) => x !== project.main_img)
              .map((img) => (
                <Image
                  key={Math.random()}
                  className='border rounded-md img-fit cursor-pointer'
                  alt={'alt-img'}
                  loading='lazy'
                  width={300}
                  height={540}
                  src={`/static/projects/${img}`}
                  onClick={() =>
                    setDialogProps({
                      image: `/static/projects/${img}`,
                      isOpen: true,
                    })
                  }
                />
              ))}
          </div>
        </div>
      </BaseLayout>
    </AuthLayout>
  )
}
export default ProjectByID
