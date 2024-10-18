'use client'

import BaseLayout from '@/components/custom/base-layout'
import AuthLayout from '../auth'
import useProjects, { TTag } from './hooks'
import { Fragment, useEffect, useMemo, useState } from 'react'
import CCheckbox from '@/components/custom/checkcbox'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Autocomplete, LinearProgress, TextField } from '@mui/material'
import { base64BlurDataURL } from '@/utils/constants/constants'
import { motion, AnimatePresence } from 'framer-motion'

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
      <BaseLayout>
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
              <Autocomplete
                onChange={(_, value) => {
                  if (value) setOption(value)
                }}
                className='w-[200px] mt-2'
                options={options}
                getOptionLabel={(s) => s}
                renderInput={(params) => (
                  <TextField {...params} label='Sort Options' />
                )}
                renderOption={(props, option) => <li {...props}>{option}</li>}
                value={option}
              />
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
                className='w-full transition-width duration-1000 ease-in-out'
                style={{ width: imageWidth }}
              >
                {loadingProjects && <LinearProgress className='!mb-2' />}
                <div
                  className={`no-scrollbar w-full grid-container !gap-0 transition-opacity duration-300 ${
                    loadingProjects ? 'opacity-50' : 'opacity-100'
                  }`}
                >
                  <AnimatePresence>
                    {projects.map((item) => {
                      const firstImg = item.images[0]
                      const fImage =
                        item.images.find((x) => x === item.cover_img) ||
                        firstImg
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
                            <Image
                              className='absolute inset-0 w-full h-full object-cover transition ease-out duration-300 hover:scale-105'
                              alt={item.name}
                              loading='lazy'
                              width={300}
                              height={300}
                              src={`/static/projects/${fImage}`}
                              placeholder='blur'
                              blurDataURL={base64BlurDataURL}
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
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </AuthLayout>
  )
}
export default Projects
