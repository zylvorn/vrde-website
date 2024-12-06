import axios from 'axios'
import { useState } from 'react'

export type TTag = {
  name: string
  group: string
  id: string
}
export type TProject = {
  id: string
  client: string
  date: Date
  tags: TTag[]
  team: string
  images: string[]
  name: string
  location: string
  cover_img?: string
  main_img?: string
}
export type TData = {
  projects: TProject[]
  tags: (TTag & { selected: boolean })[]
  html: string
}

const useProjects = () => {
  const [projects, setProjects] = useState<TProject[]>([])
  const [tags, setTags] = useState<(TTag & { selected: boolean })[]>([])
  const [html, setHTML] = useState<string>('')
  const [showCategory, setShowCategory] = useState(false)
  const [loadingProjects, setLoadingProjects] = useState(false)
  const getProjects = async () => {
    try {
      setLoadingProjects(true)
      const { data } = await axios.get<TProject[]>('/api/projects')
      setProjects(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingProjects(false)
    }
  }
  const getTags = async () => {
    try {
      const { data } = await axios.get<(TTag & { selected: boolean })[]>(
        '/api/projects/tags'
      )
      setTags(data.map((e) => ({ ...e, selected: false })))
    } catch (error) {
      console.log(error)
    }
  }
  const getHTML = async () => {
    try {
      const { data } = await axios.get<string>('/api/projects/html')
      setHTML(data)
    } catch (error) {
      console.log(error)
    }
  }
  const options = ['Newest', 'Oldest', 'A-Z', 'Z-A']
  const [option, setOption] = useState('Newest')
  return {
    options,
    getProjects,
    showCategory,
    setShowCategory,
    getTags,
    getHTML,
    setTags,
    loadingProjects,
    projects,
    tags,
    html,
    option,
    setOption,
  }
}
export default useProjects
