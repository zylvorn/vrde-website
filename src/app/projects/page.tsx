'use client'
import dynamic from 'next/dynamic'
import useProjects, { TTag } from './hooks'
import { Fragment, useEffect, useMemo, useState } from 'react'
import BaseLayout from '@/components/custom/base-layout'
import { CircularProgress } from '@mui/material'
const MenuItem = dynamic(() => import('@mui/material/MenuItem'))
const Select = dynamic(() => import('@mui/material/Select'))

const LoadingFullScreen: React.FC<{ isChild?: boolean }> = ({
  isChild = false,
}) => {
  const className = isChild
    ? 'fixed inset-0 flex items-center justify-center bg-cgray bg-opacity-30 z-50 top-[120px]'
    : 'fixed inset-0 flex items-center justify-center bg-cgray bg-opacity-30 z-50'
  return (
    <div className={className}>
      <CircularProgress size={60} />
    </div>
  )
}

const CCheckbox = dynamic(() => import('@/components/custom/checkcbox'))
const AuthLayout = dynamic(() => import('../auth'), {
  loading: () => <LoadingFullScreen />,
})
const ImageAnimated = dynamic(() => import('./image-animate'), {
  loading: () => <LoadingFullScreen isChild />,
})

const Projects = () => {
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
    options,
    option,
    setOption,
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
    let beforeSort = projectData
    const allSelectedTags = tags.filter((x) => x.selected)
    if (allSelectedTags.length > 0) {
      beforeSort = projectData.filter((item) => {
        const isAnyData = isAny(item.tags, allSelectedTags)
        return isAnyData
      })
    }
    switch (option) {
      case 'Newest':
        return beforeSort.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      case 'Oldest':
        return beforeSort.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )
      case 'A-Z':
        return beforeSort.sort((a, b) => a.name.localeCompare(b.name))
      case 'Z-A':
        return beforeSort.sort((a, b) => b.name.localeCompare(a.name))
      default:
        return beforeSort
    }
  }, [projectData, tags, option])
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
      <BaseLayout showFooter={!loadingProjects}>
        <div style={{ marginTop: 70 }}>
          <div
            className='no-scrollbar w-[70%] px-[7%]'
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
          <div>
            <div
              className='flex mb-4 text-2xl items-center px-[1%] justify-between'
              style={{ display: tags.length > 0 ? undefined : 'none' }}
            >
              <strong
                className='cursor-pointer hover:text-cvrde'
                onClick={toggleCategory}
              >
                Category
              </strong>
              <Select
                size='small'
                value={option}
                onChange={(e) => {
                  const val = e.target.value as string
                  setOption(val)
                }}
                className='w-[200px] mt-2'
                displayEmpty
                defaultValue='Newest'
              >
                {options.map((o) => (
                  <MenuItem key={o} value={o}>
                    {o}
                  </MenuItem>
                ))}
              </Select>
            </div>
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
                className='w-full transition-width duration-300 ease-in-out'
                style={{ width: imageWidth }}
              >
                {loadingProjects && <LoadingFullScreen isChild />}
                <ImageAnimated
                  loadingProjects={loadingProjects}
                  projects={projects}
                />
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </AuthLayout>
  )
}
export default Projects
