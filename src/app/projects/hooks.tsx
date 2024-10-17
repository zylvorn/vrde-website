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
      setLoadingProjects(false)
    } catch (error) {
      setLoadingProjects(false)
      console.log(error)
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
  return {
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
  }
}
export default useProjects
