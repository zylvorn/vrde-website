'use client'

import BaseLayout from '@/components/custom/base-layout'
import AuthLayout from '../auth'
import useProjects, { TTag } from './hooks'
import { Fragment, useEffect, useMemo, useState } from 'react'
import CCheckbox from '@/components/custom/checkcbox'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { LinearProgress } from '@mui/material'

const Projects = () => {
  const router = useRouter()
  const {
    getProjects,
    getTags,
    getHTML,
    loadingProjects,
    showCategory,
    setShowCategory,
    setTags,
    tags,
    html,
    projects: projectData,
  } = useProjects()
  useEffect(() => {
    getProjects()
    getTags()
    getHTML()
  }, [])
  const isAny = (a: TTag[], allRef: TTag[]) => {
    let isAny = false
    allRef.forEach((t) => {
      const anyData = a.find((x) => x.id === t.id)
      if (anyData) isAny = true
    })
    return isAny
  }
  const projects = useMemo(() => {
    const allSelectedTags = tags.filter((x) => x.selected)
    if (allSelectedTags.length === 0) return projectData
    return projectData.filter((item) => {
      const isAnyData = isAny(item.tags, allSelectedTags)
      return isAnyData
    })
  }, [projectData, tags])
  const tagsByGroup = useMemo(() => {
    const groups: { name: string; tags: (TTag & { selected: boolean })[] }[] =
      []
    tags.forEach((t) => {
      const isAny = groups.find((x) => x.name === t.group)
      if (!isAny) {
        groups.push({
          name: t.group,
          tags: tags.filter((x) => x.group === t.group),
        })
      }
    })
    return groups.sort((a, b) => a.name.localeCompare(b.name))
  }, [tags])
  const [categoryWidth, setCategoryWidth] = useState('0px')
  const [imageWidth, setImageWidth] = useState('100%')
  const toggleCategory = () => {
    setShowCategory((prev) => !prev)
    setCategoryWidth(showCategory ? '0px' : '200px') // Adjust width accordingly
    setImageWidth(showCategory ? '100%' : 'calc(100% - 200px)') // Adjust image grid width
  }
  return (
    <AuthLayout>
      <BaseLayout>
        <div style={{ marginTop: 70 }}>
          <div
            className='no-scrollbar w-[70%] px-[7%]'
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
          <div>
            {tags.length > 0 && (
              <div className='mb-4 text-2xl px-[1%]'>
                <strong
                  className='cursor-pointer hover:text-cvrde'
                  onClick={toggleCategory}
                >
                  Category
                </strong>
              </div>
            )}
            <div className={`flex ${showCategory ? 'gap-4' : ''}`}>
              <div
                style={{
                  maxHeight: '80vh',
                  width: categoryWidth,
                }}
                className={`no-scrollbar overflow-y-scroll  ${
                  showCategory ? 'mr-6 px-2' : ''
                } transition-width duration-1000 ease-in-out`}
              >
                {tagsByGroup.map((group, idx) => (
                  <Fragment key={Math.random()}>
                    {group.tags.map((item, idxx) => (
                      <Fragment key={item.id}>
                        {idxx === 0 && (
                          <div className='mb-4 text-xl'>{group.name}</div>
                        )}
                        <div className='flex gap-3 items-center mb-4'>
                          <CCheckbox
                            checked={item.selected}
                            onClick={(val) => {
                              setTags(
                                tags.map((t) => {
                                  if (t.id === item.id)
                                    return { ...t, selected: val }
                                  return t
                                })
                              )
                            }}
                          />
                          <div
                            onClick={() => {
                              setTags(
                                tags.map((t) => {
                                  if (t.id === item.id)
                                    return { ...t, selected: !t.selected }
                                  return t
                                })
                              )
                            }}
                            className='cursor-pointer hover:text-cvrde'
                          >
                            {item.name}
                          </div>
                        </div>
                      </Fragment>
                    ))}
                    {idx + 1 < tagsByGroup.length && (
                      <div className='flex-grow border-t border-gray-400 mb-4' />
                    )}
                  </Fragment>
                ))}
              </div>
              <div
                className='w-full transition-width duration-1000 ease-in-out'
                style={{ width: imageWidth }}
              >
                {loadingProjects && <LinearProgress className='!mb-2' />}
                <div
                  className={`no-scrollbar w-full grid-container !gap-0 transition-opacity duration-300 ${
                    loadingProjects ? 'opacity-50' : 'opacity-100'
                  }`}
                >
                  {projects.map((item) => {
                    const fImage = item.images[0]
                    return (
                      <div
                        key={item.id}
                        className='relative group cursor-pointer'
                        onClick={() => router.push(`/projects/${item.id}`)}
                      >
                        <div className='w-full h-0 pb-[100%] relative'>
                          <Image
                            className='absolute inset-0 w-full h-full object-cover transition ease-out duration-300 hover:scale-105'
                            alt={item.name}
                            loading='lazy'
                            width={300}
                            height={300}
                            src={`/static/projects/${fImage}`}
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
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </AuthLayout>
  )
}
export default Projects
