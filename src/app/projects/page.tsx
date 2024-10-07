'use client'

import BaseLayout from '@/components/custom/base-layout'
import AuthLayout from '../auth'
import useProjects, { TTag } from './hooks'
import { Fragment, useEffect, useMemo } from 'react'
import CCheckbox from '@/components/custom/checkcbox'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Projects = () => {
  const router = useRouter()
  const { getProjects, projectState, setProjectState } = useProjects()
  useEffect(() => {
    getProjects()
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
    const allSelectedTags = projectState.tags.filter((x) => x.selected)
    if (allSelectedTags.length === 0) return projectState.projects
    return projectState.projects.filter((item) => {
      const isAnyData = isAny(item.tags, allSelectedTags)
      return isAnyData
    })
  }, [projectState])
  const projectByGroup = useMemo(() => {
    const groups: { name: string; tags: (TTag & { selected: boolean })[] }[] =
      []
    projectState.tags.forEach((t) => {
      const isAny = groups.find((x) => x.name === t.group)
      if (!isAny) {
        groups.push({
          name: t.group,
          tags: projectState.tags.filter((x) => x.group === t.group),
        })
      }
    })
    return groups.sort((a, b) => a.name.localeCompare(b.name))
  }, [projectState])
  return (
    <AuthLayout>
      <BaseLayout>
        <div className='p-10' style={{ marginTop: 70 }}>
          <div
            className='no-scrollbar w-[70%]'
            dangerouslySetInnerHTML={{
              __html: projectState.html,
            }}
          />
          <div>
            <div className='mb-4 text-2xl'>
              <strong>Category</strong>
            </div>
            <div className='flex gap-4'>
              <div
                style={{ maxHeight: 400 }}
                className='no-scrollbar overflow-y-scroll mr-6 min-w-[200px] project-menu-category'
              >
                {projectByGroup.map((group, idx) => (
                  <Fragment key={Math.random()}>
                    {group.tags.map((item) => (
                      <div
                        className='flex gap-3 items-center mb-4'
                        key={item.id}
                      >
                        <CCheckbox
                          checked={item.selected}
                          onClick={(val) => {
                            setProjectState({
                              ...projectState,
                              tags: projectState.tags.map((t) => {
                                if (t.id === item.id)
                                  return { ...t, selected: val }
                                return t
                              }),
                            })
                          }}
                        />
                        <div
                          onClick={() => {
                            setProjectState({
                              ...projectState,
                              tags: projectState.tags.map((t) => {
                                if (t.id === item.id)
                                  return { ...t, selected: !t.selected }
                                return t
                              }),
                            })
                          }}
                          className='cursor-pointer'
                        >
                          {item.name}
                        </div>
                      </div>
                    ))}
                    {idx + 1 < projectByGroup.length && (
                      <div className='flex-grow border-t border-gray-400 mb-4' />
                    )}
                  </Fragment>
                ))}
              </div>
              <div className='no-scrollbar gap-3 w-full grid-container'>
                {projects.map((item) => {
                  const fImage = item.images[0]
                  return (
                    <div
                      key={item.id}
                      className='relative group cursor-pointer'
                      onClick={() => router.push(`/projects/${item.id}`)}
                    >
                      <Image
                        className='border rounded-md img-fit'
                        alt={item.name}
                        loading='lazy'
                        width={300}
                        height={540}
                        src={`/static/projects/${fImage}`}
                      />
                      <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <div className='items-center justify-center text-center'>
                          <p className='text-white text-lg'>Project</p>
                          <p className='text-white text-lg'>{item.name}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </AuthLayout>
  )
}
export default Projects
